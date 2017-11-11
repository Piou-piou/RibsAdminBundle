<?php

namespace Ribs\RibsAdminBundle\Controller;

use Ribs\RibsAdminBundle\Entity\AccessRight;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AccessRightsController extends Controller
{
	//---------------------------------------------- VIEWS METHODS ---------------------------------------------------------//
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
	 * @param Request $request
	 * @param string|null $guid
	 * @return Response
	 */
	public function editAction(Request $request, string $guid = null): Response
	{
		$em = $this->getDoctrine()->getManager();
		$list_rights_user = [];
		
		if ($guid === null) {
			$access_right = new AccessRight();
		} else {
			$access_right = $em->getRepository("RibsAdminBundle:AccessRight")->findOneBy(["guid" => $guid]);
			$list_rights_user = explode(",", $access_right->getAccessRights());
		}
		
		$form = $this->createForm("Ribs\RibsAdminBundle\Form\AccessRight", $access_right);
		$form->handleRequest($request);
		
		if ($form->isValid() && $form->isSubmitted()) {
			return $this->handleEditForm($request, $form, $access_right);
		}
		
		return $this->render("@RibsAdmin/access-rights/edit-list.html.twig", [
			"access_right" => $access_right,
			"form" => $form->createView(),
			"list_rights_user" => $list_rights_user,
			"ribs_admin_rights" => json_decode(file_get_contents($this->get("ribs_admin.globals")->getBaseBundlePath() . "/Resources/json/ribsadmin_rights.json"))
		]);
	}
	//---------------------------------------------- END VIEWS METHODS ---------------------------------------------------------//
	
	/**
	 * @param Request $request
	 * @param Form $form
	 * @param AccessRight $access_right
	 * @return RedirectResponse
	 */
	private function handleEditForm(Request $request, Form $form, AccessRight $access_right): RedirectResponse
	{
		$em = $this->getDoctrine()->getManager();
		$rights = implode(",", $request->get("right"));
		
		$access_right->setAccessRights($rights);
		
		$em->persist($access_right);
		$em->flush();
		
		$this->addFlash("success-flash", "The right list was correctly edited");
		
		return $this->redirectToRoute("ribsadmin_access_rights");
	}
}