<?php

namespace Ribs\RibsAdminBundle\EventListener;

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
	
	public function prePersist($entity)
	{
		if ($entity->getGuid() === null) {
			$entity->setGuid((string)Uuid::uuid4());
		}
	}
}
