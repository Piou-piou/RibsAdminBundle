<?php

namespace PiouPiou\RibsAdminBundle\Service;

use Symfony\Component\DependencyInjection\ContainerInterface;

class Globals
{
	/**
	 * @var ContainerInterface
	 */
	private $container;

    /**
     * Globals constructor.
     * @param ContainerInterface $container
     */
    public function __construct(ContainerInterface $container)
	{
		$this->container = $container;
	}
	
	/**
	 * this method send path on dev mode to correct write package name
	 * @param string $package
	 * @return string
	 */
	private function getPackageDevName(string $package) {
		$bundle = explode("/", $package)[1];
		$explode = explode("-", $bundle);
		
		$package_name = "";
		
		foreach ($explode as $string) {
			$package_name .= ucfirst($string);
		}
		
		return $package_name;
	}

    /**
     * this method send base bundle path related to ribs-admin
     * @param string|null $package
     * @param bool $dev_mode
     * @return string
     */
	public function getBaseBundlePath(string $package = "piou-piou/ribs-admin-bundle", bool $dev_mode = false): string
	{
		$path = explode("/", __DIR__);
		array_pop($path);

        $dev_mode = $package === "piou-piou/ribs-admin-bundle" ? $this->container->getParameter("ribs_admin")["dev_mode"] : $dev_mode;

		if ($dev_mode === true) {
			$package = "lib/".$this->getPackageDevName($package);
		}
		
		return implode("/", $path)."/../../" . $package;
	}
}
