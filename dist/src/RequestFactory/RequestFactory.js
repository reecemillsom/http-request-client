"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestFactory = (function () {
    function RequestFactory(request) {
        this.request = request;
    }
    RequestFactory.prototype.create = function (url, options) {
        return new this.request(url, options);
    };
    return RequestFactory;
}());
exports.RequestFactory = RequestFactory;
