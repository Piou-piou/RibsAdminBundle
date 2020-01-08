<?php

namespace PiouPiou\RibsAdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;

class PageController extends AbstractController
{
    /**
     * method to show index page of content management
     * @Route("/contents", name="ribsadmin_contents")
     * @return Response
     */
	public function indexAction(): Response
	{
		$navigation = $this->getDoctrine()->getManager()->getRepository("RibsAdminBundle:Navigation")->findAllNavigationPage();
		
		return $this->render('@RibsAdmin/page/index.html.twig', ["navigation" => $navigation]);
	}
}
