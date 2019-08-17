<?php

namespace Drupal\marvelcomicsapi\Service;

use Drupal\Core\DrupalKernel;
use Drupal\Core\Site\Settings;
use GuzzleHttp\Exception\GuzzleException;
use Symfony\Component\HttpFoundation\Request;
use GuzzleHttp\Client;

/**
 * A simple example of a Drupal 8 service.
 *
 * Usage:
 *
 * $service = \Drupal::service('marvelcomicsapi_service');
 * $response = $service->request();
 * print_r(json_decode($response->getBody(), true));
 *
 */
class MarvelComicsAPIService {

  function __construct() {
    $settings = \Drupal::config('marvelcomicsapi.settings');
    $this->ts = strval(time());
    $this->pub = $settings->get('public_key');
    $this->priv = $settings->get('private_key');
    $this->client = new Client();
  }

  public function request($character) {
    $client = new Client();
    $response = $client->request('GET', 'https://gateway.marvel.com:443/v1/public/characters', [
      'query' => [
        'ts' => $this->ts,
        'apikey' => $this->pub,
        'hash' => $this->generateHash(),
        'name' => $character,
        'orderBy' => 'name'
      ]
    ]);
    return $response;
  }

  /**
   * Get a Marvel Comics Character by Name and return a JSON object
   *
   * @param string $character Name of a Marvel Comics character to be requested
   * @return object
   * @throws GuzzleException
   */
  public function getCharacterByName($character) {
    $response = $this->client->request('GET', 'https://gateway.marvel.com:443/v1/public/characters', [
      'query' => [
        'ts' => $this->ts,
        'apikey' => $this->pub,
        'hash' => $this->generateHash(),
        'name' => $character,
        'orderBy' => 'name'
      ]
    ]);
    return $response;
  }

  /**
   * Compare 2 Marvel Comics characters
   *
   * @param string $character1
   * @param string $character2
   * @return object
   * @throws GuzzleException
   */
  public function compareCharacters($character1, $character2) {
    //
    $response = $this->client->request('GET', 'https://gateway.marvel.com:443/v1/public/comics', [
      'query' => [
        'sharedAppearances' => $character1 . "," . $character2,
        'ts' => $this->ts,
        'apikey' => $this->pub,
        'hash' => $this->generateHash(),
        'orderBy' => '-focDate'
      ]
    ]);
    return $response;
  }

  /**
   * Returns an MD5 Hash String
   */
  private function generateHash() {
    $str = $this->ts . $this->priv . $this->pub;
    return md5($str);
  }
}
