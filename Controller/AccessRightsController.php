<?php

namespace Ribs\RibsAdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AccessRightsController extends Controller
{
	/**
	 * @Route("/access-rights-management", name="ribsadmin_access_rights")
	 * @return Response
	 */
	public function listAction(): Response
	{
		return $this->render("@RibsAdmin/access-rights/list-all-list.html.twig");
	}
}