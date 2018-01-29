<?php

namespace PiouPiou\RibsAdminBundle\Controller;

use PiouPiou\RibsAdminBundle\Entity\Module;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class NavigationBuilderController extends Controller
{
	private  $nav = [];
	
	/**
	 * @return Response function that display the left navigation mapped by user rights
	 */
	public function getLeftNavigationAction(): Response
	{
		$navigation = json_decode(file_get_contents($this->get("ribs_admin.globals")->getBaseBundlePath() . "/Resources/json/navigation.json"), true);
		
		foreach ($navigation["items"] as $item) {
			if ($this->get("ribs_admin.acess_rights")->testRight($item["right"])) {
				dump($item);
				$this->nav[] = $item;
			}
		}
		
		$this->getModuleNavigation();
		
		return $this->render("@RibsAdmin/navigation.html.twig", ["navigation" => $this->nav]);
	}
	
	/**
	 * to get all modules navigation and test right navigation
	 */
	private function getModuleNavigation()
	{
		$modules = $this->getDoctrine()->getRepository(Module::class)->findBy([
			"active" => true,
			"displayed" => true
		]);
		
		foreach ($modules as $module) {
			$this->nav[] = [
				"right" => "ribsadmin@blog",
				"url" => "ribsbadmin_index",
				"icon" => "",
				"text" => $module->getTitle()
			];
		}
	}
}