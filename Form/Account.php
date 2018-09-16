<?php

namespace PiouPiou\RibsAdminBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class Account extends AbstractType
{
	public function buildForm(FormBuilderInterface $builder, array $options)
	{
		$builder
			->add('username', TextType::class, [
				'label' => 'Pseudo',
				'label_attr' => [
					'class' => 'label'
				],
				'attr' => [],
				'required' => true
			])
			->add('email', EmailType::class, [
				'label' => 'E-mail',
				'label_attr' => [
					'class' => 'label'
				],
				'attr' => [],
				'required' => true
			])
			->add('password', RepeatedType::class, [
				'type' => PasswordType::class,
				'invalid_message' => 'The password fields must match',
				'required' => true,
				'first_options' => [
					'label' => 'Password',
					'label_attr' => [
						'class' => 'label'
					]
				],
				'second_options' => [
					'label' => 'Repeat Password',
					'label_attr' => [
						'class' => 'label'
					]
				],
			])
			->add('submit', SubmitType::class, [
				'label' => 'Validate',
				'attr' => []
			]);
		
		$builder->add('user', User::class);
	}
	
	public function configureOptions(OptionsResolver $resolver)
	{
		$resolver->setDefaults([
			'data_class' => \PiouPiou\RibsAdminBundle\Entity\Account::class,
		]);
	}
}