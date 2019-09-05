<?php

namespace PiouPiou\RibsAdminBundle\Service;

use PiouPiou\RibsAdminBundle\Entity\User;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class AccessRights
{
	/**
	 * @var ContainerInterface
	 */
	private $container;
	
	/**
	 * @var RouterInterface
	 */
	private $router;
	
	/**
	 * @var Session
	 */
	private $session;
	
	/**
	 * @var RequestStack
	 */
	private $request;
	
	/**
	 * @var Globals
	 */
	private $globals;
	
	/**
	 * @var ModuleService
	 */
	private $module;
	
	/**
	 * @var User
	 */
	private $user;
	
	/**
	 * AccessRights constructor.
	 * @param ContainerInterface $container
	 * @param RouterInterface $router
	 * @param Session $session
	 * @param RequestStack $request
	 * @param Globals $globals
	 * @param ModuleService $module
	 */
	public function __construct(ContainerInterface $container, RouterInterface $router, Session $session, RequestStack $request, Globals $globals, ModuleService $module)
	{
		$this->container = $container;
		$this->router = $router;
		$this->session = $session;
		$this->request = $request;
		$this->globals = $globals;
		$this->module = $module;
	}
	
	public function onKernelController()
	{
		$route = $this->request->getCurrentRequest()->get("_route");
		$route_array = explode("_", $route);
		$admin_page = $route_array[0];
		$api = count($route_array) > 1 ? $route_array[1] : null;
		
		//to show admin panel
		if (in_array($route, ["_profiler", "_profiler_search_bar", "_wdt"])) {
			return;
		}
		
		$ribs_admin_rights = json_decode(file_get_contents($this->globals->getBaseBundlePath() . "/Resources/json/ribsadmin_rights.json"));
		$modules_rights = $this->module->getModuleRights();
		$ribs_admin_rights = (object)array_merge((array)$ribs_admin_rights, (array)$modules_rights);
		
		if ($admin_page == "ribsadmin" && $api !== "api" && strpos($route, "login") === false && strpos($route, "register") === false) {
			//redirection si user pas connecté
			if ($this->container->get("security.token_storage")->getToken() === null || !$this->container->get('security.authorization_checker')->isGranted('IS_AUTHENTICATED_FULLY')) {
				return new RedirectResponse($this->router->generate("login"));
			}
			
			$this->user = $this->container->get("security.token_storage")->getToken()->getUser()->getUser();
			
			$route_right = $this->in_array_recursive($route, $ribs_admin_rights);
			
			if ($route_right === false) {
				throw new AccessDeniedException("No access");
			}
			
			if ($this->testRouteRight($route_right) === true) {
				return;
			} else if ($this->user->getAdmin() === true && in_array("ribsadmin@index", $route_right)) {
				return;
			}
			
			throw new AccessDeniedException("No access");
		}
	}
	
	/**
     * function that allow to test a right directly in the view
	 * @param string $right
	 * @return bool
	 */
	public function testRight(string $right): bool
	{
		$user_rights = $this->getUserRights();
		$list_rights = $this->getRightsListOfUser();
		
		$all_rights = array_merge($user_rights, $list_rights);

        if (in_array("*", $all_rights)) {
            return true;
        }

		if (in_array($right, $all_rights)) {
			return true;
		}
		
		return false;
	}
	
	/**
     * test if route_right is found in users rights
	 * @param array $route_right
	 * @return bool
	 */
	private function testRouteRight(array $route_right): bool
	{
		$user_rights = $this->getUserRights();
		$list_rights = $this->getRightsListOfUser();
		
		$all_rights = array_merge($user_rights, $list_rights);

		if (in_array("*", $all_rights)) {
		    return true;
        }

		foreach ($all_rights as $right) {
			if (in_array($right, $route_right)) {
				return true;
			}
		}
		
		return false;
	}
	
	/**
     * function that search if the right contain an url or more
	 * @param $needle
	 * @param $haystack
	 * @return bool|mixed
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
     * function that retun a array that contain all user rights or empty array if no right found
	 * @return array
	 */
	private function getUserRights(): array
	{
		$user_rights = $this->user->getAccessRights();
		
		if ($user_rights) {
			return explode(",", $user_rights);
		}
		
		return [""];
	}
	
	/**
     * function that retun a array that contain all rights of rattached list right of the current user
	 * @return array
	 */
	private function getRightsListOfUser(): array
	{
		if ($this->user->getAccessRightList()) {
			$user_rights = $this->user->getAccessRightList()->getAccessRights();
			
			if ($user_rights) {
				return explode(",", $user_rights);
			}
		}
		
		return [""];
	}
}
