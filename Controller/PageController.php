<?php

namespace PiouPiou\RibsAdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

class PageController extends AbstractController
{
    /**
     * @Route("/contents", name="ribsadmin_contents")
     * @return Response
     */
    public function index(): Response
    {
        $navigation = $this->getDoctrine()->getManager()->getRepository("RibsAdminBundle:Navigation")->findAllNavigationPage();

        return $this->render('@RibsAdmin/page/index.html.twig', ["navigation" => $navigation]);
    }

    /**
     * @Route("/contents/edit-page/{page_id}", name="ribsadmin_contents_edit_page")
     * @param int $page_id
     * @return Response
     */
    public function editPage(int $page_id): Response
    {
        $em = $this->getDoctrine()->getManager();
        $navigation = $em->getRepository("RibsAdminBundle:Navigation")->findAllNavigationPage();
        $page = $em->getRepository("RibsAdminBundle:Page")->find($page_id);

        return $this->render('@RibsAdmin/page/edit-page.html.twig', ["navigation" => $navigation, "page" => $page]);
    }
}
