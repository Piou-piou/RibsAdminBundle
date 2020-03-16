<?php

namespace PiouPiou\RibsAdminBundle\Form\Type;

use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class AutocompleteType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add($options["autocomplete_name"], TextType::class, [
                "label" => false,
                "attr" => [
                    "class" => "input-autocomplete",
                    "data-url" => $options["data_url"]
                ],
                "mapped" => false
            ])
            ->add($options["autocomplete_name"]."_id", HiddenType::class, [
                "mapped" => false
            ]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            "autocomplete_name" => null,
            "data_url" => null,
        ]);
    }
}
