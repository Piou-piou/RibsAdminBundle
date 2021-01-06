<?php

namespace PiouPiou\RibsAdminBundle\EventListener;

use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;

class ExceptionListener
{
    private $paramter;

    public function __construct(ParameterBagInterface $parameterBag)
    {
        $this->paramter = $parameterBag;
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