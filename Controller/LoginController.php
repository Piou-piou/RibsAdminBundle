<?php

namespace PiouPiou\RibsAdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Annotation\Route;

class LoginController extends Controller
{
	/**
	 * @Route("/login/", name="ribsadmin_login")
	 * @param Request $request
	 * @return Response
	 */
	public function loginAction(): Response
	{
		$csrf_token = $this->has('security.csrf.token_manager')
			? $this->get('security.csrf.token_manager')->getToken('authenticate')->getValue()
			: null;
		
		$auth_utils = $this->get("security.authentication_utils");
		
		if ($auth_utils->getLastAuthenticationError()) {
			$this->addFlash("error-flash", "Your login or password are incorrect");
		}
		
		// last username entered by the user
		$last_username = $auth_utils->getLastUsername();
		
		return $this->render('@RibsAdmin/login/login.html.twig', array(
			'last_username' => $last_username,
			'csrf_token' => $csrf_token,
		));
	}
	
	/**
	 * @param array $data
	 * @return Response
	 */
	protected function renderLogin(array $data): Response
	{
		$securityContext = $this->container->get('security.authorization_checker');
		
		if ($securityContext->isGranted('IS_AUTHENTICATED_REMEMBERED') || $securityContext->isGranted('IS_AUTHENTICATED_FULLY')) {
			$this->addFlash("info-flash", "You were connected with success");
			
			return new RedirectResponse($this->generateUrl("ribsadmin_index"), 303);
		}
		
		return $this->render("@RibsAdmin/login/login.html.twig", $data);
	}
}
