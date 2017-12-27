<?php

namespace Ribs\RibsAdminBundle\Controller;

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
	 *
	 * @return Response
	 */
	public function loginAction()
	{
		$csrf_token = $this->has('security.csrf.token_manager')
			? $this->get('security.csrf.token_manager')->getToken('authenticate')->getValue()
			: null;
		
		$auth_utils = $this->get("security.authentication_utils");
		
		// get the login error if there is one
		$error = $auth_utils->getLastAuthenticationError();
		
		// last username entered by the user
		$last_username = $auth_utils->getLastUsername();
		
		return $this->render('@RibsAdmin/login/login.html.twig', array(
			'last_username' => $last_username,
			'error' => $error,
			'csrf_token' => $csrf_token,
		));
	}
	
	/**
	 * @param array $data
	 *
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
