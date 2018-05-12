"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var Cache_1 = require("./Cache");
var NodeCacheMock_1 = require("./NodeCache/NodeCacheMock");
describe("Cache", function () {
    var nodeCacheMock, cache;
    beforeEach(function () {
        nodeCacheMock = new NodeCacheMock_1.NodeCacheMock();
        cache = new Cache_1.Cache(nodeCacheMock);
    });
    describe("when asked to execute", function () {
        describe("when key already exists in cache", function () {
            it("will return the value in cache", function () {
                nodeCacheMock.set("url", "value");
                chai_1.expect(cache.get("url")).to.equal("value");
            });
        });
        describe("when key doesn't exist in cache", function () {
            it("will set the value in cache", function () {
                cache.set("url", "value");
                chai_1.expect(nodeCacheMock.cache["url"]).to.equal("value");
            });
        });
    });
});
