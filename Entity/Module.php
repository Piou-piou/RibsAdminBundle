<?php

namespace PiouPiou\RibsAdminBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * Module
 *
 * @ORM\Table(name="module")
 * @ORM\Entity
 */
class Module
{
	/**
	 * @var integer
	 *
	 * @ORM\Column(name="id", type="integer", nullable=false)
	 * @ORM\Id
	 * @ORM\GeneratedValue(strategy="IDENTITY")
	 */
	private $id;
	
	/**
	 * @var string
	 *
	 * @ORM\Column(name="name", type="string", length=255, nullable=false)
	 */
	private $name;
	
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
	 * @ORM\Column(name="template", type="string", length=255, nullable=false)
	 */
	private $template;
	
	/**
	 * @var string
	 *
	 * @ORM\Column(name="url", type="string", length=255, nullable=false)
	 */
	private $url;
	
	/**
	 * @var string
	 *
	 * @ORM\Column(name="url_admin", type="string", length=255, nullable=false)
	 */
	private $urlAdmin;
	
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
	public function getName(): string
	{
		return $this->name;
	}
	
	/**
	 * @param string $name
	 */
	public function setName(string $name)
	{
		$this->name = $name;
	}
	
	/**
	 * @return string
	 */
	public function getTitleTag(): string
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
	public function getDescriptionTag(): string
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
	public function getTitle(): string
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
	public function getTemplate(): string
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
	public function getUrl(): string
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
	public function getUrlAdmin(): string {
		return $this->urlAdmin;
	}
	
	/**
	 * @param string $urlAdmin
	 */
	public function setUrlAdmin(string $urlAdmin) {
		$this->urlAdmin = $urlAdmin;
	}
	
	/**
	 * @return int
	 */
	public function getActive(): int
	{
		return $this->active;
	}
	
	/**
	 * @param int $active
	 */
	public function setActive(int $active)
	{
		$this->active = $active;
	}
	
	/**
	 * @return int
	 */
	public function getOrder(): int
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
	 * @return int
	 */
	public function getDisplayed(): int
	{
		return $this->displayed;
	}
	
	/**
	 * @param int $displayed
	 */
	public function setDisplayed(int $displayed)
	{
		$this->displayed = $displayed;
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