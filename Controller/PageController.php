<?php

namespace Ribs\RibsAdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;

class PageController extends Controller
{
	/**
	 * @Route("/page/{url}", name="ribsadmin_navigation", requirements={"url" = "[a-zA-Z0-9\-\_\/]*"})
	 */
	public function renderPageAction(string $url): Response
	{
		return new Response();
	}
}
