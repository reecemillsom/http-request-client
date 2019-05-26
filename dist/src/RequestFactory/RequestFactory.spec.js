"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var RequestMock_1 = require("./Request/RequestMock");
var RequestFactory_1 = require("./RequestFactory");
describe("RequestFactory", function () {
    var requestFactory;
    beforeEach(function () {
        requestFactory = new RequestFactory_1.RequestFactory(RequestMock_1.RequestMock);
    });
    describe("when asked to create", function () {
        it("will return an instance of request", function () {
            chai_1.expect(requestFactory.create("url", {})).to.be.an.instanceof(RequestMock_1.RequestMock);
        });
    });
});
