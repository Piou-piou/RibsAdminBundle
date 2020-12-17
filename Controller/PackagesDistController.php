<?php

namespace PiouPiou\RibsAdminBundle\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Exception;
use PiouPiou\RibsAdminBundle\Entity\Package;
use PiouPiou\RibsAdminBundle\Service\Version;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Console\Application;
use Symfony\Component\Console\Output\BufferedOutput;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Routing\Annotation\Route;

class PackagesDistController extends AbstractController
{
    /**
     * @Route("/packages/dist/send-package/{package_name}", name="ribsadmin_packages_dist_send", requirements={"package_name"=".+"})
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
     * @Route("/packages/dist/send-composer-lock/", name="ribsadmin_packages_dist_send_composer_lock")
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
     * @Route("/packages/dist/send-token/", name="ribsadmin_packages_dist_send_token")
     * @param ParameterBagInterface $parameter
     * @return JsonResponse
     */
    public function sendToken(ParameterBagInterface $parameter): JsonResponse
    {
        return new JsonResponse([
            "token" => $parameter->get("ribs_admin.packages_token")
        ]);
    }

    /**
     * @Route("/packages/dist/change-version/{package_name}", name="ribsadmin_packages_dist_change_version", requirements={"package_name"=".+"})
     * @param KernelInterface $kernel
     * @param string $package_name
     * @return JsonResponse
     * @throws Exception
     */
    public function changePackageVersion(KernelInterface $kernel, string $package_name): JsonResponse
    {
        $application = new Application($kernel);
        $application->setAutoExit(false);

        $input = new ArrayInput([
            'command' => 'ribsadmin:change-package-version',
            'package-name' => $package_name,
        ]);

        $output = new BufferedOutput();
        $application->run($input, $output);
        $content = $output->fetch();

        return new JsonResponse($content);
    }
}
