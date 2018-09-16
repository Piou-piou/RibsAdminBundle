<?php

namespace PiouPiou\RibsAdminBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class User extends AbstractType
{
	public function buildForm(FormBuilderInterface $builder, array $options)
	{
		$builder
			->add('firstname', TextType::class, [
				'label' => 'Firstname',
				'label_attr' => [
					'class' => 'label'
				],
				'attr' => [],
				'required' => true
			])
			->add('lastname', TextType::class, [
				'label' => 'lastname',
				'label_attr' => [
					'class' => 'label'
				],
				'attr' => [],
				'required' => true
			])
			->add('accessRightList', CheckboxType::class, [
				'label' => 'Access to administration',
				'label_attr' => [
					'class' => 'ribs-checkbox switched'
				],
				'attr' => [],
				'required' => true
			]);
	}
	
	public function configureOptions(OptionsResolver $resolver)
	{
		$resolver->setDefaults([
			'data_class' => \PiouPiou\RibsAdminBundle\Entity\User::class,
		]);
	}
}