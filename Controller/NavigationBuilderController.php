<?php

namespace Ribs\RibsAdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class NavigationBuilderController extends Controller
{
	public function getLeftNavigationAction()
	{
		$navigation = json_decode(file_get_contents($this->get('kernel')->getRootDir() . "/../src/Ribs/RibsAdminBundle/Resources/json/navigation.json"), true);
		$menu = [];
		
		foreach ($navigation["items"] as $item) {
			if ($this->get("ribs_admin.acess_rights")->testRight($item["right"])) {
				dump("f");
				$menu[] = [
					"url" => $item["url"]
				];
			}
		}
		
		// Testing
		/* dump($menu);*/
		
		return new Response();
	}
}