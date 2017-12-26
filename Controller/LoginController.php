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
	public function loginAction(Request $request)
	{
		/** @var $session \Symfony\Component\HttpFoundation\Session\Session */
		/*$session = $request->getSession();
		
		$authErrorKey = Security::AUTHENTICATION_ERROR;
		$lastUsernameKey = Security::LAST_USERNAME;
		$error = null;
		
		// get the error if any (works with forward and redirect -- see below)
		if ($request->attributes->has($authErrorKey)) {
			$error = $request->attributes->get($authErrorKey);
		} else if (null !== $session && $session->has($authErrorKey)) {
			$error = $session->get($authErrorKey);
			$session->remove($authErrorKey);
		}
		
		if (!$error instanceof AuthenticationException) {
			$error = null; // The value does not come from the security component.
		}
		
		if ($error !== null) {
			$this->addFlash("error-flash", "Login informations are invalid");
		}
		
		// last username entered by the user
		$lastUsername = (null === $session) ? '' : $session->get($lastUsernameKey);
		
		$csrfToken = $this->has('security.csrf.token_manager')
			? $this->get('security.csrf.token_manager')->getToken('authenticate')->getValue()
			: null;
		
		return $this->renderLogin([
			'last_username' => $lastUsername,
			'error' => $error,
			'csrf_token' => $csrfToken,
		]);*/
		
		$csrfToken = $this->has('security.csrf.token_manager')
			? $this->get('security.csrf.token_manager')->getToken('authenticate')->getValue()
			: null;
		
		$authUtils = $this->get("security.authentication_utils");
		
		// get the login error if there is one
		$error = $authUtils->getLastAuthenticationError();
		
		// last username entered by the user
		$lastUsername = $authUtils->getLastUsername();
		
		return $this->render('@RibsAdmin/login/login.html.twig', array(
			'last_username' => $lastUsername,
			'error'         => $error,
			'csrf_token' => $csrfToken,
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
