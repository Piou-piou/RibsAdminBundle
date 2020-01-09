<?php

namespace PiouPiou\RibsAdminBundle;

use PiouPiou\RibsAdminBundle\DependencyInjection\RibsAdminExtension;
use Symfony\Component\HttpKernel\Bundle\Bundle;

class RibsAdminBundle extends Bundle
{
    public function getContainerExtension()
    {
        return new RibsAdminExtension();
    }
}
