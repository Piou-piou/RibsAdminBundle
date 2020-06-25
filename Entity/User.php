<?php

namespace PiouPiou\RibsAdminBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * User
 *
 * @ORM\Table(name="user", uniqueConstraints={@ORM\UniqueConstraint(name="guid_UNIQUE_user", columns={"guid"})})
 * @ORM\Entity
 * @ORM\EntityListeners({"PiouPiou\RibsAdminBundle\EventListener\GuidAwareListener", "PiouPiou\RibsAdminBundle\EventListener\CreateUpdateAwareListener"})
 */
class User
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
	 * @var AccessRight
	 *
	 * @ORM\ManyToOne(targetEntity="PiouPiou\RibsAdminBundle\Entity\AccessRight", inversedBy="users")
	 * @ORM\JoinColumn(name="id_access_right", referencedColumnName="id", nullable=true)
	 */
    private $accessRightList;
	
	/**
	 * @var boolean
	 *
	 * @ORM\Column(name="admin", type="boolean", nullable=true, options={"default": false})
	 */
    private $admin;

    /**
     * @var string
     *
     * @ORM\Column(name="firstname", type="string", length=255, nullable=false)
     */
    private $firstname;

    /**
     * @var string
     *
     * @ORM\Column(name="lastname", type="string", length=255, nullable=false)
     */
    private $lastname;

    /**
     * @var string
     *
     * @ORM\Column(name="adress", type="string", length=255, nullable=true)
     */
    private $adress;

    /**
     * @var string
     *
     * @ORM\Column(name="postal_code", type="string", length=100, nullable=true)
     */
    private $postalCode;

    /**
     * @var string
     *
     * @ORM\Column(name="country", type="string", length=100, nullable=true)
     */
    private $country;

    /**
     * @var string
     *
     * @ORM\Column(name="state", type="string", length=255, nullable=true)
     */
    private $state;

    /**
     * @var string
     *
     * @ORM\Column(name="access_rights", type="text", nullable=true)
     */
    private $accessRights;
	
	/**
	 * @var boolean
	 *
	 * @ORM\Column(name="archived", type="boolean", nullable=true, options={"default": false})
	 */
	private $archived = false;

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
	 * @return AccessRight
	 */
	public function getAccessRightList()
	{
		return $this->accessRightList;
	}
	
	/**
	 * @param AccessRight $accessRightList
	 */
	public function setAccessRightList($accessRightList)
	{
		$this->accessRightList = $accessRightList;
	}
	
	/**
	 * @return bool
	 */
	public function getAdmin(): ?bool
	{
		return $this->admin;
	}
	
	/**
	 * @param bool $admin
	 */
	public function setAdmin(bool $admin)
	{
		$this->admin = $admin;
	}

    /**
     * @return string
     */
    public function getFirstname()
    {
        return $this->firstname;
    }

    /**
     * @param string $firstname
     */
    public function setFirstname($firstname)
    {
        $this->firstname = $firstname;
    }

    /**
     * @return string
     */
    public function getLastname()
    {
        return $this->lastname;
    }

    /**
     * @param string $lastname
     */
    public function setLastname($lastname)
    {
        $this->lastname = $lastname;
    }

    /**
     * @return string
     */
    public function getAdress()
    {
        return $this->adress;
    }

    /**
     * @param string $adress
     */
    public function setAdress($adress)
    {
        $this->adress = $adress;
    }

    /**
     * @return string
     */
    public function getPostalCode()
    {
        return $this->postalCode;
    }

    /**
     * @param string $postalCode
     */
    public function setPostalCode($postalCode)
    {
        $this->postalCode = $postalCode;
    }

    /**
     * @return string
     */
    public function getCountry()
    {
        return $this->country;
    }

    /**
     * @param string $country
     */
    public function setCountry($country)
    {
        $this->country = $country;
    }

    /**
     * @return string
     */
    public function getState()
    {
        return $this->state;
    }

    /**
     * @param string $state
     */
    public function setState($state)
    {
        $this->state = $state;
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
    public function setAccessRights($accessRights)
    {
        $this->accessRights = $accessRights;
    }
	
	/**
	 * @return boolean
	 */
	public function getArchived(): ?bool
	{
		return $this->archived;
	}
	
	/**
	 * @param boolean $archived
	 */
	public function setArchived(bool $archived)
	{
		$this->archived = $archived;
	}

	public function __toString()
    {
        return $this->getFirstname() . " " . $this->getLastname();
    }
}

