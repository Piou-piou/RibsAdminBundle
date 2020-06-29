<?php

namespace PiouPiou\RibsAdminBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class AccessRight extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
	public function buildForm(FormBuilderInterface $builder, array $options)
	{
		$builder
			->add('name', TextType::class, [
				'label' => 'Name of the list',
				'attr' => [],
				'required' => true
			])
			->add('submit', SubmitType::class, [
				'label' => 'Validate',
				'attr' => []
			]);
	}

    /**
     * @param OptionsResolver $resolver
     */
	public function configureOptions(OptionsResolver $resolver)
	{
		$resolver->setDefaults([
			'data_class' => \PiouPiou\RibsAdminBundle\Entity\AccessRight::class,
		]);
	}
}
