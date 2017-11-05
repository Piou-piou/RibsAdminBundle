<?php

namespace Ribs\RibsAdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class AccessRightsController extends Controller
{
	/**
	 * @return Response
	 */
	public function listAction(): Response
	{
		return $this->render("@RibsAdmin/access-rights/list-all-list.html.twig");
	}
}