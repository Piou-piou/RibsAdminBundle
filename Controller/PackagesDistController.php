<?php

namespace PiouPiou\RibsAdminBundle\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Exception;
use PiouPiou\RibsAdminBundle\Entity\Package;
use PiouPiou\RibsAdminBundle\Service\Version;
use SensioLabs\AnsiConverter\AnsiToHtmlConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Output\BufferedOutput;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
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
     * @param $file
     * @param $folder
     * @return bool
     */
    private function uploadConfigFile($file, $folder)
    {
        $success = true;
        if ($file) {
            try {
                $file->move('../config/'.$folder, $file->getClientOriginalName());
            } catch (FileException $exception) {
                $success = false;
            }
        }
        return $success;
    }

    /**
     * @Route("/packages/dist/change-version/", name="ribsadmin_packages_dist_change_version", requirements={"package_name"=".+"}, methods={"POST"})
     * @param KernelInterface $kernel
     * @param Request $request
     * @return JsonResponse
     * @throws Exception
     */
    public function changePackageVersion(KernelInterface $kernel, Request $request): JsonResponse
    {
        $application = new Application($kernel);
        $application->setAutoExit(false);

        $package_name = $request->get("package_name");
        $version = $request->get("version");

        if (!$this->uploadConfigFile($request->files->get('package_routes'), "routes")) {
            return new JsonResponse([
                "error_message" => "Routes file move is impossible"
            ]);
        }

        if (!$this->uploadConfigFile($request->files->get('package_config'), "packages")) {
            return new JsonResponse([
                "error_message" => "Package file move is impossible"
            ]);
        }

        $input = new ArrayInput([
            'command' => 'ribsadmin:change-package-version',
            'package-name' => $package_name.":".$version,
        ]);

        $output = new BufferedOutput(OutputInterface::VERBOSITY_NORMAL, true);
        $application->run($input, $output);

        $converter = new AnsiToHtmlConverter();
        $content = $output->fetch();

        return new JsonResponse($converter->convert($content));
    }
}
