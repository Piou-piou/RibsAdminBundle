<?php

namespace PiouPiou\RibsAdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class VersionController extends AbstractController
{
    /**
     * @Route("/versions/", name="ribsadmin_versions")
     * @return Response
     */
    public function index(): Response
    {
        return $this->render('@RibsAdmin/versions/list.html.twig');
    }
}
