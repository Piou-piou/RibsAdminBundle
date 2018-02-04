<?php

namespace PiouPiou\RibsAdminBundle\Repository;

use Doctrine\ORM\EntityRepository;
use PiouPiou\RibsAdminBundle\Entity\AccessRight;

class AccessRightRepository extends EntityRepository
{
	/**
	 * @param AccessRight $access_right
	 * function that delete all user which are in a list of rights
	 */
	public function deleteAllUsersList(AccessRight $access_right)
	{
		$query = $this->getEntityManager()->getConnection()->prepare("UPDATE user SET id_access_right = NULL WHERE
 			id_access_right = :id_access_right
 		");
		$query->bindValue("id_access_right", $access_right->getId());
		$query->execute();
	}
	
	/**
	 * @param int $access_right_id
	 * @param string $guid_admin
	 * function that add a user in an access right list
	 */
	public function setAccessRightListUser(int $access_right_id, string $guid_admin)
	{
		$query = $this->getEntityManager()->getConnection()->prepare("UPDATE user SET id_access_right = :id_access_right WHERE
 			guid = :guid_user
 		");
		$query->bindValue("id_access_right", $access_right_id, \PDO::PARAM_INT);
		$query->bindValue("guid_user", $guid_admin, \PDO::PARAM_STR);
		$query->execute();
	}
}