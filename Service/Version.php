<?php

namespace PiouPiou\RibsAdminBundle\Service;

use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use PiouPiou\RibsAdminBundle\Entity\Package;
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
     * @var Package
     */
    private $package;

    private $messages = [];

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
     * @return array
     */
    public function getMessages(): array
    {
        return $this->messages;
    }

    /**
     * @param Package $package
     */
    public function setPackageEntity(Package $package) {
        $this->package = $package;
    }

    /**
     * @return mixed|null
     * @throws ClientExceptionInterface
     * @throws RedirectionExceptionInterface
     * @throws ServerExceptionInterface
     * @throws TransportExceptionInterface
     */
    private function getComposerLockJson()
    {
        if ($this->package && !$this->package->isIsLocal()) {
            $response = $this->client->request("GET", $this->package->getProjectUrl().$this->package->getComposerLockUrl());
            $composer_lock = $response->getStatusCode() == 200 ? $response->getContent() : null;
        } else {
            $composer_lock = file_get_contents('../composer.lock');
        }

        if ($composer_lock) {
            return json_decode($composer_lock, true);
        }

        return null;
    }

    /**
     * @return mixed|null
     * @throws ClientExceptionInterface
     * @throws RedirectionExceptionInterface
     * @throws ServerExceptionInterface
     * @throws TransportExceptionInterface
     */
    public function getPackage()
    {
        $composer_lock = $this->getComposerLockJson();
        if ($composer_lock) {
            $packages = $composer_lock["packages"];
            $key = array_search($this->package->getPackageName(), array_column($packages, 'name'));

            if ($key) {
                return $packages[$key];
            }
        }

        $this->messages["composer_lock"] = "Composer lock not found at " . $this->package->getProjectUrl();

        return null;
    }

    /**
     * @return mixed|null
     */
    public function getVersion()
    {
        return $this->getPackage($this->package->getPackageName()) ? $this->getPackage($this->package->getPackageName())["version"] : null;
    }

    /**
     * @return DateTime|null
     * @throws Exception
     */
    public function getVersionDate(): ?DateTime
    {
        $string_date = $this->getPackage($this->package->getPackageName()) ? explode("T", $this->getPackage($this->package->getPackageName())["time"])[0] : null;
        $version_date = null;

        if ($string_date) {
            $version_date = new DateTime($string_date);
        }

        return $version_date;
    }

    /**
     * @return false|int|string|null
     * @throws ClientExceptionInterface
     * @throws RedirectionExceptionInterface
     * @throws ServerExceptionInterface
     * @throws TransportExceptionInterface
     */
    public function getLastPackagistVersion()
    {
        if (!strpos($this->package->getPackageName(), "/")) {
            return false;
        }

        $packgist_url = "https://repo.packagist.org/p/".$this->package->getPackageName().".json";

        $response = $this->client->request("GET", $packgist_url);

        if ($response->getStatusCode() == 200) {
            $content = json_decode($response->getContent(), true);
            if (is_array($content) && $content["packages"] && $content["packages"][$this->package->getPackageName()]) {
                return array_key_first($content["packages"][$this->package->getPackageName()]);
            }
        }
    }

    /**
     * @param $package_guid
     * @throws Exception
     */
    public function save($package_guid)
    {
        $package = $this->em->getRepository(Package::class)->findOneBy(["guid" => $package_guid]);

        if ($package) {
            $this->setPackageEntity($package);

            $package->setVersion($this->getVersion());
            $package->setVersionDate($this->getVersionDate());
            $package->setLastPackagistVersion($this->getLastPackagistVersion());
            $package->setLastCheck(new DateTime());

            $this->em->persist($package);
            $this->em->flush();
        }
    }
}
