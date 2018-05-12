"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var XMLHttpRequestMock_1 = require("./XMLHttpRequest/XMLHttpRequestMock");
var XMLHttpRequestFactory_1 = require("./XMLHttpRequestFactory");
describe("XMLHttpRequestFactory", function () {
    var xmlHttpRequestFactory;
    describe("when asked to create", function () {
        describe("when XMLHttpRequest is truthy", function () {
            before(function () {
                xmlHttpRequestFactory = new XMLHttpRequestFactory_1.XMLHttpRequestFactory(XMLHttpRequestMock_1.XMLHttpRequestMock);
            });
            it("should return an instanceOf XMLHttpRequest", function () {
                var createResult = xmlHttpRequestFactory.create();
                chai_1.expect(createResult).to.be.an.instanceof(XMLHttpRequestMock_1.XMLHttpRequestMock);
            });
        });
    });
});
