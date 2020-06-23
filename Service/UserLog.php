<?php

namespace PiouPiou\RibsAdminBundle\Service;

use Doctrine\ORM\EntityManagerInterface;
use PiouPiou\RibsAdminBundle\Entity\UserLogs;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class UserLog
{
    /**
     * @var TokenStorageInterface
     */
    private $token_storage;

    /**
     * @var EntityManagerInterface a
     */
    private $em;

    public function __construct(TokenStorageInterface $token_storage, EntityManagerInterface $em)
    {
        $this->token_storage = $token_storage;
        $this->em = $em;
    }

    /**
     * @param RequestEvent $request_event
     */
    public function onKernelRequest(RequestEvent $request_event)
    {
        if ($request_event->isMasterRequest()) {
            $user = null;
            if ($this->token_storage->getToken() && is_object($this->token_storage->getToken()->getUser()) && $this->token_storage->getToken()->getUser()->getUser()) {
                $user = $this->token_storage->getToken()->getUser()->getUser();
            }
            $request = $request_event->getRequest();

            $user_log = new UserLogs();
            $user_log->setMethod($request->getMethod());
            $user_log->setUser($user);
            $user_log->setUrl($request->get("_route"));
            $user_log->setRequestParameters($request->request->all());
            $this->em->persist($user_log);
            $this->em->flush();
        }
    }
}
