<?php

namespace PiouPiou\RibsAdminBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ApiController extends AbstractController {
	/**
	 * @Route("/api/users/authenticate", name="ribsadmin_api_login")
	 * @Method("POST")
	 */
	public function login()
	{
		return new JsonResponse();
	}
}