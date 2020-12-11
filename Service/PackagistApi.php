<?php

namespace PiouPiou\RibsAdminBundle\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;

class PackagistApi
{
    /**
     * @var HttpClientInterface
     */
    private $client;

    /**
     * PackagistApi constructor.
     * @param HttpClientInterface $client
     */
    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;
    }

    /**
     * @param string $package_name
     * @return false|mixed
     */
    public function getPackageInformation(string $package_name)
    {
        if ($this->package_info) {
            return $this->package_info;
        }

        if (!strpos($package_name, "/")) {
            return false;
        }

        $packgist_url = "https://repo.packagist.org/p/".$package_name.".json";
        $response = $this->client->request("GET", $packgist_url);

        if ($response->getStatusCode() == 200) {
            $content = json_decode($response->getContent(), true);
            if (is_array($content) && $content["packages"] && $content["packages"][$this->package->getPackageName()]) {
                $this->package_info = $content["packages"][$this->package->getPackageName()];
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
        if (!strpos($package_name, "/")) {
            return false;
        }

        $packgist_url = "https://repo.packagist.org/p/".$package_name.".json";

        $response = $this->client->request("GET", $packgist_url);

        if ($response->getStatusCode() == 200) {
            $content = json_decode($response->getContent(), true);
            if (is_array($content) && $content["packages"] && $content["packages"][$this->package->getPackageName()]) {
                return array_key_first($content["packages"][$this->package->getPackageName()]);
            }
        }
    }
}
