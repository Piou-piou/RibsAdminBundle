<?php

namespace PiouPiou\RibsAdminBundle\Entity;

use DateTime;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * Version
 *
 * @ORM\Table(name="verion", uniqueConstraints={@ORM\UniqueConstraint(name="guid_UNIQUE_version", columns={"guid"})})
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
     * @ORM\Column(name="project_name", type="string", length=255, nullable=false)
     */
    private $project_name;

    /**
     * @var string
     *
     * @ORM\Column(name="package_name", type="string", length=255, nullable=false)
     */
    private $package_name;

    /**
     * @var string
     *
     * @ORM\Column(name="project_url", type="string", length=255, nullable=false)
     */
    private $project_url;

    /**
     * @var string
     *
     * @ORM\Column(name="version", type="string", length=255, nullable=true)
     */
    private $version;

    /**
     * @var string
     *
     * @ORM\Column(name="last_packagist_version", type="string", length=255, nullable=true)
     */
    private $last_packagist_version;

    /**
     * @var DateTime
     *
     * @ORM\Column(name="version_date", type="date", nullable=true)
     */
    private $version_date;

    /**
     * @var DateTime
     *
     * @ORM\Column(name="last_check", type="datetime", nullable=true)
     */
    private $last_check;

    /**
     * @var string
     *
     * @ORM\Column(name="mode", type="string", length=255, nullable=true)
     */
    private $mode;
	
	/**
	 * @var string
	 *
	 * @ORM\Column(name="check_version_url", type="string", length=255, nullable=false)
	 */
    private $check_version_url;

    /**
     * @var string
     *
     * @ORM\Column(name="composer_lock_url", type="string", length=255, nullable=false)
     */
    private $composer_lock_url;

    /**
     * @var boolean
     *
     * @ORM\Column(name="is_local", type="boolean", nullable=false, options={"default": false}))
     */
    private $is_local;

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
    public function getProjectName(): ?string
    {
        return $this->project_name;
    }

    /**
     * @param string $project_name
     * @return Version
     */
    public function setProjectName(string $project_name): self
    {
        $this->project_name = $project_name;

        return $this;
    }

    /**
     * @return string
     */
    public function getPackageName(): ?string
    {
        return $this->package_name;
    }

    /**
     * @param string $package_name
     * @return Version
     */
    public function setPackageName(string $package_name): self
    {
        $this->package_name = $package_name;

        return $this;
    }

    /**
     * @return string
     */
    public function getProjectUrl(): ?string
    {
        return $this->project_url;
    }

    /**
     * @param string $project_url
     * @return Version
     */
    public function setProjectUrl(string $project_url): self
    {
        $this->project_url = $project_url;

        return $this;
    }

    /**
     * @return string
     */
    public function getVersion(): ?string
    {
        return $this->version;
    }

    /**
     * @param string $version
     * @return Version
     */
    public function setVersion(?string $version): self
    {
        $this->version = $version;

        return $this;
    }

    /**
     * @return string
     */
    public function getLastPackagistVersion(): ?string
    {
        return $this->last_packagist_version;
    }

    /**
     * @param string $last_packagist_version
     * @return Version
     */
    public function setLastPackagistVersion(?string $last_packagist_version): self
    {
        $this->last_packagist_version = $last_packagist_version;

        return $this;
    }

    /**
     * @return DateTime
     */
    public function getVersionDate(): ?DateTime
    {
        return $this->version_date;
    }

    /**
     * @param DateTime $version_date
     * @return Version
     */
    public function setVersionDate(?DateTime $version_date): self
    {
        $this->version_date = $version_date;

        return $this;
    }

    /**
     * @return DateTime
     */
    public function getLastCheck(): ?DateTime
    {
        return $this->last_check;
    }

    /**
     * @param DateTime $last_check
     * @return Version
     */
    public function setLastCheck(DateTime $last_check): self
    {
        $this->last_check = $last_check;

        return $this;
    }

    /**
     * @return string
     */
    public function getMode(): ?string
    {
        return $this->mode;
    }

    /**
     * @param string $mode
     * @return Version
     */
    public function setMode(string $mode): self
    {
        $this->mode = $mode;

        return $this;
    }

    /**
     * @return string
     */
    public function getCheckVersionUrl(): ?string
    {
        return $this->check_version_url;
    }

    /**
     * @param string $check_version_url
     * @return Version
     */
    public function setCheckVersionUrl(string $check_version_url): self
    {
        $this->check_version_url = $check_version_url;

        return $this;
    }

    /**
     * @return string
     */
    public function getComposerLockUrl(): ?string
    {
        return $this->composer_lock_url;
    }

    /**
     * @param string $composer_lock_url
     * @return Version
     */
    public function setComposerLockUrl(string $composer_lock_url): self
    {
        $this->composer_lock_url = $composer_lock_url;

        return $this;
    }

    /**
     * @return bool
     */
    public function isIsLocal(): bool
    {
        return $this->is_local;
    }

    /**
     * @param bool $is_local
     * @return Version
     */
    public function setIsLocal(bool $is_local): self
    {
        $this->is_local = $is_local;

        return $this;
    }

    public function getFormattedIsLocal()
    {
        return $this->isIsLocal() ? "Yes" : "No";
    }
}

