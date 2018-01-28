<?php

namespace PiouPiou\RibsAdminBundle\Service;

use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class AccessRights
{
	private $em;
	private $router;
	private $session;
	private $request;
	private $globals;
	
	/**
	 * AccessRights constructor.
	 * @param ContainerInterface $em
	 * @param RouterInterface $router
	 * @param Session $session
	 * @param RequestStack $request
	 */
	public function __construct(ContainerInterface $em, RouterInterface $router, Session $session, RequestStack $request, Globals $globals)
	{
		$this->em = $em;
		$this->router = $router;
		$this->session = $session;
		$this->request = $request;
		$this->globals = $globals;
	}
	
	public function onKernelController()
	{
		$route = $this->request->getCurrentRequest()->get("_route");
		$admin_page = explode("_", $route)[0];
		
		//to show admin panel
		if (in_array($route, ["_profiler", "_profiler_search_bar", "_wdt"])) {
			return;
		}
		
		$ribs_admin_rights = json_decode(file_get_contents($this->globals->getBaseBundlePath() . "/Resources/json/ribsadmin_rights.json"));
		
		if ($admin_page == "ribsadmin" && strpos($route, "login") == false && strpos($route, "register") == false) {
			$route_right = $this->in_array_recursive($route, $ribs_admin_rights);
			
			if ($route_right === false) {
				throw new AccessDeniedException("No access");
			}
			
			if ($this->testRouteRight($route_right) === true) {
				return;
			}
			
			throw new AccessDeniedException("No access");
		}
	}
	
	/**
	 * @param string $right
	 * @return bool
	 * function that allow to test a right directly in the view
	 */
	public function testRight(string $right): bool
	{
		$user_rights = $this->getUserRights();
		$list_rights = $this->getRightsListOfUser();
		
		$all_rights = array_merge($user_rights, $list_rights);
		
		if (in_array($right, $all_rights)) {
			return true;
		}
		
		return false;
	}
	
	/**
	 * @param array $route_right
	 * @return bool
	 * test if route_right is found in users rights
	 */
	private function testRouteRight(array $route_right): bool {
		$user_rights = $this->getUserRights();
		$list_rights = $this->getRightsListOfUser();
		
		$all_rights = array_merge($user_rights, $list_rights);
		
		foreach ($all_rights as $right) {
			if (in_array($right, $route_right)) {
				return true;
			}
		}
		
		return false;
	}
	
	/**
	 * @param $needle
	 * @param $haystack
	 * @return bool|mixed
	 * fonction that search if the right contain an url or more
	 */
	private function in_array_recursive($needle, $haystack)
	{
		$rights = [];
		$it = new \RecursiveIteratorIterator(new \RecursiveArrayIterator($haystack));
		
		foreach ($it AS $element => $value) {
			if ($value == $needle) {
				$rights[] = $it->getInnerIterator()["right"];
			}
		}
		
		if (count($rights) === 0) {
			return false;
		}
		
		return $rights;
	}
	
	
	/**
	 * @return array function that retun a array that contain all user rights or empty array if no right found
	 */
	private function getUserRights(): array
	{
		$user_rights = $this->em->get("security.token_storage")->getToken()->getUser()->getUser()->getAccessRights();
		
		if ($user_rights) {
			return explode(",", $user_rights);
		}
		
		return [""];
	}
	
	/**
	 * @return array function that retun a array that contain all rights of rattached list right of the current user
	 */
	private function getRightsListOfUser(): array {
		if ($this->em->get("security.token_storage")->getToken()->getUser()->getUser()->getAccessRightList()) {
			$user_rights = $this->em->get("security.token_storage")->getToken()->getUser()->getUser()->getAccessRightList()->getAccessRights();
			
			if ($user_rights) {
				return explode(",", $user_rights);
			}
		}
		
		return [""];
	}
}