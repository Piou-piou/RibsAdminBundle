<?php

namespace PiouPiou\RibsAdminBundle\Controller;

use PiouPiou\RibsAdminBundle\Entity\UserLogs;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UserLogsController extends AbstractController
{
    /**
     * list all user logs
     * @Route("/user-logs/{page}", requirements={"page" = "\d+"}, name="ribsadmin_userlogs")
     * @param ParameterBagInterface $parameterBag
     * @param int $page
     * @return Response
     */
    public function list(ParameterBagInterface $parameterBag, int $page = 1): Response
    {
        $em = $this->getDoctrine()->getManager();
        $max_per_page = $parameterBag->get("ribs_admin")["paginator_element_per_page"];

        $logs = $em->getRepository(UserLogs::class)->findAllPaginated($page, $max_per_page);
        $pagination = array(
            "page" => $page,
            "page_number" => ceil(count($logs) / 20),
            "route" => "ribsadmin_userlogs",
            "parameters" => array()
        );

        return $this->render("@RibsAdmin/userlogs/list.html.twig", [
            "logs" => $logs,
            "pagination" => $pagination
        ]);
    }

    /**
     * show detail of a user log
     * @Route("/user-logs/show/{guid}", name="ribsadmin_userlogs_show")
     * @param string $guid
     * @return Response
     */
    public function show(string $guid): Response
    {
        $log = $this->getDoctrine()->getRepository(UserLogs::class)->findOneByGuid($guid);
        dump($log->getRequestParameters());

        return $this->render("@RibsAdmin/userlogs/show.html.twig", [
            "log" => $log,
        ]);
    }
}
