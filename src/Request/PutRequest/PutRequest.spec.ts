import * as chai from "chai";
import {expect} from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import {CacheMock} from "../../Cache/CacheMock";
import {NodeCacheMock} from "../../Cache/NodeCache/NodeCacheMock";
import {XMLHttpRequestMock} from "../../XMLHttpRequestFactory/XMLHttpRequest/XMLHttpRequestMock";
import {XMLHttpRequestFactoryMock} from "../../XMLHttpRequestFactory/XMLHttpRequestFactoryMock";
import {PutRequest} from "./PutRequest";


chai.use(sinonChai);

describe("PutRequest", () => {

	let putRequest,
		xmlHttpRequestFactoryMock;

	beforeEach(() => {

		const nodeCacheMock = new NodeCacheMock(),
			cacheMock = new CacheMock(nodeCacheMock);

		xmlHttpRequestFactoryMock = new XMLHttpRequestFactoryMock(XMLHttpRequestMock);

		putRequest = new PutRequest(xmlHttpRequestFactoryMock, cacheMock);

	});

	describe("when no url is provided", () => {

		it("will return a rejection with the appropriate message", () => {

			return putRequest.handleRequest("", {}, {}).catch((error) => {

				expect(error).to.deep.equal({ error: "Please provide a url"});

			});

		});

	});

	describe("When a url is passed", () => {

		let createSpy,
			sendSpy;

		beforeEach(() => {

			createSpy = sinon.spy(xmlHttpRequestFactoryMock, "create");
			sendSpy = sinon.spy(xmlHttpRequestFactoryMock.xmlHttp, "send");

		});

	    it("should create a instance of xmlHttpRequest", () => {

			xmlHttpRequestFactoryMock.xmlHttp.readyState = 4;
			xmlHttpRequestFactoryMock.xmlHttp.status = 200;

	        return putRequest.handleRequest("mockUrl", {}, {}).then(() => {

	        	expect(createSpy).to.have.callCount(1);

			});

	    });

	    it("should call send with the data that is passed", () => {

	    	const data = {
	    		value: "mockValue",
				anotherValue: "mockValue2"
			};

			xmlHttpRequestFactoryMock.xmlHttp.readyState = 4;
			xmlHttpRequestFactoryMock.xmlHttp.status = 200;

			return putRequest.handleRequest("mockUrl", {}, data).then(() => {

				expect(sendSpy).to.have.been.calledWith(data);

			});

		});

	    describe("when request is done and status is 200", () => {

	    	it("should resolve with the responseText", () => {

	    		xmlHttpRequestFactoryMock.xmlHttp.readyState = 4;
	    		xmlHttpRequestFactoryMock.xmlHttp.status = 200;
	    		xmlHttpRequestFactoryMock.xmlHttp.responseText = "SUCCESS";

	    		return putRequest.handleRequest("mockUrl", {}, {}).then((result) => {

					expect(result).to.equal("SUCCESS");

				});

	    	});

		});

	    describe("when request is not successful", () => {

	    	it("should reject with an error message and status code", () => {

				xmlHttpRequestFactoryMock.xmlHttp.readyState = 4;
				xmlHttpRequestFactoryMock.xmlHttp.status = 400;

				return putRequest.handleRequest("mockUrl", {}, {}).catch((error) => {

					expect(error).to.deep.equal({ error: "PUT was unsuccessful", statusCode: 400 });

				});

			});

		});

	});

});