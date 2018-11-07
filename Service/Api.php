<?php

namespace PiouPiou\RibsAdminBundle\Service;

use Doctrine\ORM\EntityManagerInterface;
use PiouPiou\RibsAdminBundle\Entity\Account;
use Symfony\Component\DependencyInjection\ContainerInterface;

class Api
{
	/**
	 * @var ContainerInterface
	 */
	private $container;
	
	/**
	 * @var EntityManagerInterface
	 */
	private $em;
	
	private $infoJwt;
	
	/**
	 * Api constructor.
	 * @param ContainerInterface $container
	 * @param EntityManagerInterface $em
	 */
	public function __construct(ContainerInterface $container, EntityManagerInterface $em)
	{
		$this->container = $container;
		$this->em = $em;
	}
	
	/**
	 * @param string $infos_jwt
	 * @param string $token
	 * @return Account|bool
	 * this method is used to test jwt and if the user is ok else send false
	 */
	public function userIslogged(string $infos_jwt, string $token)
	{
		$em = $this->em;
		$jwt = $this->container->get("ribs_admin.jwt")->decode($infos_jwt, $token);
		
		if ($jwt === false) {
			return false;
		}
		
		$this->infoJwt = $jwt;
		
		$user = $em->getRepository(Account::class)->findOneBy(["token" => $token]);
		
		if (!$user) {
			return false;
		}
		
		return $user;
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
	private function generateToken(int $length = 200): string
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