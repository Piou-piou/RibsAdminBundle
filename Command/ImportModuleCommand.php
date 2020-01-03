<?php

namespace PiouPiou\RibsAdminBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class ImportModuleCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName('ribsadmin:import-module')
            ->setDescription('Import a module in ribs admin')
            ->addArgument(
                'package-name',
                InputArgument::REQUIRED,
                'Name of composer package to import'
            )
            /*->addOption(
                'yell',
                null,
                InputOption::VALUE_NONE,
                'If set, the task will yell in uppercase letters'
            )*/
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $pacakge_name = $input->getArgument('package-name');

        /*$name = $input->getArgument('name');
        if ($name) {
            $text = 'Hello '.$name;
        } else {
            $text = 'Hello';
        }

        if ($input->getOption('yell')) {
            $text = strtoupper($text);
        }*/

        $output->writeln("Houra ! -- " . $pacakge_name);
    }
}
