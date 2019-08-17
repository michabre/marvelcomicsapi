/**
 * Helper Functions
 */
(function (window, document, $, undefined) {
  $.extend(Drupal.theme, {

    /**
     * Return a list item
     *
     * @param {string} text
     * @param {string} item
     * @returns {string}
     *
     * Usage: Drupal.theme('createListItem', text, item);
     *
     */
    createListItem: (text, item) => {
      if (item) {
        return '<li><span class="tag is-medium">' + text + '</span><span class="tag is-info is-medium">' + item + '</span></li>';
      } else {
        console.error('List item not created');
      }
    },

    /**
     * Fetches a JSON object of a single Marvel Comics character
     * and builds a string literal that is injected into a DOM element
     *
     * @param {object} element
     * @param {string} dataURL
     * @param {string} input
     * @returns {string}
     *
     * Usage: Drupal.theme('getCharacterData', element, dataURL, input);
     *
     */
    getCharacterData: (element, dataURL, input) => {
      fetch(dataURL)
        .then((response) => {
          return response.json();
        })
        .then((jsonObj) => {
          var json = JSON.parse(JSON.stringify(jsonObj));

          if (json['data'].data.total > 0) {
            $(element).html(`<div class="card"><div class="card-image">\n                <figure class="image is-square">\n                  <img src="${json['data'].data.results[0].thumbnail.path + '.' + json['data'].data.results[0].thumbnail.extension}" alt="${json['data'].data.results[0].name}">\n                </figure>\n                </div>\n                <div class="card-content">\n                  <div class="media">\n                    <div class="media-content">\n                        <p class="title is-4">${json['data'].data.results[0].name}</p>\n                        <p class="subtitle is-6">${json['data'].data.results[0].description}</p>\n                    </div>\n                    </div>\n                    <div class="content">\n                      <h4 class="is-marginless">Marvel Comicbook Appearances</h4>\n                      <ul>\n                        ${Drupal.theme('createListItem', 'Comics', json['data'].data.results[0].comics.available) || ''}\n                        ${Drupal.theme('createListItem', 'Series', json['data'].data.results[0].series.available) || ''}\n                        ${Drupal.theme('createListItem', 'Stories', json['data'].data.results[0].stories.available) || ''}\n                        ${Drupal.theme('createListItem', 'Events', json['data'].data.results[0].events.available) || ''}\n                      </ul>\n                      <br>\n                      <time class="is-size-7 has-text-weight-light">Last Modified: ${new Date(json['data'].data.results[0].modified)}</time>\n                    </div>\n                </div></div>`);

            $(input).attr('value', json['data'].data.results[0].id);

          } else {
            $(element).html('<p>No results found.</p>');
          }
        })
        .catch(error => {
          console.error('Error:', error)
        });
    },

    /**
     * Compare Two Characters
     *
     * @param {string} dataURL
     * @param {string} element
     * @returns {string}
     */
    getComparisonData: function (dataURL, element) {
      fetch(dataURL)
        .then((response) => {
          return response.json();
        })
        .then((jsonObj) => {
          const json = JSON.parse(JSON.stringify(jsonObj));

          if (json['data'].data.total > 0) {
            const results = json['data'].data.results;
            const completeList = results.map(item => {
              return '<li><a href="' + ((item.urls[0].type === 'detail') ? item.urls[0].url : '#') + '">' + item.title + '</a></li>';
            });

            $(element).html(`<h3 class="is-size-5 has-text-centered">Comics Most Recently Appeared In Together</h3>\n              <ul class="listing">${completeList.join('')}</ul>\n              <p class="is-size-4  has-text-centered">\n                <span class="has-text-weight-bold">Total</span> \n                <button type="button" class="button is-danger totalCount">${json['data'].data.total}</button>\n              </p>\n            `);
          } else {
            $(element).html('<p>No results found.</p>');
          }

        })
        .catch(error => {
          console.error('Error:', error)
        });
    }
  });
}(window, document, jQuery));
