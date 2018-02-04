<?php

namespace PiouPiou\RibsAdminBundle\Service;

use PiouPiou\RibsAdminBundle\Entity\Module;
use Symfony\Component\DependencyInjection\ContainerInterface;

class ModuleService
{
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
	 * @return array
	 * method that return all infos needed in access right management page
	 */
	public function getAllInfosModules()
	{
		$modules = $this->em->get("doctrine")->getRepository(Module::class)->findBy([
			"active" => true,
			"displayed" => true
		]);
		$modules_data = [];
		
		foreach ($modules as $module) {
			$modules_data[] = [
				"name" => $module->getTitle(),
				"rights" => (array)json_decode(file_get_contents($this->globals->getBaseBundlePath($module->getPackageName()) . "/Resources/json/ribsadmin_rights.json"))
			];
		}
		
		return $modules_data;
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