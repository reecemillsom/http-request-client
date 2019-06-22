"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var chai_1 = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var XMLHttpRequestMock_1 = require("../../XMLHttpRequestFactory/XMLHttpRequest/XMLHttpRequestMock");
var XMLHttpRequestFactoryMock_1 = require("../../XMLHttpRequestFactory/XMLHttpRequestFactoryMock");
var PatchRequest_1 = require("./PatchRequest");
chai.use(sinonChai);
describe("PatchRequest", function () {
    var patchRequest, xmlHttpRequestFactoryMock;
    beforeEach(function () {
        xmlHttpRequestFactoryMock = new XMLHttpRequestFactoryMock_1.XMLHttpRequestFactoryMock(XMLHttpRequestMock_1.XMLHttpRequestMock);
        patchRequest = new PatchRequest_1.PatchRequest(xmlHttpRequestFactoryMock);
    });
    describe("when no url is provided", function () {
        it("will return a rejection with the appropriate message", function () {
            return patchRequest.handleRequest("", {}, {}).catch(function (error) {
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
            return patchRequest.handleRequest("mockUrl", {}, {}).then(function () {
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
            return patchRequest.handleRequest("mockUrl", {}, data).then(function () {
                chai_1.expect(sendSpy).to.have.been.calledWith(data);
            });
        });
        describe("when request is done and status is 200", function () {
            it("should resolve with the responseText", function () {
                xmlHttpRequestFactoryMock.xmlHttp.readyState = 4;
                xmlHttpRequestFactoryMock.xmlHttp.status = 200;
                xmlHttpRequestFactoryMock.xmlHttp.responseText = "SUCCESS";
                return patchRequest.handleRequest("mockUrl", {}, {}).then(function (result) {
                    chai_1.expect(result).to.equal("SUCCESS");
                });
            });
        });
        describe("when request is not successful", function () {
            it("should reject with an error message and status code", function () {
                xmlHttpRequestFactoryMock.xmlHttp.readyState = 4;
                xmlHttpRequestFactoryMock.xmlHttp.status = 400;
                return patchRequest.handleRequest("mockUrl", {}, {}).catch(function (error) {
                    chai_1.expect(error).to.deep.equal({ error: "PATCH was unsuccessful", statusCode: 400 });
                });
            });
        });
    });
});
