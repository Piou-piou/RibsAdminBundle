<?php

namespace PiouPiou\RibsAdminBundle\Form;

use PiouPiou\RibsAdminBundle\Form\Type\UploaderType;
use Symfony\Component\Form\AbstractType;
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
			->add("packageConfig", TextType::class, [
				"label" => "Config file name"
			])
            ->add("packageConfigFile", UploaderType::class, [
                "uploader_name" => "config_file",
                "data_url_param" => "upload",
                "data_retrieve_url_param" => "upload",
                "data_delete_url_param" => "upload",
            ])
            ->add("packageRoute", TextType::class, [
                "label" => "Config route name"
            ])
            ->add("packageRouteFile", UploaderType::class, [
                "uploader_name" => "route_file",
                "data_url_param" => "upload",
                "data_retrieve_url_param" => "upload",
                "data_delete_url_param" => "upload",
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
