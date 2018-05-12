"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NodeCacheMock = (function () {
    function NodeCacheMock() {
        this.cache = {};
    }
    NodeCacheMock.prototype.get = function (key) {
        return this.cache[key];
    };
    NodeCacheMock.prototype.set = function (key, value) {
        this.cache[key] = value;
    };
    return NodeCacheMock;
}());
exports.NodeCacheMock = NodeCacheMock;
