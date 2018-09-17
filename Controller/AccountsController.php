<?php

namespace PiouPiou\RibsAdminBundle\Controller;

use PiouPiou\RibsAdminBundle\Entity\Account;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\EncoderFactory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AccountsController extends AbstractController
{
	//-------------------------------------------- DISPLAY VIEWS ---------------------------------------------------------------//
	/**
	 * @Route("/accounts/", name="ribsadmin_accounts")
	 * @return Response function that return a list of all users that are archived or not and different of current accout
	 */
	public function AccountsListAction(): Response
	{
		$em = $this->getDoctrine()->getManager();
		$current_account = $this->getUser()->getUser();
		
		$users = $em->getRepository("RibsAdminBundle:Account")->findAllUserArchived($current_account);
		$users_archived = $em->getRepository("RibsAdminBundle:Account")->findAllUserArchived($current_account, true);
		
		return $this->render('@RibsAdmin/accounts/list-all-accounts.html.twig', [
			"users" => $users,
			"users_archived" => $users_archived
		]);
	}
	
	/**
	 * @Route("/accounts/create/", name="ribsadmin_accounts_create")
	 * @Route("/accounts/edit", name="ribsadmin_accounts_edit")
	 * @return Response
	 */
	public function editUserAction(Request $request): Response
	{
		$em = $this->getDoctrine()->getManager();
		$form = $this->createForm("PiouPiou\RibsAdminBundle\Form\Account");
		
		$form->handleRequest($request);
		
		if ($form->isSubmitted() && $form->isValid()) {
			/**
			 * @var Account
			 */
			$account = $form->getData();
			
			$temp_password = $this->get("security.password_encoder")->encodePassword($account, $form->get("password")->getData());
			$account->setPassword($temp_password);
			
			$em->persist($account);
			$em->flush();
			
			$username = $account->getUser()->getFirstName() . " " . $account->getUser()->getLastName();
			
			$this->addFlash("success-flash", "the account of ". $username . " was created");
		}
		
		return $this->render("@RibsAdmin/accounts/edit.html.twig", [
			"form" => $form->createView()
		]);
	}
	//-------------------------------------------- END DISPLAY VIEWS -----------------------------------------------------------//
	
	/**
	 * @Route("/accounts/archive/{guid}/{activate}", name="ribsadmin_accounts_archive")
	 * @param string $guid
	 * @return RedirectResponse function that will disable or activate a user
	 */
	public function archiveAccount(string $guid, bool $activate = false): RedirectResponse
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