<?php

namespace PiouPiou\RibsAdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    /**
     * @Route("/", name="ribsadmin")
     * @Route("/index", name="ribsadmin_index")
     * @Route("/navigation", name="ribsadmin_navigation")
     */
    public function indexAction()
    {
        return $this->render('@RibsAdmin/Default/index.html.twig');
    }
}
