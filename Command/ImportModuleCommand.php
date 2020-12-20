<?php

namespace PiouPiou\RibsAdminBundle\Command;

use Doctrine\ORM\EntityManagerInterface;
use PiouPiou\RibsAdminBundle\Entity\Module;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class ImportModuleCommand extends Command
{
    private $em;

    /**
     * ImportModuleCommand constructor.
     * @param EntityManagerInterface $em
     * @param string|null $name
     */
    public function __construct(EntityManagerInterface $em, string $name = null)
    {
        parent::__construct($name);
        $this->em = $em;
    }

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
            ->addArgument(
                'module-name',
                InputArgument::REQUIRED,
                'Name of package to display in app'
            )
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $package_name = $input->getArgument('package-name');
        $output->writeln("Start composer require " . $package_name);

        $process = Process::fromShellCommandline("composer require " . $package_name);
        $process->run(function ($type, $buffer) {
            echo $buffer;
        });

        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        $output->writeln("End composer require " . $package_name);
        $output->writeln("Start insertion of module in database " . $package_name);

        $module = new Module();
        $module->setPackageName($package_name);
        $module->setTitle($input->getArgument('module-name'));
        $module->setActive(false);
        $module->setDisplayed(true);
        $this->em->persist($module);
        $this->em->flush();

        $output->writeln("Installation of " . $package_name . " is finished. You have now to configure this module in your administration interface");

        return 0;
    }
}
