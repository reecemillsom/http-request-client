"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var XMLHttpRequestMock = (function () {
    function XMLHttpRequestMock() {
    }
    XMLHttpRequestMock.prototype.open = function (method, url, async) {
    };
    XMLHttpRequestMock.prototype.setRequestHeader = function (header, value) {
    };
    XMLHttpRequestMock.prototype.getAllResponseHeaders = function () {
        return this.headers;
    };
    XMLHttpRequestMock.prototype.send = function () {
        this.onload();
    };
    XMLHttpRequestMock.prototype.onload = function () {
    };
    return XMLHttpRequestMock;
}());
exports.XMLHttpRequestMock = XMLHttpRequestMock;
