<?php

namespace App\Service;

use \Firebase\JWT\JWT as JsonWebToken;

class Jwt
{
	/**
	 * @param array $values
	 * @param string $token
	 * @return string
	 * encode an array in jwt
	 */
	public function encode(array $values, string $token)
	{
		return JsonWebToken::encode($values, $token);
	}
	
	/**
	 * @param string $encoded_json
	 * @param string $token
	 * @return bool|object
	 * encode a jwt in array
	 */
	public function decode(string $encoded_json, string $token)
	{
		$decoded = JsonWebToken::decode($encoded_json, $token, ['HS256']);
		
		if ($decoded) {
			return $decoded;
		}
		
		return false;
	}
}
