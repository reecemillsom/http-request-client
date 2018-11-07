import * as chai from "chai";
import {expect} from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import {XMLHttpRequestMock} from "../../XMLHttpRequestFactory/XMLHttpRequest/XMLHttpRequestMock";
import {XMLHttpRequestFactoryMock} from "../../XMLHttpRequestFactory/XMLHttpRequestFactoryMock";
import {PostRequest} from "./PostRequest";

chai.use(sinonChai);

describe("PostRequest", () => {

	let postRequest,
		httpFactoryMock,
		sandbox = sinon.sandbox.create();

	beforeEach(() => {

		httpFactoryMock = new XMLHttpRequestFactoryMock(XMLHttpRequestMock);

		postRequest = new PostRequest(httpFactoryMock);

	});

	afterEach(() => {

		sandbox.restore();

	});

	describe("When no url is provided", () => {

		it("should return a bluebird error message",  () => {

			return postRequest.handleRequest("", null, null).catch((error) => {

				expect(error).to.deep.equal({ error: "Please provide a url"});

			});


		});

	});

	describe("When given a valid url", () => {

		let createSpy,
			sendSpy;

		beforeEach(() => {

			createSpy = sandbox.spy(httpFactoryMock, "create");
			sendSpy = sandbox.spy(httpFactoryMock.xmlHttp, "send");

		});

	    it("should create an instance of XMLHttpRequest", () => {

			httpFactoryMock.xmlHttp.readyState = 4;
			httpFactoryMock.xmlHttp.status = 200;
			httpFactoryMock.xmlHttp.responseText = "POST was successful";

	    	return postRequest.handleRequest("mockurl", null, {}).then(() => {

				expect(createSpy).to.have.callCount(1);

			});

	    });

	    it("should call send with the data that is passed in", () => {

	    	const data = {
	    		data: "data"
			};

			httpFactoryMock.xmlHttp.readyState = 4;
			httpFactoryMock.xmlHttp.status = 200;
			httpFactoryMock.xmlHttp.responseText = "POST was successful";

			return postRequest.handleRequest("mockUrl", null, data).then(() => {

				expect(sendSpy).to.have.been.calledWith(data);

			});

		});

	    describe("when onload is called", () => {

	        describe("if readyState is equal to done and status is 200", () => {

	            it("should return a bluebird promise with responseText", () => {

					const data = {
						data: "data"
					};

					httpFactoryMock.xmlHttp.readyState = 4;
					httpFactoryMock.xmlHttp.status = 200;
					httpFactoryMock.xmlHttp.responseText = "POST was successful";

					return postRequest.handleRequest("mockUrl", null, data).then((response) => {

						expect(response).to.equal("POST was successful");

					});

	            });

	        });

	    });

	    describe("if readystate is done and status is not 200", () => {

	        it("should return a rejection with appropriate message", () => {

				const data = {
					data: "data"
				};

				httpFactoryMock.xmlHttp.readyState = 4;
				httpFactoryMock.xmlHttp.status = 400;
				httpFactoryMock.xmlHttp.responseText = "POST was unsuccessful";

				return postRequest.handleRequest("mockurl", null, data).catch((error) => {

					expect(error).to.deep.equal({ error: "POST was unsuccessful", statusCode: 400 });

				});

	        });

	    });

	});

});
