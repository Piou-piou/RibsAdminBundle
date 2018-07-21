<?php

namespace PiouPiou\RibsAdminBundle\Controller;

use PiouPiou\RibsAdminBundle\Entity\Account;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ApiController extends AbstractController
{
	/**
	 * @Route("/api/users/authenticate", name="ribsadmin_api_login")
	 * @Method({"GET", "POST"})
	 * @param Request $request
	 * @return JsonResponse
	 * this method is user to authenticate a user by an api request
	 * if success it return a token api that expire in 20 minutes
	 */
	public function login(Request $request): JsonResponse
	{
		$em = $this->getDoctrine()->getManager();
		
		$account = $em->getRepository(Account::class)->findOneBy([
			"username" => $request->get("username"),
		]);
		
		if ($account) {
			$encoder = $this->get("security.password_encoder");
			
			if ($encoder->isPasswordValid($account, $request->get("password")) === true) {
				
				if ($account->getisActive() == false) {
					return new JsonResponse([
						"success" => false,
						"message" => "You account is disabled"
					]);
				}
				
				return new JsonResponse([
					"success" => true,
					"token" => $this->get("ribs_admin.api")->getToken($account)
				]);
			}
		}
		
		return new JsonResponse([
			"success" => false,
			"message" => "bad identifiant and/or password"
		]);
	}
}