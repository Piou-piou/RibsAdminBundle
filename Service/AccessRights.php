<?php

namespace Ribs\RibsAdminBundle\Service;

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
	
	public function onKernelController()
	{
		$route = $this->request->getCurrentRequest()->get("_route");
		$admin_page = explode("_", $route)[0];
		
		//comment because it cause errore redirect
		/*if ($route == "fos_user_security_login" || $route == "fos_user_registration_register") {
			$this->session->clear();
			$this->em->get("security.token_storage")->setToken(null);
		}*/
		
		//to show admin panel
		if (in_array($route, ["_profiler", "_profiler_search_bar", "_wdt"])) {
			return;
		}
		
		$ribs_admin_rights = json_decode(file_get_contents($this->getBaseBundlePath() . "/Resources/json/ribsadmin_rights.json"));
		
		if ($admin_page == "ribsadmin" && ($route !== 404) && ($route !== null)) {
			$route_right = $this->in_array_recursive($route, $ribs_admin_rights);
			$user_rights = $this->getUserRights();
			
			if ($route_right === false) {
				throw new AccessDeniedException("No access");
			}
			
			foreach ($user_rights as $right) {
				if (in_array($right, $route_right)) {
					return;
				}
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
		
		if (in_array($right, $user_rights)) {
			return true;
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
	 * @return string
	 */
	private function getBaseBundlePath(): string
	{
		$path = explode("/", __DIR__);
		array_pop($path);
		
		return implode("/", $path);
	}
}