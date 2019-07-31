"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var ResponseType;
(function (ResponseType) {
    ResponseType["ArrayBuffer"] = "arraybuffer";
    ResponseType["Blob"] = "blob";
    ResponseType["Document"] = "document";
    ResponseType["Json"] = "json";
    ResponseType["Text"] = "text";
})(ResponseType = exports.ResponseType || (exports.ResponseType = {}));
var Request = (function () {
    function Request(xmlHttpRequestFactory) {
        this.xmlHttpRequestFactory = xmlHttpRequestFactory;
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
