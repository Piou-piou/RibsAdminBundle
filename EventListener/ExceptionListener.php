<?php

namespace PiouPiou\RibsAdminBundle\EventListener;

use PiouPiou\RibsAdminBundle\Entity\User;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
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

    public function __construct(ParameterBagInterface $parameterBag, TokenStorageInterface $tokenStorage)
    {
        $this->paramter = $parameterBag;
        if ($tokenStorage->getToken() && is_object($tokenStorage->getToken()->getUser()) && $tokenStorage->getToken()->getUser()->getUser()) {
            $this->user = $tokenStorage->getToken()->getUser()->getUser();
        }
    }

    public function onKernelException(ExceptionEvent $event)
    {
        $slack_webhook = $this->paramter->get('ribs_admin.slack_webhook');
        if ($slack_webhook) {
            $data = array();
            $data['channel'] = '#errors';
            $data['username'] = $_SERVER['HTTP_HOST'];
            $data['text'] = "• *Erreur* : " . strip_tags($event->getThrowable()->getMessage());
            $data['text'] .= "\n• *Erreur File* : " . strip_tags($event->getThrowable()->getFile()) . " at line :" . strip_tags($event->getThrowable()->getLine());
            $data['text'] .= "\n• *URL* : " . $event->getRequest()->getUri();

            if ($this->user) {
                $data['text'] .= "\n• *Utilisateur* : " . $this->user . " with id : " . $this->user->getId();
            }

            $data['unfurl_links'] = false;
            $data_json = json_encode($data);

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $slack_webhook);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json','Content-Length: ' . strlen($data_json)));
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data_json);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_exec($ch);
            curl_close($ch);
        }
    }
}