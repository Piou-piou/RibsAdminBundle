<?php

namespace Ribs\RibsAdminBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="fos_user")
 */
class FosUser extends BaseUser
{
	/**
	 * @ORM\Id
	 * @ORM\Column(type="integer")
	 * @ORM\GeneratedValue(strategy="AUTO")
	 */
	protected $id;
	
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
		parent::__construct();
		// your own logic
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
	
	
}