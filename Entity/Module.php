<?php

namespace PiouPiou\RibsAdminBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * Module
 *
 * @ORM\Table(name="module", uniqueConstraints={@ORM\UniqueConstraint(name="guid_UNIQUE_module", columns={"guid"})})
 * @ORM\Entity
 * @ORM\EntityListeners({"PiouPiou\RibsAdminBundle\EventListener\GuidAwareListener", "PiouPiou\RibsAdminBundle\EventListener\CreateUpdateAwareListener"})
 */
class Module
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
     * @ORM\Column(name="package_name", type="string", length=255, nullable=false)
     */
    private $packageName;

    /**
     * @var string
     *
     * @ORM\Column(name="title_tag", type="string", length=70, nullable=true)
     */
    private $titleTag;

    /**
     * @var string
     *
     * @ORM\Column(name="description_tag", type="string", length=160, nullable=true)
     */
    private $descriptionTag;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255, nullable=false)
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="template", type="string", length=255, nullable=true)
     */
    private $template;

    /**
     * @var string
     *
     * @ORM\Column(name="url", type="string", length=255, nullable=true)
     */
    private $url;

    /**
     * @var string
     *
     * @ORM\Column(name="url_admin", type="string", length=255, nullable=true)
     */
    private $urlAdmin;

    /**
     * @var boolean
     *
     * @ORM\Column(name="active", type="boolean", nullable=false)
     */
    private $active;

    /**
     * @var integer
     *
     * @ORM\Column(name="`order`", type="integer", nullable=true)
     */
    private $order;

    /**
     * @var boolean
     *
     * @ORM\Column(name="displayed", type="boolean", nullable=false)
     */
    private $displayed;

    /**
     * @var boolean
     *
     * @ORM\Column(name="dev_mode", type="boolean", nullable=false)
     */
    private $devMode = false;

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     */
    public function setId(int $id)
    {
        $this->id = $id;
    }

    /**
     * @return string
     */
    public function getPackageName(): ?string
    {
        return $this->packageName;
    }

    /**
     * @param string $package_name
     */
    public function setPackageName(string $package_name)
    {
        $this->packageName = $package_name;
    }

    /**
     * @return string
     */
    public function getTitleTag(): ?string
    {
        return $this->titleTag;
    }

    /**
     * @param string $titleTag
     */
    public function setTitleTag(string $titleTag)
    {
        $this->titleTag = $titleTag;
    }

    /**
     * @return string
     */
    public function getDescriptionTag(): ?string
    {
        return $this->descriptionTag;
    }

    /**
     * @param string $descriptionTag
     */
    public function setDescriptionTag(string $descriptionTag)
    {
        $this->descriptionTag = $descriptionTag;
    }

    /**
     * @return string
     */
    public function getTitle(): ?string
    {
        return $this->title;
    }

    /**
     * @param string $title
     */
    public function setTitle(string $title)
    {
        $this->title = $title;
    }

    /**
     * @return string
     */
    public function getTemplate(): ?string
    {
        return $this->template;
    }

    /**
     * @param string $template
     */
    public function setTemplate(string $template)
    {
        $this->template = $template;
    }

    /**
     * @return string
     */
    public function getUrl(): ?string
    {
        return $this->url;
    }

    /**
     * @param string $url
     */
    public function setUrl(string $url)
    {
        $this->url = $url;
    }

    /**
     * @return string
     */
    public function getUrlAdmin(): ?string
    {
        return $this->urlAdmin;
    }

    /**
     * @param string $urlAdmin
     */
    public function setUrlAdmin(string $urlAdmin)
    {
        $this->urlAdmin = $urlAdmin;
    }

    /**
     * @return boolean
     */
    public function getActive(): ?bool
    {
        return $this->active;
    }

    /**
     * @param bool $active
     */
    public function setActive(bool $active)
    {
        $this->active = $active;
    }

    /**
     * @return int
     */
    public function getOrder(): ?int
    {
        return $this->order;
    }

    /**
     * @param int $order
     */
    public function setOrder(int $order)
    {
        $this->order = $order;
    }

    /**
     * @return bool
     */
    public function getDisplayed(): ?bool
    {
        return $this->displayed;
    }

    /**
     * @param bool $displayed
     */
    public function setDisplayed(bool $displayed)
    {
        $this->displayed = $displayed;
    }

    /**
     * @return bool
     */
    public function getDevMode(): bool
    {
        return $this->devMode;
    }

    /**
     * @param bool $devMode
     * @return Module
     */
    public function setDevMode(bool $devMode): Module
    {
        $this->devMode = $devMode;

        return $this;
    }

    public function getFormattedActive()
    {
        return $this->getActive() ? "Oui" : "Non";
    }

    public function getFormattedDisplayed()
    {
        return $this->getDisplayed() ? "Oui" : "Non";
    }
}
