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
var PutRequest_1 = require("./PutRequest");
chai.use(sinonChai);
describe("PutRequest", function () {
    var putRequest, xmlHttpRequestFactoryMock;
    beforeEach(function () {
        var nodeCacheMock = new NodeCacheMock_1.NodeCacheMock(), cacheMock = new CacheMock_1.CacheMock(nodeCacheMock);
        xmlHttpRequestFactoryMock = new XMLHttpRequestFactoryMock_1.XMLHttpRequestFactoryMock(XMLHttpRequestMock_1.XMLHttpRequestMock);
        putRequest = new PutRequest_1.PutRequest(xmlHttpRequestFactoryMock, cacheMock);
    });
    describe("when no url is provided", function () {
        it("will return a rejection with the appropriate message", function () {
            return putRequest.handleRequest("", {}, {}).catch(function (error) {
                chai_1.expect(error).to.deep.equal({ error: "Please provide a url" });
            });
        });
    });
    describe("When a url is passed", function () {
        var createSpy, sendSpy;
        beforeEach(function () {
            createSpy = sinon.spy(xmlHttpRequestFactoryMock, "create");
            sendSpy = sinon.spy(xmlHttpRequestFactoryMock.xmlHttp, "send");
        });
        it("should create a instance of xmlHttpRequest", function () {
            xmlHttpRequestFactoryMock.xmlHttp.readyState = 4;
            xmlHttpRequestFactoryMock.xmlHttp.status = 200;
            return putRequest.handleRequest("mockUrl", {}, {}).then(function () {
                chai_1.expect(createSpy).to.have.callCount(1);
            });
        });
        it("should call send with the data that is passed", function () {
            var data = {
                value: "mockValue",
                anotherValue: "mockValue2"
            };
            xmlHttpRequestFactoryMock.xmlHttp.readyState = 4;
            xmlHttpRequestFactoryMock.xmlHttp.status = 200;
            return putRequest.handleRequest("mockUrl", {}, data).then(function () {
                chai_1.expect(sendSpy).to.have.been.calledWith(data);
            });
        });
        describe("when request is done and status is 200", function () {
            it("should resolve with the responseText", function () {
                xmlHttpRequestFactoryMock.xmlHttp.readyState = 4;
                xmlHttpRequestFactoryMock.xmlHttp.status = 200;
                xmlHttpRequestFactoryMock.xmlHttp.responseText = "SUCCESS";
                return putRequest.handleRequest("mockUrl", {}, {}).then(function (result) {
                    chai_1.expect(result).to.equal("SUCCESS");
                });
            });
        });
        describe("when request is not successful", function () {
            it("should reject with an error message and status code", function () {
                xmlHttpRequestFactoryMock.xmlHttp.readyState = 4;
                xmlHttpRequestFactoryMock.xmlHttp.status = 400;
                return putRequest.handleRequest("mockUrl", {}, {}).catch(function (error) {
                    chai_1.expect(error).to.deep.equal({ error: "PUT was unsuccessful", statusCode: 400 });
                });
            });
        });
    });
});
