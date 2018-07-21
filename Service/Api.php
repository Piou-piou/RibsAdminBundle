<?php

namespace PiouPiou\RibsAdminBundle\Service;

use Doctrine\ORM\EntityManagerInterface;
use PiouPiou\RibsAdminBundle\Entity\Account;

class Api
{
	/**
	 * @var EntityManagerInterface
	 */
	private $em;
	
	/**
	 * Api constructor.
	 * @param EntityManagerInterface $em
	 */
	public function __construct(EntityManagerInterface $em)
	{
		$this->em = $em;
	}
	
	/**
	 * @param Account $account
	 * @return string
	 * method that return the token for a user
	 */
	public function getToken(Account $account): string
	{
		$token = $account->getToken();
		$now = new \DateTime();
		
		if ($token === null || $account->getEndToken() < $now) {
			return $this->setToken($account);
		}
		
		return $token;
	}
	
	/**
	 * @param Account $account
	 * @return string
	 * method that set a toek for the user
	 */
	public function setToken(Account $account): string
	{
		$token = uniqid();
		$now = new \DateTime();
		$end_token = $now->add(new \DateInterval('PT20M'));
		
		$account->setToken($token);
		$account->setEndToken($end_token);
		
		$this->em->persist($account);
		$this->em->flush();
		
		return $token;
	}
}