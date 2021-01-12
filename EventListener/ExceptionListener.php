<?php

namespace PiouPiou\RibsAdminBundle\EventListener;

use PiouPiou\RibsAdminBundle\Entity\User;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
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
            $data = array();
            $data['channel'] = '#errors';
            $data['username'] = $_SERVER['HTTP_HOST'];
            $data['text'] = "• *Erreur* : " . strip_tags($event->getThrowable()->getMessage());
            $data['text'] .= "\n• *Erreur File* : " . strip_tags($event->getThrowable()->getFile()) . " at line :" . strip_tags($event->getThrowable()->getLine());
            $data['text'] .= "\n• *URL* : " . $event->getRequest()->getUri();
            $data['text'] .= "\n• *IP* : " . $this->getClientIp();

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