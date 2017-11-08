<?php

namespace Ribs\RibsAdminBundle\Controller;

use Ribs\RibsAdminBundle\Entity\AccessRight;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AccessRightsController extends Controller
{
	/**
	 * @Route("/access-rights-management/", name="ribsadmin_access_rights")
	 * @return Response
	 */
	public function listAction(): Response
	{
		$em = $this->getDoctrine()->getManager();
		$acces_right = $em->getRepository("RibsAdminBundle:AccessRight")->findAll();
		
		return $this->render("@RibsAdmin/access-rights/list-all-list.html.twig", [
			"access_right" => $acces_right
		]);
	}
	
	/**
	 * @Route("/access-rights-management/create/", name="ribsadmin_access_rights_create")
	 * @Route("/access-rights-management/edit/{guid}", name="ribsadmin_access_rights_edit")
	 * @return Response
	 */
	public function editAction(string $guid = null): Response
	{
		$em = $this->getDoctrine()->getManager();
		
		if ($guid === null) {
			$access_right = new AccessRight();
		} else {
			$access_right = $em->getRepository("RibsAdminBundle:AccessRight")->findOneBy(["guid" => $guid]);
		}
		
		return $this->render("@RibsAdmin/access-rights/edit-list.html.twig", [
			"access_right" => $access_right
		]);
	}
}