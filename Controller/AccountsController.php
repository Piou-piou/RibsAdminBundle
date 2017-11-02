<?php

namespace Ribs\RibsAdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AccountsController extends Controller
{
	//-------------------------------------------- DISPLAY VIEWS ---------------------------------------------------------------//
	/**
	 * @Route("/accounts", name="ribsadmin_accounts")
	 * @return Response function that return a list of all users that are not archived and different of current accout
	 */
	public function AccountsListAction(): Response
	{
		$em = $this->getDoctrine()->getManager();
		$current_account = $this->getUser()->getUser();
		
		$users = $em->getRepository("RibsAdminBundle:FosUser")->findAllUserNoArchived($current_account);
		dump($users);
		return $this->render('@RibsAdmin/accounts/list-all-accounts.html.twig', [
			"users" => $users
		]);
	}
	//-------------------------------------------- END DISPLAY VIEWS -----------------------------------------------------------//
	
	/**
	 * @Route("/account/archive/{guid}", name="ribsadmin_account_archive")
	 * @param string $guid
	 * @return RedirectResponse function that will archive a user
	 */
	public function archiveAccount(string $guid): RedirectResponse {
		$em = $this->getDoctrine()->getManager();
		
		$user = $em->getRepository("RibsAdminBundle:User")->findOneBy(["guid" => $guid]);
		
		if ($user) {
			$user->setArchived(true);
			$em->persist($user);
			$em->flush();
			
			$this->addFlash("success-flash", "The user ". $user->getFirstname() . " " . $user->getLastname() .
				" was archived sucessfuly");
		}
		
		return $this->redirectToRoute("ribsadmin_accounts");
	}
}