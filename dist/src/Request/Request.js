"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var Request = (function () {
    function Request(xmlHttpRequestFactory, cache) {
        this.xmlHttpRequestFactory = xmlHttpRequestFactory;
        this.cache = cache;
    }
    Request.prototype.setRequestHeaders = function (xmlHttpRequest, headers) {
        _.each(headers, function (value, key) {
            xmlHttpRequest.setRequestHeader(key, value);
        });
    };
    Request.prototype.isRequestSuccessful = function (xmlHttpRequest) {
        var statusCode = xmlHttpRequest.status;
        return xmlHttpRequest.readyState === 4 && (statusCode >= 200 && statusCode < 400);
    };
    return Request;
}());
exports.Request = Request;
