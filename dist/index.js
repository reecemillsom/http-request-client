"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NodeCache = require("node-cache");
var Cache_1 = require("./src/Cache/Cache");
var DeleteRequest_1 = require("./src/Request/DeleteRequest/DeleteRequest");
var FetchRequest_1 = require("./src/Request/FetchRequest/FetchRequest");
var GetRequest_1 = require("./src/Request/GetRequest/GetRequest");
var HeadRequest_1 = require("./src/Request/HeadRequest/HeadRequest");
var PostRequest_1 = require("./src/Request/PostRequest/PostRequest");
var PutRequest_1 = require("./src/Request/PutRequest/PutRequest");
var RequestFactory_1 = require("./src/RequestFactory/RequestFactory");
var XMLHttpRequestFactory_1 = require("./src/XMLHttpRequestFactory/XMLHttpRequestFactory");
function initialiseRequests(cacheOptions) {
    var nodeCache = initialiseCache(cacheOptions), cache = new Cache_1.Cache(nodeCache), factory = new XMLHttpRequestFactory_1.XMLHttpRequestFactory(XMLHttpRequest), requestFactory = new RequestFactory_1.RequestFactory(Request);
    return {
        get: new GetRequest_1.GetRequest(factory, cache),
        head: new HeadRequest_1.HeadRequest(factory),
        post: new PostRequest_1.PostRequest(factory),
        put: new PutRequest_1.PutRequest(factory),
        del: new DeleteRequest_1.DeleteRequest(factory),
        fetch: new FetchRequest_1.FetchRequest(requestFactory, window, cache)
    };
}
exports.initialiseRequests = initialiseRequests;
function initialiseCache(cacheOptions) {
    if (cacheOptions) {
        return new NodeCache(cacheOptions);
    }
    return new NodeCache();
}
