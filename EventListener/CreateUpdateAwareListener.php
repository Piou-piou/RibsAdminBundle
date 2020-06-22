<?php

namespace PiouPiou\RibsAdminBundle\EventListener;

use PiouPiou\RibsAdminBundle\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;

class CreateUpdateAwareListener
{
	/**
	 * @var User
	 */
	private $user;

    /**
     * CreateUpdateAwareListener constructor.
     * @param TokenStorage $tokenStorage
     */
    public function __construct(TokenStorage $tokenStorage)
	{
        $this->user = $tokenStorage->getToken()->getUser()->getUser();
	}
	
	public function prePersist($entity)
	{
		if ($entity->getCreatedBy() === null) {
            $entity->setCreatedAt(new \DateTime());
            $entity->setCreatedBy($this->user);
		}
        if ($entity->getUpdatedBy() === null) {
            $entity->setUpdatedAt(new \DateTime());
            $entity->setUpdatedBy($this->user);
        }
	}

    public function preUpdate($entity)
    {
        $entity->setUpdatedAt(new \DateTime());
        $entity->setUpdatedBy($this->user);
    }
}
