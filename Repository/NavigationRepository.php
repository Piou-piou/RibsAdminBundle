<?php

namespace Ribs\RibsAdminBundle\Repository;

use Doctrine\ORM\EntityRepository;

class NavigationRepository extends EntityRepository
{
	/**
	 * @return array
	 * function that return all navigation links of pages and modules
	 */
	public function findAllNavigation(): array
	{
		$query = $this->getEntityManager()->getConnection()->prepare("SELECT p.url, p.title, p.title_tag FROM navigation n
			INNER JOIN page p ON n.id_page = p.id AND p.displayed = 1
			INNER JOIN module m ON n.id_module = m.id AND m.displayed = 1
		  	ORDER BY n.order ASC
 		");
		
		$query->execute();
		
		return $query->fetchAll(\PDO::FETCH_ASSOC);
	}
	
	/**
	 * @return array
	 * function that return all navigation links of pages
	 */
	public function findAllNavigationPage(): array
	{
		$query = $this->getEntityManager()->getConnection()->prepare("SELECT p.url, p.title, p.title_tag FROM navigation n
			INNER JOIN page p ON n.id_page = p.id AND p.displayed = 1
		  	ORDER BY n.order ASC
 		");
		
		$query->execute();
		
		return $query->fetchAll(\PDO::FETCH_ASSOC);
	}
}