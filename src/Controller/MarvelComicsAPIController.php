<?php
/**
 * @file
 * Contains \Drupal\marvelcomicsapi\Controller\MarvelComicsAPIController.
 *
 *
 */
namespace Drupal\marvelcomicsapi\Controller;

use Drupal\Core\Controller\ControllerBase;

class MarvelComicsAPIController extends ControllerBase {

  /**
   * The Construct
   */
  public function __construct() {
    $this->base_library = 'marvelcomicsapi/base';
  }

  /**
   *
   */
  public function finder()  {
    return array(
      '#theme' => 'finder',
      '#description' => 'Find a Marvel Character and learn more about them.',
      '#attached' => array(
        'library' => array(
          $this->base_library,
          'marvelcomicsapi/finder'
        ),
      )
    );
  }

  /**
   *
   */
  public function comparison()  {
    return array(
      '#theme' => 'comparison',
      '#summary' => 'Are these characters best friends forever!?',
      '#description' => 'Find two Marvel Comics characters and check to see how many comicbooks where they have shared appearances together.',
      '#attached' => array(
        'library' => array(
          $this->base_library,
          'marvelcomicsapi/comparison'
        ),
      )
    );
  }
}
