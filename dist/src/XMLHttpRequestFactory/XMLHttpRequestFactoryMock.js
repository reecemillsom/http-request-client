"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var XMLHttpRequestFactoryMock = (function () {
    function XMLHttpRequestFactoryMock(XMLHttpRequest) {
        this.XMLHttpRequest = XMLHttpRequest;
        this.xmlHttp = new this.XMLHttpRequest();
    }
    XMLHttpRequestFactoryMock.prototype.create = function () {
        return this.xmlHttp;
    };
    return XMLHttpRequestFactoryMock;
}());
exports.XMLHttpRequestFactoryMock = XMLHttpRequestFactoryMock;
