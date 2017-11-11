<?php

namespace Ribs\RibsAdminBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * Page
 *
 * @ORM\Table(name="page", uniqueConstraints={@ORM\UniqueConstraint(name="guid_UNIQUE", columns={"guid"})}, indexes={@ORM\Index(name="fk_page_page1_idx", columns={"parent"})})
 * @ORM\Entity
 * @ORM\EntityListeners({"Ribs\RibsAdminBundle\EventListener\GuidAwareListener"})
 */
class Page
{
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
     * @ORM\Column(name="guid", type="string", length=255, nullable=false)
     */
    private $guid;

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
     * @ORM\Column(name="content", type="text", nullable=true)
     */
    private $content;

    /**
     * @var integer
     *
     * @ORM\Column(name="active", type="integer", nullable=false)
     */
    private $active;

    /**
     * @var integer
     *
     * @ORM\Column(name="order", type="integer", nullable=false)
     */
    private $order;

    /**
     * @var integer
     *
     * @ORM\Column(name="displayed", type="integer", nullable=false)
     */
    private $displayed;

    /**
     * @var \Page
     *
     * @ORM\ManyToOne(targetEntity="Page")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="parent", referencedColumnName="id")
     * })
     */
    private $parent;
	
	/**
	 * @var \DateTime
	 *
	 * @Gedmo\Timestampable(on="create")
	 * @ORM\Column(name="creation_date", type="date", nullable=true)
	 */
	private $creationDate;
	
	/**
	 * @var \DateTime
	 *
	 * @Gedmo\Timestampable(on="update")
	 * @ORM\Column(name="update_date", type="date", nullable=true)
	 */
	private $updateDate;

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param int $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return string
     */
    public function getGuid()
    {
        return $this->guid;
    }

    /**
     * @param string $guid
     */
    public function setGuid($guid)
    {
        $this->guid = $guid;
    }

    /**
     * @return string
     */
    public function getTitleTag()
    {
        return $this->titleTag;
    }

    /**
     * @param string $titleTag
     */
    public function setTitleTag($titleTag)
    {
        $this->titleTag = $titleTag;
    }

    /**
     * @return string
     */
    public function getDescriptionTag()
    {
        return $this->descriptionTag;
    }

    /**
     * @param string $descriptionTag
     */
    public function setDescriptionTag($descriptionTag)
    {
        $this->descriptionTag = $descriptionTag;
    }

    /**
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param string $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }

    /**
     * @return string
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * @param string $content
     */
    public function setContent($content)
    {
        $this->content = $content;
    }

    /**
     * @return int
     */
    public function getActive()
    {
        return $this->active;
    }

    /**
     * @param int $active
     */
    public function setActive($active)
    {
        $this->active = $active;
    }

    /**
     * @return int
     */
    public function getOrder()
    {
        return $this->order;
    }

    /**
     * @param int $order
     */
    public function setOrder($order)
    {
        $this->order = $order;
    }

    /**
     * @return int
     */
    public function getDisplayed()
    {
        return $this->displayed;
    }

    /**
     * @param int $displayed
     */
    public function setDisplayed($displayed)
    {
        $this->displayed = $displayed;
    }

    /**
     * @return \Page
     */
    public function getParent()
    {
        return $this->parent;
    }

    /**
     * @param \Page $parent
     */
    public function setParent($parent)
    {
        $this->parent = $parent;
    }
	
	/**
	 * @return \DateTime
	 */
	public function getCreationDate(): \DateTime
	{
		return $this->creationDate;
	}
	
	/**
	 * @param \DateTime $creationDate
	 */
	public function setCreationDate(\DateTime $creationDate)
	{
		$this->creationDate = $creationDate;
	}
	
	/**
	 * @return \DateTime
	 */
	public function getUpdateDate(): \DateTime
	{
		return $this->updateDate;
	}
	
	/**
	 * @param \DateTime $updateDate
	 */
	public function setUpdateDate(\DateTime $updateDate)
	{
		$this->updateDate = $updateDate;
	}
}

