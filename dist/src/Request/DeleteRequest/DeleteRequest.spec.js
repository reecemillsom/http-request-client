"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var chai_1 = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var XMLHttpRequestMock_1 = require("../../XMLHttpRequestFactory/XMLHttpRequest/XMLHttpRequestMock");
var XMLHttpRequestFactoryMock_1 = require("../../XMLHttpRequestFactory/XMLHttpRequestFactoryMock");
var DeleteRequest_1 = require("./DeleteRequest");
chai.use(sinonChai);
describe("DeleteRequest", function () {
    var deleteRequest, xmlHttpRequestFactoryMock;
    beforeEach(function () {
        xmlHttpRequestFactoryMock = new XMLHttpRequestFactoryMock_1.XMLHttpRequestFactoryMock(XMLHttpRequestMock_1.XMLHttpRequestMock);
        deleteRequest = new DeleteRequest_1.DeleteRequest(xmlHttpRequestFactoryMock);
    });
    describe("when no url is provided", function () {
        it("will return a rejection with the appropriate message", function () {
            return deleteRequest.handleRequest("", {}, {}).catch(function (error) {
                chai_1.expect(error).to.deep.equal({ error: "Please provide a url" });
            });
        });
    });
    describe("When a url is passed", function () {
        var createSpy;
        beforeEach(function () {
            createSpy = sinon.spy(xmlHttpRequestFactoryMock, "create");
        });
        it("should create a instance of xmlHttpRequest", function () {
            xmlHttpRequestFactoryMock.xmlHttp.readyState = 4;
            xmlHttpRequestFactoryMock.xmlHttp.status = 200;
            return deleteRequest.handleRequest("mockUrl", {}, {}).then(function () {
                chai_1.expect(createSpy).to.have.callCount(1);
            });
        });
        describe("when request is done and status is 200", function () {
            it("should resolve with the responseText", function () {
                xmlHttpRequestFactoryMock.xmlHttp.readyState = 4;
                xmlHttpRequestFactoryMock.xmlHttp.status = 200;
                xmlHttpRequestFactoryMock.xmlHttp.responseText = "SUCCESS";
                return deleteRequest.handleRequest("mockUrl", {}, {}).then(function (result) {
                    chai_1.expect(result).to.equal("SUCCESS");
                });
            });
        });
        describe("when request is not successful", function () {
            it("should reject with an error message and status code", function () {
                xmlHttpRequestFactoryMock.xmlHttp.readyState = 4;
                xmlHttpRequestFactoryMock.xmlHttp.status = 400;
                return deleteRequest.handleRequest("mockUrl", {}, {}).catch(function (error) {
                    chai_1.expect(error).to.deep.equal({ error: "DELETE was unsuccessful", statusCode: 400 });
                });
            });
        });
    });
});
