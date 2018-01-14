<?php

namespace Ribs\RibsAdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PageController extends Controller
{
	/**
	 * @Route("/page/{url}", name="page", requirements={"url" = "[a-zA-Z0-9\-\_\/]*"})
	 */
	public function renderPageAction(string $url): Response
	{
		$page = $this->getDoctrine()->getManager()->getRepository("RibsAdminBundle:Page")->findOneBy(["url" => $url]);
		
		if ($page) {
			return $this->render("@RibsAdmin/page.html.twig", ["page" => $page]);
		}
		
		throw new NotFoundHttpException("The required page does not exist");
	}
	
	/**
	 * @Route("/contents", name="ribsadmin_contents")
	 */
	public function indexAction(): Response
	{
		return $this->render('RibsAdminBundle:Default:index.html.twig');
	}
}
