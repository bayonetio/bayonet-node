"use strict";

module.exports = function () {
    function configure(options) {
        console.log('API Configuration', options);
    }

    return {
        configure: configure
    };
};