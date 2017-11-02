<?php

namespace Ribs\RibsAdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AccountsController extends Controller
{
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
}