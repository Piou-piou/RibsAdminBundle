<?php

namespace PiouPiou\RibsAdminBundle\Repository;

use Doctrine\DBAL\DBALException;
use Doctrine\ORM\EntityRepository;
use PiouPiou\RibsAdminBundle\Entity\AccessRight;

class AccessRightRepository extends EntityRepository
{
    /**
     * function that delete all user which are in a list of rights
     * @param AccessRight $access_right
     * @throws DBALException
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
     * function that add a user in an access right list
     * @param int $access_right_id
     * @param string $guid_admin
     * @throws DBALException
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
