"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CacheMock = (function () {
    function CacheMock(cache) {
        this.cache = cache;
        this.exists = false;
    }
    CacheMock.prototype.get = function () {
        if (this.exists) {
            return { a: 1, b: 2 };
        }
        return;
    };
    CacheMock.prototype.set = function () {
        console.log("args>", arguments);
    };
    return CacheMock;
}());
exports.CacheMock = CacheMock;
