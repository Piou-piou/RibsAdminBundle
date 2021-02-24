<?php

namespace PiouPiou\RibsAdminBundle\EventListener;

use PiouPiou\RibsAdminBundle\Entity\User;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class ExceptionListener
{
    /**
     * @var ParameterBagInterface
     */
    private $paramter;

    /**
     * @var User
     */
    private $user;

    /**
     * ExceptionListener constructor.
     * @param ParameterBagInterface $parameterBag
     * @param TokenStorageInterface $tokenStorage
     */
    public function __construct(ParameterBagInterface $parameterBag, TokenStorageInterface $tokenStorage)
    {
        $this->paramter = $parameterBag;
        if ($tokenStorage->getToken() && is_object($tokenStorage->getToken()->getUser()) && $tokenStorage->getToken()->getUser()->getUser()) {
            $this->user = $tokenStorage->getToken()->getUser()->getUser();
        }
    }

    /**
     * @return mixed
     */
    private function getClientIp()
    {
        $ip = $_SERVER['REMOTE_ADDR'];

        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
        }

        return $ip;
    }

    /**
     * @param ExceptionEvent $event
     */
    public function onKernelException(ExceptionEvent $event)
    {
        $slack_webhook = $this->paramter->get('ribs_admin.slack_webhook');
        if ($slack_webhook && $event->getRequestType() === HttpKernelInterface::MASTER_REQUEST ) {
            $drop_txt = '';
            if ($event->getThrowable() instanceof NotFoundHttpException) {
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, "https://ipinfo.io/".$this->getClientIp());
                curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                $datas = curl_exec($ch);
                curl_close($ch);

                if ($datas) {
                    $datas = json_decode($datas, true);

                    if (is_array($datas) && $datas["country"] && $datas["country"] != "FR" && $datas["org"] && strpos(strtolower($datas["org"]), "google") === false) {
                        $firewall_file = "../data/firewall/iptables.txt";
                        $fs = new Filesystem();
                        if ($fs->exists($firewall_file)) {
                            if (strpos(file_get_contents($firewall_file), $this->getClientIp()) === false) {
                                $fs->appendToFile($firewall_file, "iptables -I INPUT -s ".$this->getClientIp()." -j DROP\n");
                                $drop_txt = "\n• *IP DROPPED* : " . $this->getClientIp();
                            }
                        } else {
                            $fs->appendToFile($firewall_file, "iptables -I INPUT -s ".$this->getClientIp()." -j DROP\n");
                        }
                    }
                }
            }

            $data = array();
            $data['channel'] = '#errors';
            $data['username'] = $_SERVER['HTTP_HOST'];
            $data['text'] = "• *Erreur* : " . strip_tags($event->getThrowable()->getMessage());
            $data['text'] .= "\n• *Erreur File* : " . strip_tags($event->getThrowable()->getFile()) . " at line :" . strip_tags($event->getThrowable()->getLine());
            $data['text'] .= "\n• *URL* : " . $event->getRequest()->getUri();
            $data['text'] .= "\n• *IP* : " . $this->getClientIp();
            $data['text'] .= $drop_txt;

            if ($this->user) {
                $data['text'] .= "\n• *Utilisateur* : " . $this->user . " with id : " . $this->user->getId();
            }

            $data['unfurl_links'] = false;
            $data_json = json_encode($data);

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $slack_webhook);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Content-Length: ' . strlen($data_json)));
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data_json);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_exec($ch);
            curl_close($ch);
        }
    }
}