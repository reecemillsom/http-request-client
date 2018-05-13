"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cache = (function () {
    function Cache(nodeCache) {
        this.nodeCache = nodeCache;
    }
    Cache.prototype.set = function (key, value) {
        return this.nodeCache.set(key, value);
    };
    Cache.prototype.get = function (key) {
        return this.nodeCache.get(key);
    };
    return Cache;
}());
exports.Cache = Cache;
