<?php

namespace PiouPiou\RibsAdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class DefaultController extends AbstractController
{
	/**
	 * @Route("/index", name="ribsadmin_index")
	 * @Route("/navigation", name="ribsadmin_navigation")
	 */
	public function indexAction()
	{
		return $this->render('@RibsAdmin/Default/index.html.twig');
	}
}
