<?php

namespace Ribs\RibsAdminBundle\Controller;

use Ribs\RibsAdminBundle\Form\Registration;
use Ribs\RibsAdminBundle\Entity\Account;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class RegistrationController extends Controller
{
	/**
	 * @Route("/register/", name="ribsadmin_register")
	 */
	public function registerAction(Request $request)
	{
		// 1) build the form
		$passwordEncoder = $this->get("security.password_encoder");
		$user = new Account();
		$form = $this->createForm(Registration::class, $user);
		
		// 2) handle the submit (will only happen on POST)
		$form->handleRequest($request);
		if ($form->isSubmitted() && $form->isValid()) {
			//$password = $passwordEncoder->encodePassword($user, "ap@2010");
			
			// 3) Encode the password (you could also do this via Doctrine listener)
			$password = $passwordEncoder->encodePassword($user, $user->getPassword());
			$user->setPassword($password);
			
			// 4) save the User!
			$em = $this->getDoctrine()->getManager();
			$em->persist($user);
			$em->flush();
			
			// ... do any other work - like sending them an email, etc
			// maybe set a "flash" success message for the user
			
			return $this->redirectToRoute('replace_with_some_route');
		}
		
		return $this->render("@RibsAdmin/registration/registration.html", ['form' => $form->createView()]);
	}
}