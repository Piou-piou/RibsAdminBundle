<?php

namespace Ribs\RibsAdminBundle\Form;

use Ribs\RibsAdminBundle\Entity\Account;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;

class Registration extends AbstractType
{
	public function buildForm(FormBuilderInterface $builder, array $options)
	{
		$builder
			->add('email', EmailType::class)
			->add('username', TextType::class)
			->add('password', RepeatedType::class, [
				'type' => PasswordType::class,
				'first_options' => ['label' => 'Password'],
				'second_options' => ['label' => 'Repeat Password'],
			]);
	}
	
	public function configureOptions(OptionsResolver $resolver)
	{
		$resolver->setDefaults([
			'data_class' => Account::class,
		]);
	}
}