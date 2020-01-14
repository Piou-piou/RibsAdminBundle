<?php

namespace PiouPiou\RibsAdminBundle\Command;

use Doctrine\ORM\EntityManagerInterface;
use PiouPiou\RibsAdminBundle\Entity\Account;
use PiouPiou\RibsAdminBundle\Entity\User;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class CreateAdminCommand extends Command
{
    /** @var EntityManagerInterface */
    private $em;

    /** @var UserPasswordEncoderInterface */
    private $passwordEncoder;

    /**
     * CreateAdminCommand constructor.
     * @param EntityManagerInterface $em
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @param string|null $name
     */
    public function __construct(EntityManagerInterface $em, UserPasswordEncoderInterface $passwordEncoder, string $name = null)
    {
        parent::__construct($name);
        $this->em = $em;
        $this->passwordEncoder = $passwordEncoder;
    }

    protected function configure()
    {
        $this
            ->setName('ribsadmin:create-admin')
            ->setDescription('Create an admin in ribs admin')
            ->addArgument(
                'firstname',
                InputArgument::REQUIRED,
                'Firstname of admin to create'
            )
            ->addArgument(
                'lastname',
                InputArgument::REQUIRED,
                'Lastname of admin to create'
            )
            ->addArgument(
                'email',
                InputArgument::REQUIRED,
                'email of admin to create'
            )
            ->addArgument(
                'password',
                InputArgument::REQUIRED,
                'password of admin to create'
            )
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $firstname = $input->getArgument('firstname');
        $lastname = $input->getArgument('lastname');
        $email = $input->getArgument('email');
        $password = $input->getArgument('password');

        $output->writeln("Create admin " . $firstname . " " . $lastname);

        $user = new User();
        $user->setFirstname($firstname);
        $user->setLastname($lastname);
        $user->setAccessRights("*");
        $this->em->persist($user);

        $account = new Account();
        $temp_password = $this->passwordEncoder->encodePassword($account, $password);
        $account->setPassword($temp_password);
        $account->setUser($user);
        $account->setEmail($email);
        $account->setUsername(substr($firstname, 0, 1).".".$lastname);
        $this->em->persist($account);

        $this->em->flush();

        $output->writeln("End Create admin " . $firstname . " " . $lastname);
    }
}
