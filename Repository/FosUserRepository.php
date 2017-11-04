<?php

namespace Ribs\RibsAdminBundle\Repository;

use Doctrine\ORM\EntityRepository;
use Ribs\RibsAdminBundle\Entity\User;

class FosUserRepository extends EntityRepository
{
	/**
	 * @param User $current_account
	 * @param bool $archived
	 * @return array function that return a list of all users that are not archived and different of current accout
	 */
	public function findAllUserArchived(User $current_account, bool $archived = false): array
	{
		$query = $this->getEntityManager()->createQuery("SELECT fu FROM RibsAdminBundle:FosUser fu
			  JOIN RibsAdminBundle:User u  WITH fu.user = u
			  WHERE u.archived = :archived and u != :current_account
			")
			->setParameter("archived", $archived)
			->setParameter("current_account", $current_account);
		
		return $query->getResult();
	}
}