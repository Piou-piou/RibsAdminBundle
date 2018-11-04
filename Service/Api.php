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
		$token = $this->generateToken();
		$now = new \DateTime();
		$end_token = $now->add(new \DateInterval('PT20M'));
		
		$account->setToken($token);
		$account->setEndToken($end_token);
		
		$this->em->persist($account);
		$this->em->flush();
		
		return $token;
	}
	
	/**
	 * @param int $length
	 * @return string
	 * generate a token for api
	 */
	private function generateToken(int $length = 15): string
	{
		$string = "abcdefghijklmnopqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789";
		$token = "";
		srand((double)microtime() * 1000000);
		for ($i = 0 ; $i < $length ; $i++) {
			$token .= $string[rand() % strlen($string)];
		}
		
		return $token;
	}
}