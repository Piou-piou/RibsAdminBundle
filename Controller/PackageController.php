<?php

namespace PiouPiou\RibsAdminBundle\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Exception;
use PiouPiou\RibsAdminBundle\Entity\Package;
use PiouPiou\RibsAdminBundle\Service\PackagistApi;
use PiouPiou\RibsAdminBundle\Service\Version;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;

class PackageController extends AbstractController
{
    /**
     * @Route("/packages/", name="ribsadmin_packages")
     * @param EntityManagerInterface $em
     * @return Response
     */
    public function index(EntityManagerInterface $em): Response
    {
        $packages = $em->getRepository(Package::class)->findAll();
        
        return $this->render("@RibsAdmin/packages/list.html.twig", ["packages" => $packages]);
    }

    /**
     * @Route("/packages/create/", name="ribsadmin_packages_create")
     * @Route("/packages/show/{guid}", name="ribsadmin_packages_show")
     * @Route("/packages/edit/{guid}", name="ribsadmin_packages_edit")
     * @param Request $request
     * @param EntityManagerInterface $em
     * @param PackagistApi $packagist
     * @param string|null $guid
     * @return Response
     * @throws ClientExceptionInterface
     * @throws RedirectionExceptionInterface
     * @throws ServerExceptionInterface
     * @throws TransportExceptionInterface
     */
    public function edit(Request $request, EntityManagerInterface $em, PackagistApi $packagist, string $guid = null): Response
    {
        $disabled_form = strpos($request->get("_route"), "_show") ? true : false;
        if (!$guid) {
            $package = new Package();
            $text = "created";
        } else {
            $package = $em->getRepository(Package::class)->findOneBy(["guid" => $guid]);
            $text = "edited";
        }

        $form = $this->createForm(\PiouPiou\RibsAdminBundle\Form\Package::class, $package, ["disabled" => $disabled_form]);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            /** @var Package $data */
            $data = $form->getData();
            $em->persist($data);
            $em->flush();
            $this->addFlash("success-flash", "Package " . $data->getProjectName() . " was " . $text);

            return $this->redirectToRoute("ribsadmin_packages");
        }

        return $this->render("@RibsAdmin/packages/edit.html.twig", [
            "disabled_form" => $disabled_form,
            "form" => $form->createView(),
            "form_errors" => $form->getErrors(),
            "package" => $package,
            "versions" => $packagist->getAllPackagistVersions($package->getPackageName())
        ]);
    }

    /**
     * @Route("/packages/delete/{guid}", name="ribsadmin_packages_delete")
     * @param EntityManagerInterface $em
     * @param string $guid
     * @return RedirectResponse
     */
    public function delete(EntityManagerInterface $em, string $guid): RedirectResponse
    {
        $package = $em->getRepository(Package::class)->findOneBy(["guid" => $guid]);

        if ($package) {
            $em->remove($package);
            $em->flush();
            $this->addFlash("success-flash", "The project package was deleted");
        } else {
            $this->addFlash("error-flash", "The project package was not found");
        }

        return $this->redirectToRoute("ribsadmin_packages");
    }

    /**
     * @Route("/packages/update/{guid}", name="ribsadmin_packages_update")
     * @param Version $version
     * @param string $guid
     * @return RedirectResponse
     * @throws Exception
     */
    public function updatePackage(Version $version, string $guid): RedirectResponse
    {
        if ($guid) {
            $version->save($guid);

            if ($version->getMessages()) {
                $message = "<ul>";
                $message .= "<li>The project package was not well updated</li>";
                foreach ($version->getMessages() as $version_message) {
                    $message .= "<li>".$version_message."</li>";
                }
                $message .= "</ul>";

                $this->addFlash("info-flash", $message);
            } else {
                $this->addFlash("success-flash", "The project package was updated");
            }
        } else {
            $this->addFlash("error-flash", "The project package was not found");
        }

        return $this->redirectToRoute("ribsadmin_packages");
    }

    /**
     * @Route("/packages/update-version/{guid}/{install_version}", name="ribsadmin_packages_update_version")
     * @param Version $version
     * @param string $guid
     * @param string $install_version
     * @return RedirectResponse|Response
     * @throws ClientExceptionInterface
     * @throws RedirectionExceptionInterface
     * @throws ServerExceptionInterface
     * @throws TransportExceptionInterface
     */
    public function changePackageVersion(Version $version, string $guid, string $install_version)
    {
        $response = $version->updatePackage($guid, $install_version);

        if ($response) {
            $response = str_replace("\n", "<br>", $response);
            return $this->render("@RibsAdmin/packages/show-update-version.html.twig", ["logs" => $response]);
        }

        return $this->redirectToRoute("ribsadmin_packages_update", ["guid" => $guid]);
    }
}
