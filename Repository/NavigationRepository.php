<?php

namespace Ribs\RibsAdminBundle\Repository;

use Doctrine\ORM\EntityRepository;
use Ribs\RibsAdminBundle\Entity\AccessRight;

class NavigationRepository extends EntityRepository
{
	/**
	 * @param AccessRight $access_right
	 * function that delete all user which are in a list of rights
	 */
	public function findAllNavigationPage()
	{
		$query = $this->getEntityManager()->getConnection()->prepare("SELECT p.url, p.title, p.title_tag FROM navigation n
			INNER JOIN page p ON n.id_page = p.id AND p.displayed = 1
		  	ORDER BY n.order ASC
 		");
		
		$query->execute();
		
		return $query->fetchAll(\PDO::FETCH_ASSOC);
	}
}