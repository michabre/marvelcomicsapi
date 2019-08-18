<?php

/**
 * @file
 * Contains \Drupal\marvelcomicsapi\Form\MarvelComicsAPIForm.
 *
 *
 */

namespace Drupal\marvelcomicsapi\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Form builder for the Marvel Comics API module
 */
class MarvelComicsAPIForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'marvelcomicsapi_settings_form';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return ['marvelcomicsapi.settings'];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('marvelcomicsapi.settings');

    $form['description'] = array(
      '#type' => 'item',
      '#title' => 'Marvel Developer Account Info',
      '#markup' => t('Connect to the Marvel Comics API with the public and private keys associated with your account. To create an account, visit the <a href="https://developer.marvel.com/">Marvel Comics Developer Portal</a>. Be sure to read the <a href="https://developer.marvel.com/documentation/getting_started">Getting Started</a> section.')
    );

    $form['access_info'] = array(
      '#type' => 'details',
      '#title' => $this->t('Access Information'),
      '#open' => TRUE
    );

    $form['access_info']['public_key'] = array(
        '#type' => 'textfield',
        '#title' => $this->t('Public Key'),
        '#default_value' =>  $config->get('public_key'),
        '#description' => t('Please enter your public key.'),
    );

    $form['access_info']['private_key'] = array(
      '#type' => 'password',
      '#title' => $this->t('Private Key'),
      '#default_value' =>  $config->get('private_key'),
      '#description' => t('Please enter your private key.'),
    );

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    parent::submitForm($form, $form_state);
    $config = $this->config('marvelcomicsapi.settings');
    $config->set('public_key', $form_state->getValue('public_key'));
    $config->set('private_key', $form_state->getValue('private_key'));
    $config->save();
  }
}
