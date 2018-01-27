<?php

namespace PiouPiou\RibsAdminBundle\Tests\Controller;

use Symfony\Bundle\RibsAdminBundle\Test\WebTestCase;

class DefaultControllerTest extends WebTestCase
{
    public function testIndex()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/');

        $this->assertContains('Hello World', $client->getResponse()->getContent());
    }
}
