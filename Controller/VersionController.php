<?php

namespace PiouPiou\RibsAdminBundle\Controller;

use Doctrine\ORM\EntityManagerInterface;
use PiouPiou\RibsAdminBundle\Entity\Version;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class VersionController extends AbstractController
{
    /**
     * @Route("/versions/edit/{guid_package}/{version_number}", name="ribsadmin_version_edit")
     * @param EntityManagerInterface $em
     * @param Request $request
     * @param string $guid_package
     * @param string $version_number
     * @return Response
     */
    public function edit(EntityManagerInterface $em, Request $request, string $guid_package, string $version_number): Response
    {
        $version = $em->getRepository(Version::class)->findOneBy(["guid" => $guid_package]);

        if (!$version) {
            $version = new Version();
            $version->setVersionNumber($version_number);
            $em->persist($version);
            $em->flush();
        }

        $form = $this->createForm(\PiouPiou\RibsAdminBundle\Form\Version::class, $version);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            /** @var Version $data */
            $data = $form->getData();
            $em->persist($data);
            $em->flush();
            $this->addFlash("success-flash", "Version " . $data->getVersionNumber() . " was edited");

            return $this->redirectToRoute("ribsadmin_packages");
        }

        return $this->render("@RibsAdmin/packages/versions/edit.html.twig", [
            "form" => $form->createView(),
            "form_errors" => $form->getErrors(),
        ]);
    }
}