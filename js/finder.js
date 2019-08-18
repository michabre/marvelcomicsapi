/**
 *
 * version 0.1
 *
 */
(function ($, Drupal, drupalSettings) {

  "use strict";

  Drupal.behaviors.marvelcomicsapiFinder = {
    attach: function (context, settings) {
      $(window, context).once('marvelcomicsapiFinder').each(function () {
        // add code here to avoid being triggered every AJAX request
        const site_url = window.location.protocol + "//" + window.location.host;
        const requestUrl = site_url + '/marvelcomicsapi/json?type=characters&character=';
        const detailsSection = $('#marvelcomicsapi-finder .details');
        const input = '#find-marvelcomics-character input';

        //
        $('#find-marvelcomics-character button').on('click', function (event) {
          event.preventDefault();
          const name = $('#find-marvelcomics-character input').val();
          const request = requestUrl + name;
          Drupal.theme('getCharacterData', detailsSection, request, input);
        });
      });
    },
  };
})(jQuery, Drupal, drupalSettings);
