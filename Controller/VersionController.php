<?php

namespace PiouPiou\RibsAdminBundle\Controller;

use Doctrine\ORM\EntityManagerInterface;
use PiouPiou\RibsAdminBundle\Entity\Version;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class VersionController extends AbstractController
{
    /**
     * @Route("/versions/edit/{guid_package}/{version}", name="ribsadmin_packages_update_version")
     * @param EntityManagerInterface $em
     * @param string $guid_package
     * @param string $version
     * @return Response
     */
    public function edit(EntityManagerInterface $em, string $guid_package, string $version): Response
    {
        $version = $em->getRepository(Version::class)->findOneBy(["guid" => $guid_package]);

        if (!$version) {
            $version = new Version();
            $version->setVersionNumber($version);
            $em->persist($version);
            $em->flush();
        }


    }
}