<?php

namespace PiouPiou\RibsAdminBundle\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UserLogsRepository extends EntityRepository
{
    /**
     * @param int $page
     * @param int $max_per_page
     * @return Paginator
     */
    public function findAllPaginated(int $page, int $max_per_page): Paginator
    {
        $qb = $this->createQueryBuilder('l')->orderBy('l.created_at', 'DESC');
        $query = $qb->getQuery();

        $first_result = ($page - 1) * $max_per_page;
        $query->setFirstResult($first_result)->setMaxResults($max_per_page);
        $paginator = new Paginator($query);

        if (($paginator->count() <= $first_result) && $page != 1) {
            throw new NotFoundHttpException('La page demandée n\'existe pas.');
        }

        return $paginator;
    }
}
