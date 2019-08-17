/**
 * Marvel Comics API
 * Character Comparison Application
 *
 * version 0.1
 *
 */
(function ($, Drupal, drupalSettings) {

    "use strict";

    Drupal.behaviors.marvelcomicsapiComparison = {
        attach: function (context, settings) {
            $(window, context).once('marvelcomicsapiComparison').each(function () {
                // add code here to avoid being triggered every AJAX request
                const site_url = window.location.protocol + "//" + window.location.host;

                // Get Character Data
                $('#marvelcomicsapi-comparison .get-character').on('click', function(event) {
                    event.preventDefault();
                    const requestUrl = site_url + '/marvelcomicsapi/json?type=characters';
                    const parent = '#' + $(this).parent().parent().attr('id');
                    const input = parent + ' .input.name';
                    const name = $(input).val();
                    const request = requestUrl + '&character=' + name;
                    const resultsSection = parent + ' .results';

                    // Progress Bar
                    $(resultsSection).html('<progress class="progress is-large is-info" max="100"></progress>');

                    // Request Character data
                    if(name) {
                        Drupal.theme('getCharacterData', resultsSection, request, input);
                    } else {
                        $(resultsSection).html('<p><span class="tag is-danger">!</span> Please enter a character name.</p>');
                    }

                });

                // Compare Characters
                $('#marvelcomicsapi-comparison .compare-characters').on('click', function(event) {
                    event.preventDefault();
                    const requestUrl =  site_url + '/marvelcomicsapi/json?type=comics';
                    const character1 = $('#characterOne .name').attr('value');
                    const character2 = $('#characterTwo .name').attr('value');
                    const request = requestUrl + '&char1=' + character1 + '&char2=' + character2;
                    const resultsSection = '#appearances .results';

                    // Progress bar
                    $(resultsSection).html('<progress class="progress is-large is-info" max="100"></progress>');

                    // Start Comparison
                    if(character1 && character2) {
                        Drupal.theme('getComparisonData', request, resultsSection);
                    } else {
                        $(resultsSection).html('<p><span class="tag is-danger">!</span> Insufficient number of characters for comparison.</p>');
                    }

                });
            });
        }
    };
})(jQuery, Drupal, drupalSettings);
