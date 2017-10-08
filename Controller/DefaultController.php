<?php

namespace Ribs\RibsFrameworkBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class DefaultController extends Controller
{
    /**
     * @Route("/toto", name="ribsadmin_index")
     */
    public function indexAction()
    {
        return $this->render('RibsFrameworkBundle:Default:index.html.twig');
    }
}
