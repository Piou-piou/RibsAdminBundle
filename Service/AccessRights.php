<?php

namespace Ribs\RibsAdminBundle\Service;

use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Routing\RouterInterface;

class AccessRights
{
	private $em;
	private $router;
	private $session;
	private $request;
	
	/**
	 * AccessRights constructor.
	 * @param ContainerInterface $em
	 * @param RouterInterface $router
	 * @param Session $session
	 * @param RequestStack $request
	 */
	public function __construct(ContainerInterface $em, RouterInterface $router, Session $session, RequestStack $request)
	{
		$this->em = $em;
		$this->router = $router;
		$this->session = $session;
		$this->request = $request;
	}
	
	public function onKernelController() {
		$route = $this->request->getCurrentRequest()->get("_route");
		$admin_page = explode("_", $route)[0];
		
		//$ribs_admin_rights = json_decode(file_get_contents($this->em->get('kernel')->getRootDir()."/../src/Ribs/RibsAdminBundle/Resources/json/ribsadmin_rights.json"));
		
	}
	
	/**
	 * @param $needle
	 * @param $haystack
	 * @return bool|mixed
	 * fonction qui recherche l'url dans le tableau comprenant gestion + resporting
	 */
	private function in_array_recursive($needle, $haystack)
	{
		$rights = [];
		$it = new \RecursiveIteratorIterator(new \RecursiveArrayIterator($haystack));
		
		foreach ($it AS $element => $value) {
			if ($value == $needle) {
				$rights[] = $it->getInnerIterator()["page_id"];
			}
		}
		
		if (count($rights) === 0) {
			return false;
		}
		
		return $rights;
	}
}