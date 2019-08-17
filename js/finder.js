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
            var requestUrl = window.location.protocol + '//' + window.location.hostname + drupalSettings.path.baseUrl + 'marvelcomicsapi/json';
            var detailsSection = $('#marvelcomicsapi-finder .details');

            //
            $('#find-marvelcomics-character button').on('click', function(event) {
                event.preventDefault();
                var name = $('#find-marvelcomics-character input').val();
                var request = requestUrl + '?character=' + name;

                console.log(request);
                Drupal.theme('fetchData', detailsSection, request);
            });
        });
      },
    };
  })(jQuery, Drupal, drupalSettings);