<?php

namespace PiouPiou\RibsAdminBundle\Controller;

use Doctrine\ORM\EntityManagerInterface;
use PiouPiou\RibsAdminBundle\Entity\Version;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class VersionController extends AbstractController
{
    /**
     * @Route("/versions/", name="ribsadmin_versions")
     * @param EntityManagerInterface $em
     * @return Response
     */
    public function index(EntityManagerInterface $em): Response
    {
        $versions = $em->getRepository(Version::class)->findAll();
        
        return $this->render("@RibsAdmin/versions/list.html.twig", ["verions" => $versions]);
    }

    /**
     * @Route("/versions/create/", name="ribsadmin_versions_create")
     * @Route("/versions/show/{guid}", name="ribsadmin_versions_show")
     * @Route("/versions/edit/{guid}", name="ribsadmin_versions_edit")
     * @param Request $request
     * @param EntityManagerInterface $em
     * @param string $guid
     * @return Response
     */
    public function edit(Request $request, EntityManagerInterface $em, string $guid = null): Response
    {
        $em = $this->getDoctrine()->getManager();

        if (!$guid) {
            $version = new Version();
            $text = "created";
        } else {
            $version = $em->getRepository(Version::class)->findOneBy(["guid" => $guid]);
            $text = "edited";
        }

        $form = $this->createForm(\PiouPiou\RibsAdminBundle\Form\Version::class, $version);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            /** @var Version $data */
            $data = $form->getData();
            $em->persist($data);
            $em->flush();
            $this->addFlash("success-flash", "Version " . $data->getProjectName() . " was " . $text);

            return $this->redirectToRoute("ribsadmin_versions");
        }

        return $this->render("@RibsAdmin/versions/edit.html.twig", [
            "form" => $form->createView(),
            "form_errors" => $form->getErrors(),
            "version" => $version
        ]);
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
