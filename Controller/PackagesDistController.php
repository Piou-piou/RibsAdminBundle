<?php

namespace PiouPiou\RibsAdminBundle\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Exception;
use PiouPiou\RibsAdminBundle\Entity\Package;
use PiouPiou\RibsAdminBundle\Service\Version;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class PackagesDistController extends AbstractController
{
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
            "package" => $version->getPackage(),
            "package_date" => $version->getVersionDate()
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

    /**
     * @Route("/packages/send-token/", name="ribsadmin_packages_send_token")
     * @param ParameterBagInterface $parameter
     * @return JsonResponse
     */
    public function sendToken(ParameterBagInterface $parameter): JsonResponse
    {
        return new JsonResponse([
            "token" => $parameter->get("ribs_admin.packages_token")
        ]);
    }
}
