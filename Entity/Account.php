<?php

namespace Ribs\RibsAdminBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @ORM\Entity(repositoryClass="Ribs\RibsAdminBundle\Repository\FosUserRepository")
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
	 * @ORM\Column(type="string", length=100, unique=true)
	 */
	private $email;
	
	/**
	 * @ORM\Column(name="is_active", type="boolean")
	 */
	private $isActive;
	
	/**
	 * @var User
	 *
	 * @ORM\OneToOne(targetEntity="Ribs\RibsAdminBundle\Entity\User", cascade={"persist"})
	 * @ORM\JoinColumns({
	 *   @ORM\JoinColumn(name="id_user", referencedColumnName="id", nullable=true)
	 * })
	 */
	private $user;
	
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
		return ['ROLE_USER'];
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
}