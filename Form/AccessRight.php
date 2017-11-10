<?php

namespace Ribs\RibsAdminBundle\Form;

use AppBundle\Entity\Profil;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class AccessRight extends AbstractType
{
	public function buildForm(FormBuilderInterface $builder, array $options)
	{
		$builder
			->add('name', TextType::class, [
				'label' => 'Name of the list',
				'label_attr' => [
					'class' => 'label'
				],
                'attr' => [],
                'required' => true
            ])
            ->add('submit', SubmitType::class, [
		'label' => 'Validate',
		'attr' => []
	]);
    }
	
	public function configureOptions(OptionsResolver $resolver)
	{
		$resolver->setDefaults([
			'data_class' => \Ribs\RibsAdminBundle\Entity\AccessRight::class,
		]);
	}
}