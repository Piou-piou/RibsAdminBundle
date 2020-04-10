<?php

namespace PiouPiou\RibsAdminBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Entity\AccountToken
 *
 * @ORM\Entity(repositoryClass="PiouPiou\RibsAdminBundle\Repository\AccountTokenRepository")
 * @ORM\Table(name="`account_token`",
 *     indexes = {
 *          @ORM\Index(name="fk_user_token_account_idx", columns={"account_id"})
 *     })
 */
class AccountToken
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="string", length=200)
     */
    protected $token;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    protected $endToken;

    /**
     * @ORM\Column(type="string", length=200)
     */
    protected $userAgent;

    /**
     * @ORM\Column(type="string", length=200)
     */
    protected $ip;

    /**
     * @ORM\ManyToOne(targetEntity="Account", inversedBy="tokens")
     * @ORM\JoinColumn(name="account_id", referencedColumnName="id", nullable=false)
     */
    protected $account;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     * @return AccountToken
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getToken()
    {
        return $this->token;
    }

    /**
     * @param mixed $token
     * @return AccountToken
     */
    public function setToken($token)
    {
        $this->token = $token;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getEndToken()
    {
        return $this->endToken;
    }

    /**
     * @param mixed $endToken
     * @return AccountToken
     */
    public function setEndToken($endToken)
    {
        $this->endToken = $endToken;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getUserAgent()
    {
        return $this->userAgent;
    }

    /**
     * @param mixed $userAgent
     * @return AccountToken
     */
    public function setUserAgent($userAgent)
    {
        $this->userAgent = $userAgent;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getIp()
    {
        return $this->ip;
    }

    /**
     * @param mixed $ip
     * @return AccountToken
     */
    public function setIp($ip)
    {
        $this->ip = $ip;

        return $this;
    }

    /**
     * Set Account entity (many to one).
     *
     * @param Account $account
     * @return AccountToken
     */
    public function setAccount(Account $account = null)
    {
        $this->account = $account;

        return $this;
    }

    /**
     * Get Account entity (many to one).
     *
     * @return Account
     */
    public function getAccount()
    {
        return $this->account;
    }
}
