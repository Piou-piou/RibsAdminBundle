<?php

namespace PiouPiou\RibsAdminBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class AutocompleteType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add($options["autocomplete_name"], TextType::class, [
                "label" => false,
                "attr" => [
                    "class" => "input-autocomplete",
                    "data-url" => $options["data_url"],
                    "autocomplete" => "off"
                ],
                "mapped" => false
            ])
            ->add($options["autocomplete_name"] . "_id", HiddenType::class, [
                "mapped" => false
            ]);
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            "autocomplete_name" => null,
            "data_url" => null,
        ]);
    }
}
