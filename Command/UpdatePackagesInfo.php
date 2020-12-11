<?php


namespace PiouPiou\RibsAdminBundle\Command;

use Doctrine\ORM\EntityManagerInterface;
use PiouPiou\RibsAdminBundle\Entity\Package;
use PiouPiou\RibsAdminBundle\Service\Version;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class UpdatePackagesInfo extends Command
{
    /**
     * @var EntityManagerInterface
     */
    private $em;

    /**
     * @var Version
     */
    private $version;

    /**
     * ImportModuleCommand constructor.
     * @param EntityManagerInterface $em
     * @param Version $version
     * @param string|null $name
     */
    public function __construct(EntityManagerInterface $em, Version $version, string $name = null)
    {
        parent::__construct($name);
        $this->em = $em;
        $this->version = $version;
    }

    protected function configure()
    {
        $this
            ->setName('ribsadmin:update-packages-info')
            ->setDescription('Update all packages versions informatio')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $packages = $this->em->getRepository(Package::class)->findAll();

        /** @var Package $package */
        foreach ($packages as $package) {
            $output->writeln("Update ".$package->getPackageName()." info");
            $this->version->save($package->getGuid());
        }

        return 0;
    }
}
