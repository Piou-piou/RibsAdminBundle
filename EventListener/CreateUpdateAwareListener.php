<?php

namespace PiouPiou\RibsAdminBundle\EventListener;

use PiouPiou\RibsAdminBundle\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class CreateUpdateAwareListener
{
    /**
     * @var User
     */
    private $user;

    /**
     * CreateUpdateAwareListener constructor.
     * @param TokenStorageInterface $tokenStorage
     */
    public function __construct(TokenStorageInterface $tokenStorage)
    {
        if ($tokenStorage->getToken() && is_object($tokenStorage->getToken()->getUser()) && $tokenStorage->getToken()->getUser()->getUser()) {
            $this->user = $tokenStorage->getToken()->getUser()->getUser();
        } else {
            $this->user = null;
        }
    }

    public function prePersist($entity)
    {
        if ($this->user) {
            if ($entity->getCreatedBy() === null) {
                $entity->setCreatedAt(new \DateTime());
                $entity->setCreatedBy($this->user);
            }
            if ($entity->getUpdatedBy() === null) {
                $entity->setUpdatedAt(new \DateTime());
                $entity->setUpdatedBy($this->user);
            }
        }
    }

    public function preUpdate($entity)
    {
        if ($this->user) {
            $entity->setUpdatedAt(new \DateTime());
            $entity->setUpdatedBy($this->user);
        }
    }
}
