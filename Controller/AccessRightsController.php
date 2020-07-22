<?php

namespace PiouPiou\RibsAdminBundle\Controller;

use PiouPiou\RibsAdminBundle\Entity\AccessRight;
use PiouPiou\RibsAdminBundle\Service\Globals;
use PiouPiou\RibsAdminBundle\Service\ModuleService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AccessRightsController extends AbstractController
{
    /**
     * @Route("/access-rights-management/", name="ribsadmin_access_rights")
     * @return Response
     */
    public function list(): Response
    {
        $em = $this->getDoctrine()->getManager();
        $acces_right = $em->getRepository("RibsAdminBundle:AccessRight")->findAll();

        return $this->render("@RibsAdmin/access-rights/list.html.twig", [
            "access_right" => $acces_right
        ]);
    }

    /**
     * @Route("/access-rights-management/create/", name="ribsadmin_access_rights_create")
     * @Route("/access-rights-management/show/{guid}", name="ribsadmin_access_rights_show")
     * @Route("/access-rights-management/edit/{guid}", name="ribsadmin_access_rights_edit")
     * @param Request $request
     * @param Globals $globals
     * @param ModuleService $module
     * @param string|null $guid
     * @return Response
     */
    public function edit(Request $request, Globals $globals, ModuleService $module, string $guid = null): Response
    {
        $em = $this->getDoctrine()->getManager();
        $list_rights_user = [];
        $disabled_form = strpos($request->get("_route"), "_show") ? true : false;

        if ($guid === null) {
            $access_right = new AccessRight();
        } else {
            $access_right = $em->getRepository("RibsAdminBundle:AccessRight")->findOneBy(["guid" => $guid]);
            $list_rights_user = explode(",", $access_right->getAccessRights());
        }

        $admins = $em->getRepository("RibsAdminBundle:User")->findBy(["admin" => true, "archived" => false]);

        $form = $this->createForm("PiouPiou\RibsAdminBundle\Form\AccessRight", $access_right, ["disabled" => $disabled_form]);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            return $this->handleEditForm($request, $access_right);
        }

        return $this->render("@RibsAdmin/access-rights/edit.html.twig", [
            "access_right" => $access_right,
            "form" => $form->createView(),
            "form_errors" => $form->getErrors(),
            "list_rights_user" => $list_rights_user,
            "admins" => $admins,
            "ribs_admin_rights" => json_decode(file_get_contents($globals->getBaseBundlePath() . "/Resources/json/ribsadmin_rights.json")),
            "modules" => $module->getAllInfosModules(),
            "disabled_form" => $disabled_form
        ]);
    }

    /**
     * @Route("/access-rights-management/delete/{guid}", name="ribsadmin_access_rights_delete")
     * @param string $guid
     * @return RedirectResponse function that delete an access right list
     */
    public function delete(string $guid): RedirectResponse
    {
        $em = $this->getDoctrine()->getManager();
        $list = $em->getRepository("RibsAdminBundle:AccessRight")->findOneBy(["guid" => $guid]);

        if ($list) {
            foreach ($list->getUsers() as $user) {
                $user->setAccessRightList(null);
            }

            $em->remove($list);
            $em->flush();

            $this->addFlash("success-flash", "The right list was deleted");
        } else {
            $this->addFlash("error-flash", "The right list wasn't found");
        }

        return $this->redirectToRoute("ribsadmin_access_rights");
    }

    /**
     * @param Request $request
     * @param AccessRight $access_right
     * @return RedirectResponse function that handle the form request
     */
    private function handleEditForm(Request $request, AccessRight $access_right): RedirectResponse
    {
        $em = $this->getDoctrine()->getManager();

        if ($request->get("right") === null) {
            $rights = "";
        } else {
            $rights = implode(",", $request->get("right"));
        }

        $access_right->setAccessRights($rights);
        $em->persist($access_right);
        $em->flush();

        $em->getRepository("RibsAdminBundle:AccessRight")->deleteAllUsersList($access_right);
        $admins = $request->get("admins");

        if ($admins !== null) {
            foreach ($admins as $admin) {
                $em->getRepository("RibsAdminBundle:AccessRight")->setAccessRightListUser($access_right->getId(), $admin);
            }
        }

        $this->addFlash("success-flash", "The right list was correctly edited");

        return $this->redirectToRoute("ribsadmin_access_rights");
    }
}
