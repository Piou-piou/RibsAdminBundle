<?php

namespace PiouPiou\RibsAdminBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * UserLogs
 *
 * @ORM\Table(name="user_logs", uniqueConstraints={@ORM\UniqueConstraint(name="guid_UNIQUE_user_log", columns={"guid"})}, indexes={@ORM\Index(name="fk_user_infos_user_idx", columns={"user_id"})})
 * @ORM\Entity(repositoryClass="PiouPiou\RibsAdminBundle\Repository\UserLogsRepository")
 * @ORM\EntityListeners({"PiouPiou\RibsAdminBundle\EventListener\GuidAwareListener", "PiouPiou\RibsAdminBundle\EventListener\CreateUpdateAwareListener"})
 */
class UserLogs
{
    use GuidTrait;
    use CreatedUpdatedTrait;

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="PiouPiou\RibsAdminBundle\Entity\User")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id", nullable=false)
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
     * @ORM\Column(name="route", type="string", length=255, nullable=false)
     */
    private $route;

    /**
     * @var string
     *
     * @ORM\Column(name="url", type="string", length=255, nullable=false)
     */
    private $url;

    /**
     * @var string
     *
     * @ORM\Column(name="full_url", type="string", length=255, nullable=false)
     */
    private $full_url;

    /**
     * @var string
     *
     * @ORM\Column(name="request_format", type="string", length=255, nullable=false)
     */
    private $request_format;

    /**
     * @var string
     *
     * @ORM\Column(name="equest_parameters", type="json", nullable=true)
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
    public function getRoute(): string
    {
        return $this->route;
    }

    /**
     * @param string $route
     * @return UserLogs
     */
    public function setRoute(string $route): UserLogs
    {
        $this->route = $route;

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
    public function getFullUrl(): string
    {
        return $this->full_url;
    }

    /**
     * @param string $full_url
     * @return UserLogs
     */
    public function setFullUrl(string $full_url): UserLogs
    {
        $this->full_url = $full_url;

        return $this;
    }

    /**
     * @return string
     */
    public function getRequestFormat(): string
    {
        return $this->request_format;
    }

    /**
     * @param string $request_format
     * @return UserLogs
     */
    public function setRequestFormat(string $request_format): UserLogs
    {
        $this->request_format = $request_format;

        return $this;
    }

    public function getRequestParameters()
    {
        return $this->request_parameters;
    }

    /**
     * @param $request_parameters
     * @return UserLogs
     */
    public function setRequestParameters($request_parameters): UserLogs
    {
        $this->request_parameters = $request_parameters;

        return $this;
    }
}

