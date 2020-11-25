<?php

namespace PiouPiou\RibsAdminBundle\Service;

use Doctrine\ORM\EntityManagerInterface;

class Version
{
    /**
     * @var EntityManagerInterface
     */
    private $em;

    /**
     * Version constructor.
     * @param EntityManagerInterface $em
     */
    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    /**
     * @return mixed|null
     */
    private function getComposerLockJson()
    {
        $composer_lock = file_get_contents('../composer.lock');

        if ($composer_lock) {
            return json_decode($composer_lock, true);
        }

        return null;
    }

    /**
     * @param $package_name
     * @return mixed|null
     */
    private function getPackage($package_name)
    {
        $composer_lock = $this->getComposerLockJson();
        if ($composer_lock) {
            $packages = $composer_lock["packages"];
            $key = array_search($package_name, array_column($packages, 'name'));

            if ($key) {
                return $packages[$key];
            }
        }

        return null;
    }

    /**
     * @param $package_name
     * @return mixed|null
     */
    public function getVersion($package_name)
    {
        return $this->getPackage($package_name) ? $this->getPackage($package_name)["version"] : null;
    }

    /**
     * @param $package_name
     * @return mixed|null
     */
    public function getVersionDate($package_name)
    {
        return $this->getPackage($package_name) ? explode("T", $this->getPackage($package_name)["time"])[0] : null;
    }

    /**
     * @param $package_name
     */
    public function save($package_name)
    {
        $version = $this->em->getRepository(\PiouPiou\RibsAdminBundle\Entity\Version::class)->findOneBy(["package_name" => $package_name]);

        if (!$version) {
            $version = new \PiouPiou\RibsAdminBundle\Entity\Version();
            $version->setProjectName($package_name);
            $version->setPackageName($package_name);
            $version->setProjectUrl($package_name);
            $version->setCheckVersionUrl($package_name);
        }

        $version->setVersion($this->getVersion($package_name));
        $version->setVersionDate($this->getVersionDate($package_name));
        $version->setLastCheck(new \DateTime());

        $this->em->persist($version);
        $this->em->flush();
    }
}
