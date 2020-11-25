<?php

namespace PiouPiou\RibsAdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
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

    /**
     * @Route("/versions/edit/{id}", name="ribsadmin_versions_edit")
     * @param int $id
     * @return Response
     */
    public function edit(int $id): Response
    {
        return $this->render('@RibsAdmin/versions/edit.html.twig');
    }

    /**
     * @Route("/versions/delete/{id}", name="ribsadmin_versions_delete")
     * @param int $id
     * @return RedirectResponse
     */
    public function delete(int $id): RedirectResponse
    {
        return $this->redirectToRoute("ribsadmin_modules");
    }
}
