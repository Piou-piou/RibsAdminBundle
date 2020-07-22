<?php

namespace PiouPiou\RibsAdminBundle\Controller;

use PiouPiou\RibsAdminBundle\Entity\Account;
use PiouPiou\RibsAdminBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AccountsController extends AbstractController
{
    /**
     * @Route("/accounts/", name="ribsadmin_accounts")
     * @return Response
     */
    public function list(): Response
    {
        $em = $this->getDoctrine()->getManager();
        $current_account = $this->getUser()->getUser();

        $users = $em->getRepository("RibsAdminBundle:Account")->findAllUserArchived($current_account);
        $users_archived = $em->getRepository("RibsAdminBundle:Account")->findAllUserArchived($current_account, true);

        return $this->render('@RibsAdmin/accounts/list.html.twig', [
            "users" => $users,
            "users_archived" => $users_archived
        ]);
    }

    /**
     * @Route("/accounts/create/", name="ribsadmin_accounts_create")
     * @Route("/accounts/show/{guid}", name="ribsadmin_accounts_show")
     * @Route("/accounts/edit/{guid}", name="ribsadmin_accounts_edit")
     * @param Request $request
     * @param string|null $guid
     * @return Response
     */
    public function edit(Request $request, string $guid = null): Response
    {
        $em = $this->getDoctrine()->getManager();
        $disabled_form = strpos($request->get("_route"), "_show") ? true : false;

        if ($guid === null) {
            $account = new Account();
            $old_password = null;
            $user = null;
        } else {
            $user = $em->getRepository(User::class)->findOneBy(["guid" => $guid]);
            $account = $em->getRepository(Account::class)->findOneBy(["user" => $user->getId()]);
            $old_password = $account->getPassword();
        }

        $form = $this->createForm("PiouPiou\RibsAdminBundle\Form\Account", $account,  ["disabled" => $disabled_form]);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            /**
             * @var Account
             */
            $data = $form->getData();

            $account_exist = $em->getRepository(Account::class)->findOneBy(["username" => $data->getUsername()]);

            if ($account_exist && $account_exist === $account) {
                $account_exist = null;
            }

            if (!$account_exist) {
                if ($guid === null) {
                    $temp_password = $this->get("security.password_encoder")->encodePassword($data, $form->get("password")->getData());
                    $data->setPassword($temp_password);
                } else if ($form->get("password")->getData()) {
                    $temp_password = $this->get("security.password_encoder")->encodePassword($data, $form->get("password")->getData());
                    $data->setPassword($temp_password);
                } else {
                    $data->setPassword($old_password);
                }

                $em->persist($data);
                $em->flush();

                $username = $data->getUser()->getFirstName() . " " . $data->getUser()->getLastName();

                if ($guid === null) {
                    $this->addFlash("success-flash", "the account of " . $username . " was created");
                } else {
                    $this->addFlash("success-flash", "the account of " . $username . " was edited");
                }

                return $this->redirectToRoute("ribsadmin_accounts");
            } else {
                $this->addFlash("error-flash", "An account with username " . $data->getUsername() . " already exist");
                return $this->redirectToRoute($request->get("_route"), ["guid" => $guid]);
            }
        }

        return $this->render("@RibsAdmin/accounts/edit.html.twig", [
            "form" => $form->createView(),
            "form_errors" => $form->getErrors(),
            "user" => $user,
            "disabled_form" => $disabled_form
        ]);
    }

    /**
     * method to disable or enable a user
     * @Route("/accounts/archive/{guid}/{activate}", name="ribsadmin_accounts_archive")
     * @param string $guid
     * @param bool $activate
     * @return RedirectResponse
     */
    public function archive(string $guid, bool $activate = false): RedirectResponse
    {
        $em = $this->getDoctrine()->getManager();

        $user = $em->getRepository("RibsAdminBundle:User")->findOneBy(["guid" => $guid]);

        if ($user) {
            if ($activate === true) {
                $user->setArchived(false);
                $word = "activated";
            } else {
                $user->setArchived(true);
                $word = "disabled";
            }

            $em->persist($user);
            $em->flush();

            $this->addFlash("success-flash", "The user " . $user->getFirstname() . " " . $user->getLastname() .
                " was " . $word . " sucessfuly");
        }

        return $this->redirectToRoute("ribsadmin_accounts");
    }
}
