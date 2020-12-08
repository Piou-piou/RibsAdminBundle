<?php

namespace PiouPiou\RibsAdminBundle\Service;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface;
use Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Exception;

class Version
{
    /**
     * @var EntityManagerInterface
     */
    private $em;

    /**
     * @var HttpClientInterface
     */
    private $client;

    /**
     * Version constructor.
     * @param EntityManagerInterface $em
     * @param HttpClientInterface $client
     */
    public function __construct(EntityManagerInterface $em, HttpClientInterface $client)
    {
        $this->em = $em;
        $this->client = $client;
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
     * @throws Exception
     */
    public function getVersionDate($package_name)
    {
        $string_date = $this->getPackage($package_name) ? explode("T", $this->getPackage($package_name)["time"])[0] : null;
        $version_date = null;

        if ($string_date) {
            $version_date = new \DateTime($string_date);
        }

        return $version_date;
    }

    /**
     * @param $package_name
     * @return false|int|string|null
     * @throws ClientExceptionInterface
     * @throws RedirectionExceptionInterface
     * @throws ServerExceptionInterface
     * @throws TransportExceptionInterface
     */
    public function getLastPackagistVersion($package_name)
    {
        if (!strpos($package_name, "/")) {
            return false;
        }

        $packgist_url = "https://repo.packagist.org/p/".$package_name.".json";

        $response = $this->client->request("GET", $packgist_url);

        if ($response->getStatusCode() == 200) {
            $content = json_decode($response->getContent(), true);
            if (is_array($content) && $content["packages"] && $content["packages"][$package_name]) {
                return array_key_first($content["packages"][$package_name]);
            }
        }
    }

    /**
     * @param $package_name
     * @throws Exception
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
        $version->setLastPackagistVersion($this->getLastPackagistVersion($package_name));
        $version->setLastCheck(new \DateTime());

        $this->em->persist($version);
        $this->em->flush();
    }
}
