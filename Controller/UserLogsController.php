<?php

namespace PiouPiou\RibsAdminBundle\Controller;

use PiouPiou\RibsAdminBundle\Entity\UserLogs;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class UserLogsController extends AbstractController
{
    /**
     * list all user logs
     * @Route("/user-logs/", name="ribsadmin_userlogs")
     * @return Response
     */
    public function list(): Response
    {
        $em = $this->getDoctrine()->getManager();

        $logs = $em->getRepository(UserLogs::class)->findBy([], ["created_at" => "DESC"]);

        return $this->render('@RibsAdmin/userlogs/list.html.twig', [
            "logs" => $logs
        ]);
    }
}
