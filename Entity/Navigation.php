<?php

namespace PiouPiou\RibsAdminBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Navigation
 *
 * @ORM\Table(name="navigation", indexes={@ORM\Index(name="fk_navigation_page1_idx", columns={"id_page"}),
 *     @ORM\Index(name="fk_navigation_module1_idx", columns={"id_module"})})
 * @ORM\Entity(repositoryClass="PiouPiou\RibsAdminBundle\Repository\NavigationRepository")
 */
class Navigation
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
	 * @var boolean
	 *
	 * @ORM\Column(name="order", type="boolean", nullable=false)
	 */
	private $order;
	
	/**
	 * @var \Module
	 *
	 * @ORM\ManyToOne(targetEntity="Module")
	 * @ORM\JoinColumns({
	 *   @ORM\JoinColumn(name="id_module", referencedColumnName="id", nullable=true)
	 * })
	 */
	private $module;
	
	/**
	 * @var \Page
	 *
	 * @ORM\ManyToOne(targetEntity="Page")
	 * @ORM\JoinColumns({
	 *   @ORM\JoinColumn(name="id_page", referencedColumnName="id", nullable=true)
	 * })
	 */
	private $page;
	
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
	 * @return bool
	 */
	public function isOrder(): bool
	{
		return $this->order;
	}
	
	/**
	 * @param bool $order
	 */
	public function setOrder(bool $order)
	{
		$this->order = $order;
	}
	
	/**
	 * @return \Module
	 */
	public function getModule(): \Module
	{
		return $this->module;
	}
	
	/**
	 * @param \Module $module
	 */
	public function setModule(\Module $module)
	{
		$this->module = $module;
	}
	
	/**
	 * @return \Page
	 */
	public function getPage(): \Page
	{
		return $this->page;
	}
	
	/**
	 * @param \Page $page
	 */
	public function setPage(\Page $page)
	{
		$this->page = $page;
	}
	
}

