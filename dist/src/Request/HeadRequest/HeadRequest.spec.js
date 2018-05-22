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
var HeadRequest_1 = require("./HeadRequest");
chai.use(sinonChai);
describe("HeadRequest", function () {
    var cacheMock, xmlHttpRequestFactoryMock, headRequest;
    beforeEach(function () {
        var nodeCacheMock = new NodeCacheMock_1.NodeCacheMock();
        cacheMock = new CacheMock_1.CacheMock(nodeCacheMock);
        xmlHttpRequestFactoryMock = new XMLHttpRequestFactoryMock_1.XMLHttpRequestFactoryMock(XMLHttpRequestMock_1.XMLHttpRequestMock);
        headRequest = new HeadRequest_1.HeadRequest(xmlHttpRequestFactoryMock, cacheMock);
    });
    describe("when no url is provided", function () {
        it("should return an appropriate error", function () {
            return headRequest.handleRequest("", {}, {}).catch(function (error) {
                chai_1.expect(error).to.deep.equal({ error: "Please provide a url" });
            });
        });
    });
    describe("when url is provided", function () {
        var createSpy;
        beforeEach(function () {
            createSpy = sinon.spy(xmlHttpRequestFactoryMock, "create");
        });
        it("will create a instance of XMLHttpRequest", function () {
            xmlHttpRequestFactoryMock.xmlHttp.readyState = 4;
            xmlHttpRequestFactoryMock.xmlHttp.status = 200;
            xmlHttpRequestFactoryMock.xmlHttp.headers =
                "HTTP/1.1 200 OK\n" +
                    "Server: Microsoft-IIS/4.0\n" +
                    "Cache-Control: max-age=172800\n" +
                    "Expires: Sat, 06 Apr 2002 11:34:01 GMT\n" +
                    "Date: Thu, 04 Apr 2002 11:34:01 GMT\n" +
                    "Content-Type: text/html\n" +
                    "Accept-Ranges: bytes\n" +
                    "Last-Modified: Thu, 14 Mar 2002 12:06:30 GMT\n" +
                    "ETag: \"0a7ccac50cbc11:1aad\"\n" +
                    "Content-Length: 52282";
            return headRequest.handleRequest("mockurl", {}, {}).then(function () {
                chai_1.expect(createSpy).to.have.callCount(1);
            });
        });
        describe("when response comes back valid", function () {
            it("will return the headers in a more readable format", function () {
                xmlHttpRequestFactoryMock.xmlHttp.readyState = 4;
                xmlHttpRequestFactoryMock.xmlHttp.status = 200;
                xmlHttpRequestFactoryMock.xmlHttp.headers =
                    "date: Fri, 08 Dec 2017 21:04:30 GMT\r\n" +
                        "content-encoding: gzip\r\n" +
                        "x-content-type-options: nosniff\r\n" +
                        "server: meinheld/0.6.1\r\n" +
                        "x-frame-options: DENY\r\n" +
                        "content-type: text/html; charset=utf-8\r\n" +
                        "connection: keep-alive\r\n" +
                        "strict-transport-security: max-age=63072000\r\n" +
                        "vary: Cookie, Accept-Encoding\r\n";
                return headRequest.handleRequest("mockurl", {}, {}).then(function (result) {
                    var expectedResult = {
                        "date": "Fri, 08 Dec 2017 21:04:30 GMT",
                        "content-encoding": "gzip",
                        "x-content-type-options": "nosniff",
                        "server": "meinheld/0.6.1",
                        "x-frame-options": "DENY",
                        "content-type": "text/html; charset=utf-8",
                        "connection": "keep-alive",
                        "strict-transport-security": "max-age=63072000",
                        "vary": "Cookie, Accept-Encoding"
                    };
                    chai_1.expect(result).to.deep.equal(expectedResult);
                });
            });
        });
        describe("when response doesn't come back value", function () {
            it("should return an appropriate error message", function () {
                xmlHttpRequestFactoryMock.xmlHttp.readyState = 4;
                xmlHttpRequestFactoryMock.xmlHttp.status = 400;
                return headRequest.handleRequest("mockurl", {}, {}).catch(function (error) {
                    chai_1.expect(error).to.deep.equal({ error: "Request didn't come back valid", statusCode: 400 });
                });
            });
        });
    });
});
