<?php

namespace PiouPiou\RibsAdminBundle\Form;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class User extends AbstractType
{
	/**
	 * @var EntityManagerInterface
	 */
	private $em;
	
	/**
	 * @var TokenStorageInterface
	 */
	private $tokenStorage;
	
	/**
	 * User constructor.
	 * @param EntityManagerInterface $em
	 * @param TokenStorageInterface $tokenStorage
	 */
	public function __construct(EntityManagerInterface $em, TokenStorageInterface $tokenStorage)
	{
		$this->em = $em;
		$this->tokenStorage = $tokenStorage;
	}
	
	public function buildForm(FormBuilderInterface $builder, array $options)
	{
		$access_rights_lists = $this->em->getRepository(\PiouPiou\RibsAdminBundle\Entity\AccessRight::class)->findAll();
		
		$builder
			->add('firstname', TextType::class, [
				'label' => 'Firstname',
				'attr' => [],
				'required' => true
			])
			->add('lastname', TextType::class, [
				'label' => 'lastname',
				'attr' => [],
				'required' => true
			])
			->add('admin', CheckboxType::class, [
				'label' => 'Access to administration',
				'attr' => [
					'class' => 'ribs-checkbox switched'
				],
				'required' => false
			])
			->add("AccessRightList", EntityType::class, [
				"label" => "Select an access right list for the user",
				"choices" => $access_rights_lists,
				"choice_label" => 'name',
				"class" => \PiouPiou\RibsAdminBundle\Entity\AccessRight::class,
				"multiple" => false,
				"required" => false
			]);
	}
	
	public function configureOptions(OptionsResolver $resolver)
	{
		$resolver->setDefaults([
			'data_class' => \PiouPiou\RibsAdminBundle\Entity\User::class,
		]);
	}
}
