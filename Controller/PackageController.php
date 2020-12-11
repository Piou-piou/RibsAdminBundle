<?php

namespace PiouPiou\RibsAdminBundle\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Exception;
use PiouPiou\RibsAdminBundle\Entity\Package;
use PiouPiou\RibsAdminBundle\Service\Version;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Constraints\Date;

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
     * @param string|null $guid
     * @return Response
     */
    public function edit(Request $request, EntityManagerInterface $em, string $guid = null): Response
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
            "form" => $form->createView(),
            "form_errors" => $form->getErrors(),
            "package" => $package
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
     * @param EntityManagerInterface $em
     * @param Version $version
     * @param string $guid
     * @return RedirectResponse
     * @throws Exception
     */
    public function updatePackage(EntityManagerInterface $em, Version $version, string $guid): RedirectResponse
    {
        $package = $em->getRepository(Package::class)->findOneBy(["guid" => $guid]);

        if ($package) {
            $version->setPackageEntity($package);
            $version->save($package->getPackageName());

            if ($version->getMessages()) {
                $message = "<ul>";
                $message .= "<li>The project package was not well updated</li>";
                foreach ($version->getMessages() as $version_message) {
                    $message .= "<li>".$version_message."</li>";
                }
                $message .= "</ul>";

                $this->addFlash("info-flash", $message);
            }

            $this->addFlash("success-flash", "The project package was updated");
        } else {
            $this->addFlash("error-flash", "The project package was not found");
        }

        return $this->redirectToRoute("ribsadmin_packages");
    }

    /**
     * @Route("/packages/send-package/{package_name}", name="ribsadmin_packages_send", requirements={"package_name"=".+"})
     * @param EntityManagerInterface $em
     * @param Version $version
     * @param string $package_name
     * @return mixed|null
     * @throws Exception
     */
    public function sendPackageInformations(EntityManagerInterface $em, Version $version, string $package_name): JsonResponse
    {
        $package = $em->getRepository(Package::class)->findOneBy(["package_name" => $package_name]);

        if ($package) {
            $version->setPackageEntity($package);
        }

        return new JsonResponse([
            "package" => $version->getPackage($package_name),
            "package_date" => $version->getVersionDate($package_name)
        ]);
    }

    /**
     * @Route("/packages/send-composer-lock/", name="ribsadmin_packages_send_composer_lock")
     * @return JsonResponse
     */
    public function sendComposerJson(): JsonResponse
    {
        $composer_lock = file_get_contents('../composer.lock');

        if ($composer_lock) {
            $composer_lock = json_decode($composer_lock);
        }

        return new JsonResponse($composer_lock);
    }
}
