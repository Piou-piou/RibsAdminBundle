<?php

namespace Ribs\RibsAdminBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle;

class RibsAdminBundle extends Bundle
{
	public function getParent()
	{
		return 'FOSUserBundle';
	}
}
