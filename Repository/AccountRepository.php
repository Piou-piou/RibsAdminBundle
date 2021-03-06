<?php

namespace PiouPiou\RibsAdminBundle\Repository;

use Doctrine\ORM\EntityRepository;
use PiouPiou\RibsAdminBundle\Entity\User;

class AccountRepository extends EntityRepository
{
    /**
     * function that return a list of all users that are not archived and different of current account
     * @param User $current_account
     * @param bool $archived
     * @return array
     */
    public function findAllUserArchived(User $current_account, bool $archived = false): array
    {
        $query = $this->getEntityManager()->createQuery("SELECT fu FROM RibsAdminBundle:Account fu
			  JOIN RibsAdminBundle:User u  WITH fu.user = u
			  WHERE u.archived = :archived and u != :current_account
			")
            ->setParameter("archived", $archived)
            ->setParameter("current_account", $current_account);

        return $query->getResult();
    }
}
