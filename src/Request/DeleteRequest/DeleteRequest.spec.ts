import * as chai from "chai";
import {expect} from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import {XMLHttpRequestMock} from "../../XMLHttpRequestFactory/XMLHttpRequest/XMLHttpRequestMock";
import {XMLHttpRequestFactoryMock} from "../../XMLHttpRequestFactory/XMLHttpRequestFactoryMock";
import {DeleteRequest} from "./DeleteRequest";

chai.use(sinonChai);

describe("DeleteRequest", () => {

	let deleteRequest,
		xmlHttpRequestFactoryMock;

	beforeEach(() => {

		xmlHttpRequestFactoryMock = new XMLHttpRequestFactoryMock(XMLHttpRequestMock);

		deleteRequest = new DeleteRequest(xmlHttpRequestFactoryMock);

	});

	describe("when no url is provided", () => {

		it("will return a rejection with the appropriate message", () => {

			return deleteRequest.handleRequest("", {}, {}).catch((error) => {

				expect(error).to.deep.equal({ error: "Please provide a url" });

			});

		});

	});

	describe("When a url is passed", () => {

		let createSpy;

		beforeEach(() => {

			createSpy = sinon.spy(xmlHttpRequestFactoryMock, "create");

		});

		it("should create a instance of xmlHttpRequest", () => {

			xmlHttpRequestFactoryMock.xmlHttp.readyState = 4;
			xmlHttpRequestFactoryMock.xmlHttp.status = 200;

			return deleteRequest.handleRequest("mockUrl", {}, {}).then(() => {

				expect(createSpy).to.have.callCount(1);

			});

		});

		describe("when request is done and status is 200", () => {

			it("should resolve with the responseText", () => {

				xmlHttpRequestFactoryMock.xmlHttp.readyState = 4;
				xmlHttpRequestFactoryMock.xmlHttp.status = 200;
				xmlHttpRequestFactoryMock.xmlHttp.responseText = "SUCCESS";

				return deleteRequest.handleRequest("mockUrl", {}, {}).then((result) => {

					expect(result).to.equal("SUCCESS");

				});

			});

		});

		describe("when request is not successful", () => {

			it("should reject with an error message and status code", () => {

				xmlHttpRequestFactoryMock.xmlHttp.readyState = 4;
				xmlHttpRequestFactoryMock.xmlHttp.status = 400;

				return deleteRequest.handleRequest("mockUrl", {}, {}).catch((error) => {

					expect(error).to.deep.equal({ error: "DELETE was unsuccessful", statusCode: 400 });

				});

			});

		});

	});

});
