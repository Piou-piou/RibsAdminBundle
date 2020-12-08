<?php

namespace PiouPiou\RibsAdminBundle\Controller;

use Doctrine\ORM\EntityManagerInterface;
use PiouPiou\RibsAdminBundle\Entity\Version;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Constraints\Date;

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
     * @param string|null $guid
     * @return Response
     */
    public function edit(Request $request, EntityManagerInterface $em, string $guid = null): Response
    {
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
     * @Route("/versions/delete/{guid}", name="ribsadmin_versions_delete")
     * @param EntityManagerInterface $em
     * @param string $guid
     * @return RedirectResponse
     */
    public function delete(EntityManagerInterface $em, string $guid): RedirectResponse
    {
        $version = $em->getRepository(Version::class)->findOneBy(["guid" => $guid]);

        if ($version) {
            $em->remove($version);
            $em->flush();
            $this->addFlash("success-flash", "The project version was deleted");
        } else {
            $this->addFlash("error-flash", "The project version was not found");
        }

        return $this->redirectToRoute("ribsadmin_versions");
    }

    /**
     * @Route("/versions/update/{guid}", name="ribsadmin_versions_update")
     * @param EntityManagerInterface $em
     * @param \PiouPiou\RibsAdminBundle\Service\Version $version
     * @param string $guid
     * @return RedirectResponse
     */
    public function updateVersion(EntityManagerInterface $em, \PiouPiou\RibsAdminBundle\Service\Version $version, string $guid): RedirectResponse
    {
        $version_entity = $em->getRepository(Version::class)->findOneBy(["guid" => $guid]);

        if ($version_entity) {
            $version_entity->setVersion($version->getVersion($version_entity->getPackageName()));
            $version_entity->setVersionDate($version->getVersionDate($version_entity->getPackageName()));
            $version_entity->setLastCheck(new \DateTime());
            $em->persist($version_entity);
            $em->flush();

            $this->addFlash("success-flash", "The project version was updated");
        } else {
            $this->addFlash("error-flash", "The project version was not found");
        }

        return $this->redirectToRoute("ribsadmin_versions");
    }

    /**
     * @Route("/versions/send-version/{package_name}", name="ribsadmin_versions_send", requirements={"package_name"=".+"})
     * @param \PiouPiou\RibsAdminBundle\Service\Version $version
     * @param string $package_name
     * @return mixed|null
     */
    public function sendPackageInformations(\PiouPiou\RibsAdminBundle\Service\Version $version, string $package_name): JsonResponse
    {
        return new JsonResponse([
            "version" => $version->getVersion($package_name),
            "version_date" => $version->getVersionDate($package_name)
        ]);
    }
}
