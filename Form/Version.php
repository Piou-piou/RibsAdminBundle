<?php

namespace PiouPiou\RibsAdminBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class Version extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
	public function buildForm(FormBuilderInterface $builder, array $options)
	{
		$builder
			->add("projectName", TextType::class, [
				"label" => "Project name",
				"required" => true
			])
			->add("projectUrl", TextType::class, [
				"label" => "Project url",
				"required" => true
			])
            ->add("packageName", TextType::class, [
                "label" => "Package name",
                "required" => true
            ])
            ->add("checkVersionUrl", TextType::class, [
                "label" => "Check version url",
                "required" => true
            ])
            ->add("composerLockUrl", TextType::class, [
                "label" => "Check composer.lock url",
                "required" => true
            ])
            ->add('isLocal', CheckboxType::class, [
                'label' => 'Is local project',
                'attr' => [
                    'class' => 'ribs-checkbox switched'
                ],
                'required' => false
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
			"data_class" => \PiouPiou\RibsAdminBundle\Entity\Version::class,
		]);
	}
}
