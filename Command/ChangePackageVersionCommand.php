<?php

namespace PiouPiou\RibsAdminBundle\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class ChangePackageVersionCommand extends Command
{
    protected function configure()
    {
        $this
            ->setName('ribsadmin:change-package-version')
            ->setDescription('Change a package version')
            ->addArgument(
                'package-name',
                InputArgument::REQUIRED,
                'Name of composer package to import with version (example : piou/piou/test-bundle:1.0.0)'
            )
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $fs = new Filesystem();
        $cd = "";

        if (!$fs->exists("composer.json") && $fs->exists("index.php")) {
            $cd = "cd .. && ";
        }

        $package_name = $input->getArgument('package-name');
        $output->writeln("Start composer require " . $package_name);

        $process = Process::fromShellCommandline($cd . "chmod 777 composer.json");
        $process->run(function ($type, $buffer) {
            echo $buffer;
        });

        $process = Process::fromShellCommandline($cd . "composer require " . $package_name);
        $process->run(function ($type, $buffer) {
            echo $buffer;
        });

        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        $process = Process::fromShellCommandline($cd . "chmod 644 composer.json");
        $process->run(function ($type, $buffer) {
            echo $buffer;
        });

        $output->writeln("Change version of " . $package_name . " is finished.");

        return 0;
    }
}
