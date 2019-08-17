<?php

namespace Drupal\marvelcomicsapi\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;

/**
 *
 */
class MarvelComicsAPIJsonController {

  /**
   * Callback for the API.
   */
  public function returnJson() {
    $service = \Drupal::service('marvelcomicsapi_service');
    $type = $_GET["type"] ?? 'type';

    switch ($type) {
      case 'characters':
        $character = $_GET["character"] ?? 'Captain America';
        $response = $service->getCharacterByName($character);
        break;
      case 'comics':
        $character1 = $_GET["char1"] ?? '1009471';
        $character2 = $_GET["char2"] ?? '1009189';
        $response = $service->compareCharacters($character1, $character2);
        break;
      default:
        $response = '{"data":"no data"}';
        break;
    }

    return new JsonResponse([
      'data' => json_decode($response->getBody(), true),
      'method' => 'GET',
    ]);
  }

}
