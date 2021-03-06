<?php

namespace PiouPiou\RibsAdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class RenderPageController extends AbstractController
{
    /**
     * @Route("/page/{url}", name="page", requirements={"url" = "[a-zA-Z0-9\-\_\/]*"})
     * @param string $url
     * @return Response
     */
    public function renderPage(string $url): Response
    {
        $em = $this->getDoctrine()->getManager();

        $page = $em->getRepository("RibsAdminBundle:Page")->findOneBy(["url" => $url]);
        $navigation = $em->getRepository("RibsAdminBundle:Navigation")->findAllNavigation();

        if ($page) {
            return $this->render("@RibsAdmin/page.html.twig", ["page" => $page, "navigation" => $navigation]);
        }

        throw new NotFoundHttpException("The required page does not exist");
    }
}
