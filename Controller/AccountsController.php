<?php

namespace PiouPiou\RibsAdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AccountsController extends Controller
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
	public function editUserAction(): Response {
		return $this->render("@RibsAdmin/accounts/create.html.twig");
	}
	//-------------------------------------------- END DISPLAY VIEWS -----------------------------------------------------------//
	
	/**
	 * @Route("/account/archive/{guid}/{activate}", name="ribsadmin_account_archive")
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