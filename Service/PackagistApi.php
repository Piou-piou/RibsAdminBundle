<?php

namespace PiouPiou\RibsAdminBundle\Service;

use Exception;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class PackagistApi
{
    /**
     * @var HttpClientInterface
     */
    private $client;

    /**
     * @var string
     */
    private $package_name = null;

    /**
     * @var array
     */
    private $package_info = [];

    /**
     * PackagistApi constructor.
     * @param HttpClientInterface $client
     */
    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;
    }

    /**
     * @return false|mixed
     */
    private function getPackageInformation()
    {
        if ($this->package_info) {
            return $this->package_info;
        }

        if (!$this->package_name || !strpos($this->package_name, "/")) {
            return false;
        }

        $packgist_url = "https://repo.packagist.org/p/".$this->package_name.".json";
        $response = $this->client->request("GET", $packgist_url);

        if ($response->getStatusCode() == 200) {
            $content = json_decode($response->getContent(), true);
            if (is_array($content) && $content["packages"] && $content["packages"][$this->package_name]) {
                $this->package_info = $content["packages"][$this->package_name];
                return $this->package_info;
            }
        }

        return false;
    }

    /**
     * @param string $package_name
     * @return false|int|string|null
     */
    public function getLastPackagistVersion(string $package_name)
    {
        $this->package_name = $package_name;
        if ($package = $this->getPackageInformation()) {
            return array_key_first($package);
        }

        return false;
    }

    public function getAllPackagistVersions(string $package_name)
    {
        $this->package_name = $package_name;
        if ($package = $this->getPackageInformation()) {
            return array_keys($package);
        }
    }
}
