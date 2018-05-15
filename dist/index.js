"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NodeCache = require("node-cache");
var Cache_1 = require("./src/Cache/Cache");
var DeleteRequest_1 = require("./src/Request/DeleteRequest/DeleteRequest");
var FetchRequest_1 = require("./src/Request/FetchRequest/FetchRequest");
var GetRequest_1 = require("./src/Request/GetRequest/GetRequest");
var PostRequest_1 = require("./src/Request/PostRequest/PostRequest");
var PutRequest_1 = require("./src/Request/PutRequest/PutRequest");
var RequestFactory_1 = require("./src/RequestFactory/RequestFactory");
var XMLHttpRequestFactory_1 = require("./src/XMLHttpRequestFactory/XMLHttpRequestFactory");
var nodeCache = new NodeCache({ stdTTL: 43200, checkperiod: 300 }), cache = new Cache_1.Cache(nodeCache), factory = new XMLHttpRequestFactory_1.XMLHttpRequestFactory(XMLHttpRequest), requestFactory = new RequestFactory_1.RequestFactory(Request), get = new GetRequest_1.GetRequest(factory, cache), post = new PostRequest_1.PostRequest(factory, cache), put = new PutRequest_1.PutRequest(factory, cache), del = new DeleteRequest_1.DeleteRequest(factory, cache), fetch = new FetchRequest_1.FetchRequest(requestFactory, window, cache);
exports.get = get;
exports.post = post;
exports.put = put;
exports.del = del;
exports.fetch = fetch;
