<?php

namespace Ribs\RibsAdminBundle\Service;

class Globals
{
	/**
	 * @return string
	 */
	public function getBaseBundlePath(): string
	{
		$path = explode("/", __DIR__);
		array_pop($path);
		
		return implode("/", $path);
	}
}