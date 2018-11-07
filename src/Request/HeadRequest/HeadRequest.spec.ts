import * as chai from "chai";
import {expect} from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import {XMLHttpRequestMock} from "../../XMLHttpRequestFactory/XMLHttpRequest/XMLHttpRequestMock";
import {XMLHttpRequestFactoryMock} from "../../XMLHttpRequestFactory/XMLHttpRequestFactoryMock";
import {HeadRequest} from "./HeadRequest";

chai.use(sinonChai);

describe("HeadRequest", () => {

	let xmlHttpRequestFactoryMock: XMLHttpRequestFactoryMock,
		headRequest: HeadRequest;

	beforeEach(() => {

		xmlHttpRequestFactoryMock = new XMLHttpRequestFactoryMock(XMLHttpRequestMock);

		headRequest = new HeadRequest(xmlHttpRequestFactoryMock);

	});


	describe("when no url is provided", () => {

	    it("should return an appropriate error", () => {

	        return headRequest.handleRequest("", {}, {}).catch((error) => {

	        	expect(error).to.deep.equal({ error: "Please provide a url"});

			});

	    });

	});

	describe("when url is provided", () => {

		let createSpy;

		beforeEach(() => {

		    createSpy = sinon.spy(xmlHttpRequestFactoryMock, "create");

		});

	    it("will create a instance of XMLHttpRequest", () => {

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

	    	return headRequest.handleRequest("mockurl", {}, {}).then(() => {

	    		expect(createSpy).to.have.callCount(1);

			});

	    });

	    describe("when response comes back valid", () => {

			it("will return the headers in a more readable format", () => {

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

				return headRequest.handleRequest("mockurl", {}, {}).then((result) => {

					const expectedResult = {
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

					expect(result).to.deep.equal(expectedResult);

				});

			});

	    });

	    describe("when response doesn't come back value", () => {

	        it("should return an appropriate error message", () => {

				xmlHttpRequestFactoryMock.xmlHttp.readyState = 4;
				xmlHttpRequestFactoryMock.xmlHttp.status = 400;

	            return headRequest.handleRequest("mockurl", {}, {}).catch((error) => {

	            	expect(error).to.deep.equal({ error: "Request didn't come back valid", statusCode: 400 });

				});

	        });

	    });

	});

});

