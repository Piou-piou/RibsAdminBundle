<?php

namespace Ribs\RibsAdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class NavigationBuilderController extends Controller
{
	/**
	 * @return Response function that display the left navigation mapped by user rights
	 */
	public function getLeftNavigationAction(): Response
	{
		$navigation = json_decode(file_get_contents($this->get('kernel')->getRootDir() . "/../src/Ribs/RibsAdminBundle/Resources/json/navigation.json"), true);
		$menu = [];
		
		foreach ($navigation["items"] as $item) {
			if ($this->get("ribs_admin.acess_rights")->testRight($item["right"])) {
				$menu[] = $item;
			}
		}
		
		return $this->render("@RibsAdmin/navigation.html.twig", ["navigation" => $menu]);
	}
}