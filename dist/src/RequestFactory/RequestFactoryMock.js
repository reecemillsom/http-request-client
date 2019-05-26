"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestFactoryMock = (function () {
    function RequestFactoryMock(Request) {
        this.Request = Request;
        this.request = new this.Request();
    }
    RequestFactoryMock.prototype.create = function () {
        return this.request;
    };
    return RequestFactoryMock;
}());
exports.RequestFactoryMock = RequestFactoryMock;
