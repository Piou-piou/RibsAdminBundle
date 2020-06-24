<?php

namespace PiouPiou\RibsAdminBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

trait GuidTrait
{
    /**
     * @var string
     *
     * @ORM\Column(name="guid", type="string", length=255, nullable=true)
     */
    private $guid;

    /**
     * @return string
     */
    public function getGuid()
    {
        return $this->guid;
    }

    /**
     * @param string $guid
     */
    public function setGuid($guid)
    {
        $this->guid = $guid;
    }
}
