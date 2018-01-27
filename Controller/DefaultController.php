<?php

namespace PiouPiou\RibsAdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class DefaultController extends Controller
{
	/**
	 * @Route("/index", name="ribsadmin_index")
	 * @Route("/navigation", name="ribsadmin_navigation")
	 */
	public function indexAction()
	{
		return $this->render('RibsAdminBundle:Default:index.html.twig');
	}
}
