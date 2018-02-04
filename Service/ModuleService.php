<?php

namespace PiouPiou\RibsAdminBundle\Service;

use PiouPiou\RibsAdminBundle\Entity\Module;
use Symfony\Component\DependencyInjection\ContainerInterface;

class ModuleService {
	private $em;
	private $globals;
	
	/**
	 * AccessRights constructor.
	 * @param ContainerInterface $em
	 * @param Globals $globals
	 */
	public function __construct(ContainerInterface $em, Globals $globals)
	{
		$this->em = $em;
		$this->globals = $globals;
	}
	
	/**
	 * @return object
	 * function that return all modules rights
	 */
	public function getModuleRights()
	{
		$modules = $this->em->get("doctrine")->getRepository(Module::class)->findBy([
			"active" => true,
			"displayed" => true
		]);
		$rights = [];
		
		foreach ($modules as $module) {
			$rights[] = json_decode(file_get_contents($this->globals->getBaseBundlePath($module->getPackageName()) . "/Resources/json/ribsadmin_rights.json"));
		}
		
		return (object)$rights;
	}
}