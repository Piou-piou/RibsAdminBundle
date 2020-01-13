<?php

namespace PiouPiou\RibsAdminBundle\Controller;

use PiouPiou\RibsAdminBundle\Entity\Module;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ModuleController extends AbstractController
{
    /**
     * @Route("/modules/", name="ribsadmin_modules")
     * @return Response
     * function that return a list of all modules
     */
    public function List(): Response
    {
        $em = $this->getDoctrine()->getManager();

        $modules = $em->getRepository(Module::class)->findBy([], ['titleTag' => 'ASC']);

        return $this->render('@RibsAdmin/modules/list.html.twig', [
            "modules" => $modules,
        ]);
    }

    /**
     * @Route("/modules/create/", name="ribsadmin_modules_create")
     * @Route("/modules/edit/{id}", name="ribsadmin_modules_edit")
     * @param Request $request
     * @param int|null $id
     * @return Response
     * method to edit a module
     */
    public function edit(Request $request, int $id = null): Response
    {
        $em = $this->getDoctrine()->getManager();

        if (!$id) {
            $module = new Module();
            $text = "created";
        } else {
            $module = $em->getRepository(Module::class)->findOneBy(["id" => $id]);
            $text = "edited";
        }

        $form = $this->createForm(\PiouPiou\RibsAdminBundle\Form\Module::class, $module);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            /** @var Module $data */
            $data = $form->getData();
            $em->persist($data);
            $em->flush();
            $this->addFlash("success-flash", "Module ". $data->getTitleTag() . " was " . $text);

            return $this->redirectToRoute("ribsadmin_modules");
        }

        return $this->render("@RibsAdmin/modules/edit.html.twig", [
            "form" => $form->createView(),
            "form_errors" => $form->getErrors(),
            "module" => $module
        ]);
    }

    /**
     * @Route("/modules/delete/{id}", name="ribsadmin_modules_delete")
     * @param Request $request
     * @param int $id
     * @return RedirectResponse
     * method to delete a module
     */
    public function delete(Request $request, int $id): RedirectResponse
    {
        $em = $this->getDoctrine()->getManager();
        $module = $em->getRepository(Module::class)->findOneBy(["id" => $id]);

        if ($module) {
            $name = $module->getTitle();
            $em->remove($module);
            $em->flush();
            $this->addFlash("success-flash", "Module " . $name . " was deleted");
        } else {
            $this->addFlash("error-flash", "An error occured, module doesn't found");
        }

        return $this->redirectToRoute("ribsadmin_modules");
    }
}
