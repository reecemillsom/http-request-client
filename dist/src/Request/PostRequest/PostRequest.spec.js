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
var PostRequest_1 = require("./PostRequest");
chai.use(sinonChai);
describe("PostRequest", function () {
    var postRequest, httpFactoryMock, sandbox = sinon.sandbox.create();
    beforeEach(function () {
        var nodeCacheMock = new NodeCacheMock_1.NodeCacheMock(), cacheMock = new CacheMock_1.CacheMock(nodeCacheMock);
        httpFactoryMock = new XMLHttpRequestFactoryMock_1.XMLHttpRequestFactoryMock(XMLHttpRequestMock_1.XMLHttpRequestMock);
        postRequest = new PostRequest_1.PostRequest(httpFactoryMock, cacheMock);
    });
    afterEach(function () {
        sandbox.restore();
    });
    describe("When no url is provided", function () {
        it("should return a bluebird error message", function () {
            return postRequest.handleRequest("", null, null).catch(function (error) {
                chai_1.expect(error).to.deep.equal({ error: "Please provide a url" });
            });
        });
    });
    describe("When given a valid url", function () {
        var createSpy, sendSpy;
        beforeEach(function () {
            createSpy = sandbox.spy(httpFactoryMock, "create");
            sendSpy = sandbox.spy(httpFactoryMock.xmlHttp, "send");
        });
        it("should create an instance of XMLHttpRequest", function () {
            httpFactoryMock.xmlHttp.readyState = 4;
            httpFactoryMock.xmlHttp.status = 200;
            httpFactoryMock.xmlHttp.responseText = "POST was successful";
            return postRequest.handleRequest("mockurl", null, {}).then(function () {
                chai_1.expect(createSpy).to.have.callCount(1);
            });
        });
        it("should call send with the data that is passed in", function () {
            var data = {
                data: "data"
            };
            httpFactoryMock.xmlHttp.readyState = 4;
            httpFactoryMock.xmlHttp.status = 200;
            httpFactoryMock.xmlHttp.responseText = "POST was successful";
            return postRequest.handleRequest("mockUrl", null, data).then(function () {
                chai_1.expect(sendSpy).to.have.been.calledWith(data);
            });
        });
        describe("when onreadystatechange is called", function () {
            describe("if readyState is equal to done and status is 200", function () {
                it("should return a bluebird promise with responseText", function () {
                    var data = {
                        data: "data"
                    };
                    httpFactoryMock.xmlHttp.readyState = 4;
                    httpFactoryMock.xmlHttp.status = 200;
                    httpFactoryMock.xmlHttp.responseText = "POST was successful";
                    return postRequest.handleRequest("mockUrl", null, data).then(function (response) {
                        chai_1.expect(response).to.equal("POST was successful");
                    });
                });
            });
        });
        describe("if readystate is done and status is not 200", function () {
            it("should return a rejection with appropriate message", function () {
                var data = {
                    data: "data"
                };
                httpFactoryMock.xmlHttp.readyState = 4;
                httpFactoryMock.xmlHttp.status = 400;
                httpFactoryMock.xmlHttp.responseText = "POST was unsuccessful";
                return postRequest.handleRequest("mockurl", null, data).catch(function (error) {
                    chai_1.expect(error).to.deep.equal({ error: "POST was unsuccessful", statusCode: 400 });
                });
            });
        });
    });
});
