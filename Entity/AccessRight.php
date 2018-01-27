<?php

namespace PiouPiou\RibsAdminBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;


/**
 * AccessRight
 *
 * @ORM\Table(name="access_right", uniqueConstraints={@ORM\UniqueConstraint(name="guid_UNIQUE", columns={"guid"})})
 * @ORM\Entity(repositoryClass="PiouPiou\RibsAdminBundle\Repository\AccessRightRepository")
 * @ORM\EntityListeners({"PiouPiou\RibsAdminBundle\EventListener\GuidAwareListener"})
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
	 * @var ArrayCollection
	 *
	 * @ORM\OneToMany(targetEntity="PiouPiou\RibsAdminBundle\Entity\User", mappedBy="accessRightList")
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
	public function getId()
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
	public function getGuid()
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
	public function getName()
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
	public function getAccessRights()
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
	public function getCreationDate()
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
	public function getUpdateDate()
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
	public function removeUser(User $user)
	{
		$this->users->removeElement($user);
	}
}