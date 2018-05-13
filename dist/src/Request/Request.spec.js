"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var chai_1 = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var CacheMock_1 = require("../Cache/CacheMock");
var NodeCacheMock_1 = require("../Cache/NodeCache/NodeCacheMock");
var XMLHttpRequestMock_1 = require("../XMLHttpRequestFactory/XMLHttpRequest/XMLHttpRequestMock");
var XMLHttpRequestFactoryMock_1 = require("../XMLHttpRequestFactory/XMLHttpRequestFactoryMock");
var Request_1 = require("./Request");
chai.use(sinonChai);
var MockClass = (function (_super) {
    __extends(MockClass, _super);
    function MockClass(httpRequestFactory, cache) {
        return _super.call(this, httpRequestFactory, cache) || this;
    }
    MockClass.prototype.handleRequest = function (url, headers, data) {
        var xmlHttpRequest = this.xmlHttpRequestFactory.create();
        this.setRequestHeaders(xmlHttpRequest, headers);
    };
    return MockClass;
}(Request_1.Request));
describe("Request", function () {
    var mockClass, httpRequestFactoryMock;
    before(function () {
        var nodeCacheMock = new NodeCacheMock_1.NodeCacheMock(), cacheMock = new CacheMock_1.CacheMock(nodeCacheMock);
        httpRequestFactoryMock = new XMLHttpRequestFactoryMock_1.XMLHttpRequestFactoryMock(XMLHttpRequestMock_1.XMLHttpRequestMock);
        mockClass = new MockClass(httpRequestFactoryMock, cacheMock);
    });
    describe("when set request headers is called", function () {
        describe("when headers are provided", function () {
            var setRequestHeaderSpy;
            beforeEach(function () {
                setRequestHeaderSpy = sinon.spy(httpRequestFactoryMock.xmlHttp, "setRequestHeader");
            });
            it("will set headers for all data in the object", function () {
                mockClass.handleRequest("mockurl", { value: false, value2: true }, null);
                chai_1.expect(setRequestHeaderSpy.getCall(0)).to.have.been.calledWith("value", false);
                chai_1.expect(setRequestHeaderSpy.getCall(1)).to.have.been.calledWith("value2", true);
            });
        });
    });
});
