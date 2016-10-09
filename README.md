## Bayonet
Bayonet enables companies to feed and consult a global database about online consumers’ reputation, based on historic payments. Start making smarter business decisions today.

### Introduction
Bayonet’s API is organized around REST and exposes endpoints for HTTP requests. It is designed to have predictable, resource-oriented URLs and uses standard HTTP response codes to indicate the outcome of operations. Request and response payloads are formatted as JSON.

### About the service
Bayonet provides an Ecosystem of Trust and Protection where companies can colaborate with each other to combat online fraud together. We provide a secure platform to share and consult data to understand when a consumer is related to fraudulent activity or has a fraud-free record. Different technologies that run algorithms to link parameters seen in different transactions, fed by companies connected to the ecosystem are employed in order to build consumer profiles. By consulting Bayonet’s API, a response with data provided by companies themselves is available in real-time for your risk assesment process to analyze it and take better decisions.

### Bayonet's API details
To know more about Bayonet's API and its domain and technical details, please see the "Integration Specs V 1.0" document provided by the Bayonet team.

## Getting started
To use this SDK, please make sure:
  * You have [NodeJS](https://nodejs.org/en/) installed on your system.
  * You have an API KEY (sandbox and/or live) provided by Bayonet's team.
  * Install the 'bayonet-js-sdk' module on your system
  
    ```sh
    npm install bayonet-js-sdk
    ```
  * Add dependency 'bayonet-js-sdk' in your package.json file.
  * Require 'bayonet-js-sdk' in your file

    ```js
    var bayonet = require('bayonet-js-sdk');
    ```
  * Create config options, with parameters (api_key).

    ```js
    bayonet.configure({
      'api_key': '011RR5BdHEEF2RNSmha42SDQ6sYRL9TM'
    });
    ```
  * You can use environment vars too.

    ```sh
    export BAYONET_API_KEY=011RR5BdHEEF2RNSmha42SDQ6sYRL9TM
    ```
  
