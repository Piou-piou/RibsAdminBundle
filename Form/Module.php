<?php

namespace PiouPiou\RibsAdminBundle\Form;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class Module extends AbstractType
{
	public function buildForm(FormBuilderInterface $builder, array $options)
	{
		$builder
			->add("title", TextType::class, [
				"label" => "Name",
				"required" => true
			])
			->add("packageName", TextType::class, [
				"label" => "Package name",
				"required" => true,
                "disabled" => true
			])
            ->add("titleTag", TextType::class, [
                "label" => "Title tag",
                "required" => true
            ])
            ->add("descriptionTag", TextareaType::class, [
                "label" => "Description tag",
                "required" => true,
            ])
            ->add("url", TextType::class, [
                "label" => "Url",
                "required" => true
            ])
            ->add("urlAdmin", TextType::class, [
                "label" => "Admin url",
                "required" => true
            ])
			->add("active", CheckboxType::class, [
				"label" => "Enable module",
				"attr" => [
					"class" => "ribs-checkbox switched cxs-2 no-pl"
				],
				"required" => false
			])
            ->add("displayed", CheckboxType::class, [
                "label" => "Display module in navigation",
                "attr" => [
                    "class" => "ribs-checkbox switched cxs-2 no-pl"
                ],
                "required" => false
            ])
            ->add('submit', SubmitType::class, [
                'label' => 'Validate',
                'attr' => []
            ]);
	}
	
	public function configureOptions(OptionsResolver $resolver)
	{
		$resolver->setDefaults([
			"data_class" => \PiouPiou\RibsAdminBundle\Entity\Module::class,
		]);
	}
}
