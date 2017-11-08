<?php

namespace Ribs\RibsAdminBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * AccessRight
 *
 * @ORM\Table(name="access_right")
 * @ORM\Entity
 * @ORM\EntityListeners({"Ribs\RibsAdminBundle\EventListener\GuidAwareListener"})
 */
class AccessRight
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
	 * @ORM\Column(name="name", type="string", length=255, nullable=false)
	 */
	private $name;
	
	/**
	 * @var string
	 *
	 * @ORM\Column(name="access_rights", type="text", nullable=true)
	 */
	private $accessRights;
	
	/**
	 * @var \DateTime
	 *
	 * @ORM\Column(name="creation_date", type="date", nullable=true)
	 */
	private $creationDate;
	
	/**
	 * @var \DateTime
	 *
	 * @ORM\Column(name="update_date", type="date", nullable=true)
	 */
	private $updateDate;
	
	/**
	 * @var ArrayCollection
	 *
	 * @ORM\OneToMany(targetEntity="Ribs\RibsAdminBundle\Entity\User", mappedBy="accessRightList")
	 */
	private $users;
	
	/**
	 * AccessRight constructor.
	 */
	public function __construct()
	{
		$this->users = new ArrayCollection();
	}
	
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
	public function getGuid(): string
	{
		return $this->guid;
	}
	
	/**
	 * @param string $guid
	 */
	public function setGuid(string $guid)
	{
		$this->guid = $guid;
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
	public function getAccessRights(): string
	{
		return $this->accessRights;
	}
	
	/**
	 * @param string $accessRights
	 */
	public function setAccessRights(string $accessRights)
	{
		$this->accessRights = $accessRights;
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
	
	/**
	 * @return ArrayCollection
	 */
	public function getUsers()
	{
		return $this->users;
	}
	
	/**
	 * @param User $user
	 * @return $this
	 */
	public function addUser(User $user)
	{
		$this->users[] = $user;
		
		return $this;
	}
	
	/**
	 * @param User $user
	 */
	public function removeUSer(User $user)
	{
		$this->users->removeElement($user);
	}
}