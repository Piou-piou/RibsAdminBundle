<?php

namespace Ribs\RibsAdminBundle\EventListener;

use Doctrine\ORM\Event\LifecycleEventArgs;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Ramsey\Uuid\Uuid;

class GuidAwareListener
{
	/**
	 * @var ContainerInterface
	 */
	private $container;
	
	public function __construct(ContainerInterface $container)
	{
		$this->container = $container;
	}
	
	public function prePersist($entity, LifecycleEventArgs $events)
	{
		if ($entity->getGuid() === null) {
			$entity->setGuid((string)Uuid::uuid4());
		}
	}
}
