<?php

namespace Ribs\RibsAdminBundle\Controller;

use FOS\UserBundle\Controller\SecurityController as FOSController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Security;

class LoginController extends FOSController
{
	/**
	 * @param Request $request
	 *
	 * @return Response
	 */
	public function loginAction(Request $request)
	{
		/** @var $session \Symfony\Component\HttpFoundation\Session\Session */
		$session = $request->getSession();
		
		$authErrorKey = Security::AUTHENTICATION_ERROR;
		$lastUsernameKey = Security::LAST_USERNAME;
		
		// get the error if any (works with forward and redirect -- see below)
		if ($request->attributes->has($authErrorKey)) {
			$error = $request->attributes->get($authErrorKey);
		} else if (null !== $session && $session->has($authErrorKey)) {
			$error = $session->get($authErrorKey);
			$session->remove($authErrorKey);
		} else {
			$error = null;
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
		]);
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
	
	public function checkAction()
	{
		throw new \RuntimeException('You must configure the check path to be handled by the firewall using form_login in your security firewall configuration.');
	}
	
	public function logoutAction()
	{
		throw new \RuntimeException('You must activate the logout in your security firewall configuration.');
	}
}
