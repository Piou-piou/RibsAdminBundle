<?php

namespace PiouPiou\RibsAdminBundle\Service;

class Globals
{
	/**
	 * @param string|null $package
	 * @return string
	 */
	public function getBaseBundlePath(string $package = "piou-piou/ribs-admin-bundle"): string
	{
		$path = explode("/", __DIR__);
		array_pop($path);
		
		return implode("/", $path)."/../../" . $package;
	}
}