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
  
    ```
    sh
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

## Usage
Once you have Bayonet's SDK configured, you can call the three APIs with the following syntax:
  * Consulting API
  
    ```js
    bayonet.api.consulting({
        "channel": "mpos",
        "email": "luisehk@gmail.com",
        "consumer_name": "Luis Herrada",
        "cardholder_name": "Luis Herrada",
        "payment_method": "card",
        "card_number": 4111111111111111,
        "transaction_amount": 320,
        "currency_code": "MXN",
        "transaction_time": 1476012879,
        "coupon": false,
        "payment_gateway": "stripe",
        "shipping_address" : {
            "address_line_1" : "Calle 123",
            "address_line_2" : "456",
            "city" : "Monterrey",
            "state" : "Nuevo León",
            "country" : "MX",
            "zip_code" : "64000"
        },
        ...
    });
    ```
  * Feedback API
  
    ```js
    bayonet.api.feedback({
        "transaction_status": "success",
        "transaction_id": "uhffytd65rds56yt",
        ...
    });
    ```
  * Feedback-historical API
  
    ```js
    bayonet.api.feedbackHistorical({
        "channel": "mpos",
        "type": "transaction",
        "email": "david@gmail.com",
        "consumer_name": "David Gilmour",
        "payment_method": "card",
        "card_number": 4929699022445935,
        "transaction_amount": 500,
        "currency_code": "USD",
        "transaction_time": 1423823404,
        "transaction_status": "bank_decline",
        "transaction_id": "uhffytd65rds56yt",
        "coupon": false,
        "payment_gateway": "stripe",
        "device_fingerprint": "AF567GHGJJJ87JH",
        "bank_auth_code": "5353888",
        "telephone": "5566768423",
        "expedited_shipping": false,
        "bank_decline_reason": "stolen_card",
        "shipping_address": {
            "address_line_1": "8100 Sunset Boulevard",
            "address_line_2": "Apt 6B",
            "city": "San Francisco",
            "state": "Sunnyvale",
            "country": "USA",
            "zip_code": "03257"
        }
        ...
    });
    ```
 
## Success and error handling
Bayonet's SDK supports [Promises](https://www.promisejs.org/) for success and error handling
```js
bayonet.api.consulting({
    ...
})
.then(function (parsedBody) {
    console.log('Success', parsedBody);
})
.catch(function (error) {
    console.log('Error', error);
});
```

For a full list of error codes and their messages, please see the "Integration Specs V 1.0" document provided by the Bayonet team.