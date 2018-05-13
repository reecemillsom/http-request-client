"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var chai_1 = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var CacheMock_1 = require("../../Cache/CacheMock");
var NodeCacheMock_1 = require("../../Cache/NodeCache/NodeCacheMock");
var XMLHttpRequestMock_1 = require("../../XMLHttpRequestFactory/XMLHttpRequest/XMLHttpRequestMock");
var XMLHttpRequestFactoryMock_1 = require("../../XMLHttpRequestFactory/XMLHttpRequestFactoryMock");
var GetRequest_1 = require("./GetRequest");
chai.use(sinonChai);
describe("GetRequest", function () {
    var cacheMock, xmlHttpRequestFactoryMock, getRequest, sandbox = sinon.sandbox.create();
    beforeEach(function () {
        var nodeCacheMock = new NodeCacheMock_1.NodeCacheMock();
        cacheMock = new CacheMock_1.CacheMock(nodeCacheMock);
        xmlHttpRequestFactoryMock = new XMLHttpRequestFactoryMock_1.XMLHttpRequestFactoryMock(XMLHttpRequestMock_1.XMLHttpRequestMock);
        getRequest = new GetRequest_1.GetRequest(xmlHttpRequestFactoryMock, cacheMock);
    });
    describe("when asked to get", function () {
        describe("when no url is provided", function () {
            it("will return a rejection with appropriate message", function () {
                return getRequest.handleRequest("").catch(function (error) {
                    chai_1.expect(error).to.deep.equal({ error: "Please provide a url" });
                });
            });
        });
        describe("when url is provided", function () {
            var createXMLHttpSpy;
            beforeEach(function () {
                createXMLHttpSpy = sandbox.spy(xmlHttpRequestFactoryMock, "create");
            });
            describe("when key already exists in cache", function () {
                it("will return a promise with the stored value", function () {
                    cacheMock.exists = true;
                    return getRequest.handleRequest("mockurl/foobar").then(function (result) {
                        chai_1.expect(result).to.deep.equal({ a: 1, b: 2 });
                    });
                });
            });
            it("will create a new instance of the XMLHttpFactory", function () {
                xmlHttpRequestFactoryMock.xmlHttp.readyState = 4;
                xmlHttpRequestFactoryMock.xmlHttp.status = 200;
                xmlHttpRequestFactoryMock.xmlHttp.responseText = '[{ "foo": "bar" }]';
                return getRequest.handleRequest("mockurl/foobar").then(function () {
                    chai_1.expect(createXMLHttpSpy).to.have.callCount(1);
                });
            });
            describe("when get request is sent", function () {
                describe("if request is done and response status is not 200", function () {
                    it("will return a rejection with appropriate message", function () {
                        xmlHttpRequestFactoryMock.xmlHttp.readyState = 4;
                        xmlHttpRequestFactoryMock.xmlHttp.status = 400;
                        return getRequest.handleRequest("mockurl/foobar").catch(function (error) {
                            chai_1.expect(error).to.deep.equal({ error: "Request didn't come back valid" });
                        });
                    });
                });
                describe("if request is done and response status is 200", function () {
                    describe("if JSON is invalid", function () {
                        it("will return a error response", function () {
                            xmlHttpRequestFactoryMock.xmlHttp.readyState = 4;
                            xmlHttpRequestFactoryMock.xmlHttp.status = 200;
                            xmlHttpRequestFactoryMock.xmlHttp.responseText = '[{ "foo" "bar" }]';
                            return getRequest.handleRequest("mockurl/foobar").catch(function (error) {
                                chai_1.expect(error).to.be.a.instanceOf(SyntaxError);
                            });
                        });
                    });
                    describe("if JSON is valid", function () {
                        var setSpy;
                        beforeEach(function () {
                            setSpy = sinon.spy(cacheMock, "set");
                        });
                        it("will store the result in cache", function () {
                            xmlHttpRequestFactoryMock.xmlHttp.readyState = 4;
                            xmlHttpRequestFactoryMock.xmlHttp.status = 200;
                            xmlHttpRequestFactoryMock.xmlHttp.responseText = '[{ "foo": "bar" }]';
                            return getRequest.handleRequest("mockurl/foobar").then(function (result) {
                                chai_1.expect(setSpy).to.have.been.calledWith("mockurl/foobar", [{ foo: 'bar' }]);
                            });
                        });
                        it("will return a valid response JSON", function () {
                            xmlHttpRequestFactoryMock.xmlHttp.readyState = 4;
                            xmlHttpRequestFactoryMock.xmlHttp.status = 200;
                            xmlHttpRequestFactoryMock.xmlHttp.responseText = '[{ "foo": "bar" }]';
                            return getRequest.handleRequest("mockurl/foobar").then(function (response) {
                                chai_1.expect(response).to.deep.equal([{ foo: "bar" }]);
                            });
                        });
                    });
                });
            });
        });
    });
});
