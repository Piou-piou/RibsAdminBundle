<?php

namespace PiouPiou\RibsAdminBundle\Controller;

use PiouPiou\RibsAdminBundle\Entity\Module;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ModuleController extends AbstractController
{
    /**
     * @Route("/modules/", name="ribsadmin_modules")
     * @return Response
     * function that return a list of all modules
     */
    public function AccountsListAction(): Response
    {
        $em = $this->getDoctrine()->getManager();

        $modules = $em->getRepository(Module::class)->findBy([], ['titleTag' => 'ASC']);

        return $this->render('@RibsAdmin/modules/list.html.twig', [
            "modules" => $modules,
        ]);
    }
}
