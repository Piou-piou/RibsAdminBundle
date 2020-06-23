<?php

namespace PiouPiou\RibsAdminBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * UserLogs
 *
 * @ORM\Table(name="user_logs", indexes={@ORM\Index(name="fk_user_infos_user_idx", columns={"user_id"})})
 * @ORM\Entity
 * @ORM\EntityListeners({"PiouPiou\RibsAdminBundle\EventListener\CreateUpdateAwareListener"})
 */
class UserLogs
{
    use CreatedUpdatedTrait;

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false, options={"unsigned"=true})
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private $id;

    /**
     * @var User
     *
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     * @ORM\OneToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     * })
     */
    private $user;

    /**
     * @var string
     *
     * @ORM\Column(name="method", type="string", length=255, nullable=false)
     */
    private $method;

    /**
     * @var string
     *
     * @ORM\Column(name="url", type="string", length=255, nullable=false)
     */
    private $url;

    /**
     * @var string
     *
     * @ORM\Column(name="equest_parameters", type="text", nullable=true)
     */
    private $request_parameters;

    /**
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param int $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return User
     */
    public function getUser(): User
    {
        return $this->user;
    }

    /**
     * @param \User $user
     */
    public function setUser($user)
    {
        $this->user = $user;
    }

    /**
     * @return string
     */
    public function getMethod(): string
    {
        return $this->method;
    }

    /**
     * @param string $method
     * @return UserLogs
     */
    public function setMethod(string $method): UserLogs
    {
        $this->method = $method;

        return $this;
    }

    /**
     * @return string
     */
    public function getUrl(): string
    {
        return $this->url;
    }

    /**
     * @param string $url
     * @return UserLogs
     */
    public function setUrl(string $url): UserLogs
    {
        $this->url = $url;

        return $this;
    }

    /**
     * @return string
     */
    public function getRequestParameters(): string
    {
        return $this->request_parameters;
    }

    /**
     * @param string $request_parameters
     * @return UserLogs
     */
    public function setRequestParameters(string $request_parameters): UserLogs
    {
        $this->request_parameters = $request_parameters;

        return $this;
    }
}

