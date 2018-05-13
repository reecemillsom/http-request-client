"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var sinon = require("sinon");
var RequestMock_1 = require("../../RequestFactory/Request/RequestMock");
var RequestFactoryMock_1 = require("../../RequestFactory/RequestFactoryMock");
var WindowMock_1 = require("../Window/WindowMock");
var FetchRequest_1 = require("./FetchRequest");
describe("FetchRequest", function () {
    var windowMock, requestFactoryMock, fetchRequest;
    beforeEach(function () {
        windowMock = new WindowMock_1.WindowMock();
        requestFactoryMock = new RequestFactoryMock_1.RequestFactoryMock(RequestMock_1.RequestMock);
        fetchRequest = new FetchRequest_1.FetchRequest(requestFactoryMock, windowMock);
    });
    describe("when asked to fetch", function () {
        var createSpy;
        beforeEach(function () {
            createSpy = sinon.spy(requestFactoryMock, "create");
        });
        describe("when no url is provided", function () {
            it("will reject with appropriate message", function () {
                return fetchRequest.handleRequest("", {}).catch(function (error) {
                    chai_1.expect(error).to.deep.equal({ error: "Please provide a url" });
                });
            });
        });
        it("will create a instance of Request", function () {
            windowMock.isFetchFine = true;
            return fetchRequest.handleRequest("mockurl/ok", {}).then(function () {
                chai_1.expect(createSpy).to.have.callCount(1);
            });
        });
        describe("when ok is invalid", function () {
            it("will return a rejection message", function () {
                return fetchRequest.handleRequest("mockurl/ok", {}).catch(function (error) {
                    chai_1.expect(error).to.deep.equal({ error: "Failed to fetch", statusCode: 400 });
                });
            });
        });
        describe("when ok is valid", function () {
            it("will resolve the body of the request", function () {
                windowMock.isFetchFine = true;
                return fetchRequest.handleRequest("mockurl/ok", {}).then(function (result) {
                    chai_1.expect(result).to.deep.equal([{ "foo": "bar" }]);
                });
            });
        });
    });
});
