<?php

namespace PiouPiou\RibsAdminBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @ORM\Entity(repositoryClass="PiouPiou\RibsAdminBundle\Repository\AccountRepository")
 * @ORM\EntityListeners({"PiouPiou\RibsAdminBundle\EventListener\CreateUpdateAwareListener"})
 * @ORM\Table(name="account")
 */
class Account implements UserInterface, \Serializable
{
	/**
	 * @ORM\Id
	 * @ORM\Column(type="integer")
	 * @ORM\GeneratedValue(strategy="AUTO")
	 */
	protected $id;
	
	/**
	 * @ORM\Column(type="string", length=255, unique=true)
	 */
	private $username;
	
	/**
	 * @ORM\Column(type="string", length=64)
	 */
	private $password;
	
	/**
	 * @ORM\Column(type="string", length=64, nullable=true)
	 */
	private $plainPassword;
	
	/**
	 * @ORM\Column(type="string", length=100, unique=true)
	 */
	private $email;
	
	/**
	 * @ORM\Column(name="is_active", type="boolean")
	 */
	private $isActive;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    protected $last_connection;

    /**
     * @ORM\OneToMany(targetEntity="AccountToken", mappedBy="account")
     * @ORM\JoinColumn(name="id", referencedColumnName="account_id", nullable=false)
     */
    protected $tokens;
	
	/**
	 * @var User
	 *
	 * @ORM\OneToOne(targetEntity="PiouPiou\RibsAdminBundle\Entity\User", cascade={"persist"})
	 * @ORM\JoinColumns({
	 *   @ORM\JoinColumn(name="id_user", referencedColumnName="id", nullable=true)
	 * })
	 */
	private $user;

    /**
     * @ORM\Column(name="created_at", type="datetime", nullable=true)
     */
    protected $created_at;

    /**
     * @ORM\Column(name="created_by", type="integer", nullable=false)
     * @ORM\ManyToOne(targetEntity="PiouPiou\RibsAdminBundle\Entity\User")
     * @ORM\JoinColumn(name="created_by", referencedColumnName="id", nullable=false)
     */
    protected $created_by;

    /**
     * @ORM\Column(name="updated_at", type="datetime", nullable=true)
     */
    protected $updated_at;

    /**
     * @ORM\Column(name="updated_by", type="integer", nullable=false)
     * @ORM\ManyToOne(targetEntity="PiouPiou\RibsAdminBundle\Entity\User")
     * @ORM\JoinColumn(name="updated_by", referencedColumnName="id", nullable=false)
     */
    protected $updated_by;
	
	public function __construct()
	{
		$this->isActive = true;
		// may not be needed, see section on salt below
		// $this->salt = md5(uniqid('', true));
	}
	
	/**
	 * @return mixed
	 */
	public function getId()
	{
		return $this->id;
	}
	
	/**
	 * @param mixed $id
	 */
	public function setId($id)
	{
		$this->id = $id;
	}
	
	/**
	 * @return mixed
	 */
	public function getEmail()
	{
		return $this->email;
	}
	
	/**
	 * @param mixed $email
	 */
	public function setEmail($email)
	{
		$this->email = $email;
	}
	
	/**
	 * @return mixed
	 */
	public function getPassword()
	{
		return $this->password;
	}
	
	/**
	 * @param mixed $password
	 */
	public function setPassword($password)
	{
		$this->password = $password;
	}
	
	/**
	 * @return mixed
	 */
	public function getPlainPassword()
	{
		return $this->plainPassword;
	}
	
	/**
	 * @param mixed $plainPassword
	 */
	public function setPlainPassword(string $plainPassword)
	{
		$this->plainPassword = $plainPassword;
	}
	
	/**
	 * @return mixed
	 */
	public function getUsername()
	{
		return $this->username;
	}
	
	/**
	 * @param mixed $username
	 */
	public function setUsername($username)
	{
		$this->username = $username;
	}
	
	/**
	 * @return mixed
	 */
	public function getisActive()
	{
		return $this->isActive;
	}
	
	/**
	 * @param mixed $isActive
	 */
	public function setIsActive($isActive)
	{
		$this->isActive = $isActive;
	}
	
	/**
	 * @return User
	 */
	public function getUser()
	{
		return $this->user;
	}
	
	/**
	 * @param User $user
	 */
	public function setUser($user)
	{
		$this->user = $user;
	}

    /**
     * @return mixed
     */
    public function getLastConnection()
    {
        return $this->last_connection;
    }

    /**
     * @param mixed $last_connection
     * @return Account
     */
    public function setLastConnection($last_connection)
    {
        $this->last_connection = $last_connection;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getTokens()
    {
        return $this->tokens;
    }

    /**
     * @param mixed $tokens
     * @return Account
     */
    public function setTokens($tokens)
    {
        $this->tokens = $tokens;

        return $this;
    }
	
	/**
	 * Returns the roles granted to the user.
	 *
	 * <code>
	 * public function getRoles()
	 * {
	 *     return array('ROLE_USER');
	 * }
	 * </code>
	 *
	 * Alternatively, the roles might be stored on a ``roles`` property,
	 * and populated in any number of different ways when the user object
	 * is created.
	 *
	 * @return (Role|string)[] The user roles
	 */
	public function getRoles()
	{
		return ['ROLE_ADMIN'];
	}
	
	/**
	 * Returns the salt that was originally used to encode the password.
	 *
	 * This can return null if the password was not encoded using a salt.
	 *
	 * @return string|null The salt
	 */
	public function getSalt()
	{
		// you *may* need a real salt depending on your encoder
		// see section on salt below
		return null;
	}
	
	/**
	 * Removes sensitive data from the user.
	 *
	 * This is important if, at any given point, sensitive information like
	 * the plain-text password is stored on this object.
	 */
	public function eraseCredentials()
	{
	}
	
	/**
	 * String representation of object
	 * @link http://php.net/manual/en/serializable.serialize.php
	 * @return string the string representation of the object or null
	 * @since 5.1.0
	 */
	public function serialize()
	{
		return serialize([
			$this->id,
			$this->username,
			$this->password,
			// see section on salt below
			// $this->salt,
		]);
	}
	
	/**
	 * Constructs the object
	 * @link http://php.net/manual/en/serializable.unserialize.php
	 * @param string $serialized <p>
	 * The string representation of the object.
	 * </p>
	 * @return void
	 * @since 5.1.0
	 */
	public function unserialize($serialized)
	{
		list (
			$this->id,
			$this->username,
			$this->password,
			// see section on salt below
			// $this->salt
			) = unserialize($serialized);
	}

    /**
     * @return mixed
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }

    /**
     * @param mixed $created_at
     * @return Account
     */
    public function setCreatedAt($created_at): Account
    {
        $this->created_at = $created_at;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getCreatedBy()
    {
        return $this->created_by;
    }

    /**
     * @ORM\PrePersist
     * @param mixed $created_by
     * @return Account
     */
    public function setCreatedBy($created_by): Account
    {
        $this->created_by = $created_by;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getUpdatedAt()
    {
        return $this->updated_at;
    }

    /**
     * @param mixed $updated_at
     * @return Account
     */
    public function setUpdatedAt($updated_at): Account
    {
        $this->updated_at = $updated_at;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getUpdatedBy()
    {
        return $this->updated_by;
    }

    /**
     * @ORM\PreUpdate
     * @param mixed $updated_by
     * @return Account
     */
    public function setUpdatedBy($updated_by): Account
    {
        $this->updated_by = $updated_by;

        return $this;
    }
}
