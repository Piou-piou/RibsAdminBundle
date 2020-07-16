<?php

namespace PiouPiou\RibsAdminBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UploaderType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add($options["uploader_name"], FileType::class, [
                "label" => false,
                "attr" => [
                    "class" => "input-autocomplete",
                    "data-ribs-fileuploader" => "",
                    "data-url-param" => $options["data_url_param"],
                    "data-retrieve-url-param" => $options["data_retrieve_url_param"],
                    "data-delete-url-param" => $options["data_delete_url_param"],
                    "accept" => $options["accept"],
                    "multiple" => $options["multiple"],
                    "autocomplete" => "off",
                ],
                "mapped" => false
            ]);
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            "uploader_name" => null,
            "data_url_param" => null,
            "data_retrieve_url_param" => null,
            "data_delete_url_param" => null,
            "accept" => "*",
            "multiple" => false,
        ]);
    }
}
