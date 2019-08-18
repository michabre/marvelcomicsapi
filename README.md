# Marvel Comics API Module

A Drupal 8 module for connecting with the Marvel Comics API.

## Getting Started

Since this is only an experimental project and is to be used at your own risk, this will need to be installed manually or cloned into the modules directory of your Drupal installation. Once added, it can be activated as you would a typical Drupal 8 module on the Extend page.

Under **Configuration->Development->Marvel Comics API**, you can add your Public and Private Keys given to you upon setting up an account with the [Marvel Comics Developer Portal](https://developer.marvel.com/).

Once added, you can visit: {site-url}/marvelcomicsapi/shared to verify its possible to retrieve information on single Marvel Comics characters and comparing two characters to view how many comics they have appeared together in.

If you have the [Devel PHP](https://www.drupal.org/project/devel_php) module installed, you can quickly verify by executing the following:

```PHP
$service = \Drupal::service('marvelcomicsapi_service');
$response = $service->request('Captain America');
print_r(json_decode($response->getBody(), true));
```
If all goes well, you should see a large JSON object containing information about Captain America.

### !!! Warning !!!

The current version relies heavily on [Bulma](https://bulma.io/) for styling and layout. I was working on this while developing a Bulma based Drupal 8 theme. Apologies.

### Demo

Working version can be viewed here: [TrendSurferz/MarvelComicsAPI](http://trendsurferz.com/marvelcomicsapi/shared)

### Purpose

The purpose of this project is to create a collection of Marvel Comics API Services that can be accessed by other Drupal 8 modules that wish to interact with and request data from Marvel Comics about characters, comic series, events, crossovers, creators, etc.

## References

* [Marvel Comics API](https://developer.marvel.com/documentation/generalinfo) - a RESTful service which provides methods for accessing specific resources at canonical URLs and for searching and filtering sets of resources by various criteria.
* [GuzzleHttp](https://github.com/guzzle/guzzle) - an extensible PHP HTTP client
* [CryptoJS](https://cryptojs.gitbook.io/docs/) - JavaScript implementations of standard and secure cryptographic algorithms

## Authors

* **Michael C. Breuer** - *Initial work* - [michabre](https://github.com/michabre)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
