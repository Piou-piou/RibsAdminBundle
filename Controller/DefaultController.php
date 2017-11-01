<?php

namespace Ribs\RibsAdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class DefaultController extends Controller
{
	/**
	 * @Route("/index", name="ribsadmin_index")
	 * @Route("/accounts", name="ribsadmin_accounts")
	 * @Route("/access-rights-management", name="ribsadmin_access_rights")
	 * @Route("/contents", name="ribsadmin_contents")
	 * @Route("/navigation", name="ribsadmin_navigation")
	 *
	 */
	public function indexAction()
	{
		return $this->render('RibsAdminBundle:Default:index.html.twig');
	}
}
