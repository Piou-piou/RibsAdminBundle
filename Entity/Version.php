<?php

namespace PiouPiou\RibsAdminBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Version
 *
 * @ORM\Table(name="version", uniqueConstraints={@ORM\UniqueConstraint(name="guid_UNIQUE_version", columns={"guid"})})
 * @ORM\Entity
 * @ORM\EntityListeners({"PiouPiou\RibsAdminBundle\EventListener\GuidAwareListener", "PiouPiou\RibsAdminBundle\EventListener\CreateUpdateAwareListener"})
 */
class Version
{
    use GuidTrait;
    use CreatedUpdatedTrait;

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false, options={"unsigned"=true})
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="version_number", type="string", length=255, nullable=false)
     */
    private $version_number;

    /**
     * @var string
     *
     * @ORM\Column(name="package_config", type="string", length=255, nullable=false)
     */
    private $package_config;

    /**
     * @var string
     *
     * @ORM\Column(name="package_config_file", type="string", length=255, nullable=false)
     */
    private $package_config_file;

    /**
     * @var string
     *
     * @ORM\Column(name="package_route_file", type="string", length=255, nullable=false)
     */
    private $package_route_file;

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     * @return Version
     */
    public function setId(int $id): self
    {
        $this->id = $id;

        return $this;
    }

    /**
     * @return string
     */
    public function getVersionNumber(): string
    {
        return $this->version_number;
    }

    /**
     * @param string $version_number
     * @return Version
     */
    public function setVersionNumber(string $version_number): self
    {
        $this->version_number = $version_number;

        return $this;
    }

    /**
     * @return string
     */
    public function getPackageConfig(): string
    {
        return $this->package_config;
    }

    /**
     * @param string $package_config
     * @return Version
     */
    public function setPackageConfig(string $package_config): self
    {
        $this->package_config = $package_config;

        return $this;
    }

    /**
     * @return string
     */
    public function getPackageConfigFile(): string
    {
        return $this->package_config_file;
    }

    /**
     * @param string $package_config_file
     * @return Version
     */
    public function setPackageConfigFile(string $package_config_file): self
    {
        $this->package_config_file = $package_config_file;

        return $this;
    }

    /**
     * @return string
     */
    public function getPackageRouteFile(): string
    {
        return $this->package_route_file;
    }

    /**
     * @param string $package_route_file
     * @return Version
     */
    public function setPackageRouteFile(string $package_route_file): self
    {
        $this->package_route_file = $package_route_file;

        return $this;
    }
}

