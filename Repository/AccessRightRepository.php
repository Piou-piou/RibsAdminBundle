<?php

namespace Ribs\RibsAdminBundle\Repository;

use Doctrine\ORM\EntityRepository;
use Ribs\RibsAdminBundle\Entity\AccessRight;

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
}