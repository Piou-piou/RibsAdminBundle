<?php

namespace PiouPiou\RibsAdminBundle\Controller;

use PiouPiou\RibsAdminBundle\Entity\Account;
use PiouPiou\RibsAdminBundle\Service\Api;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\EncoderFactoryInterface;

class ApiController extends AbstractController
{
    /**
     * this method is user to authenticate a user by an api request
     * if success it return a token api that expire in 20 minutes
     * @Route("/api/users/authenticate", name="ribsadmin_api_login", methods={"POST"})
     * @param Request $request
     * @param Api $api
     * @param EncoderFactoryInterface $encoder
     * @return JsonResponse
     * @throws \Exception
     */
	public function login(Request $request, Api $api, EncoderFactoryInterface $encoder): JsonResponse
	{
		$em = $this->getDoctrine()->getManager();
		
		$account = $em->getRepository(Account::class)->findOneBy([
			"username" => $request->get("username"),
		]);
		
		if ($account) {
			$encoder = $this->get("security.password_encoder");
			
			if ($encoder->getEncoder($account)->isPasswordValid($account->getPassword(), $request->get("password"), '') === true) {
				if ($account->getisActive() == false) {
					return new JsonResponse([
						"success" => false,
						"message" => "You account is disabled"
					]);
				}
				
				return new JsonResponse([
					"success" => true,
					"token" => $api->getToken($account)
				]);
			}
		}
		
		return new JsonResponse([
			"success" => false,
			"message" => "bad identifiant and/or password"
		]);
	}

    /**
     * method that test if user steel logged and send token or new token if it was expired
     * @Route("/api/users/test-token", name="ribsadmin_api_test_token", methods={"POST"})
     * @param Request $request
     * @param Api $api
     * @param Session $session
     * @return JsonResponse
     * @throws \Exception
     */
    public function testUserToken(Request $request, Api $api, Session $session): JsonResponse
    {
        $test_logged = $api->userIslogged($request->get("infos"), $request->get("token"));

        if ($test_logged === false) {
            return new JsonResponse([
                "success" => $test_logged,
                "error_message" => "Votre compte a été archivé, vous ne pouvez plus vous connecter",
            ]);
        }

        return new JsonResponse([
            "success" => $test_logged,
            "token" => $api->getToken($session->get("account")),
        ]);
    }
}
