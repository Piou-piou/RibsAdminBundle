<?php

namespace Ribs\RibsAdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AccountsController extends Controller
{
	/**
	 * @Route("/accounts", name="ribsadmin_accounts")
	 * @return Response
	 */
	public function AccountsListAction(): Response {
		return $this->render('@RibsAdmin/accounts/list-all-accounts.html.twig');
	}
}