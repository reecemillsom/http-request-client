"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var XMLHttpRequestFactory = (function () {
    function XMLHttpRequestFactory(xmlHttpRequest) {
        this.xmlHttpRequest = xmlHttpRequest;
    }
    XMLHttpRequestFactory.prototype.create = function () {
        return new this.xmlHttpRequest();
    };
    return XMLHttpRequestFactory;
}());
exports.XMLHttpRequestFactory = XMLHttpRequestFactory;
