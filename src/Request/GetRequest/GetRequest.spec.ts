import * as chai from "chai";
import {expect} from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import {XMLHttpRequestMock} from "../../XMLHttpRequestFactory/XMLHttpRequest/XMLHttpRequestMock";
import {XMLHttpRequestFactoryMock} from "../../XMLHttpRequestFactory/XMLHttpRequestFactoryMock";
import {GetRequest} from "./GetRequest";

chai.use(sinonChai);

describe("GetRequest", () => {

	let xmlHttpRequestFactoryMock: XMLHttpRequestFactoryMock,
		getRequest: GetRequest,
		sandbox = sinon.sandbox.create();

	beforeEach(() => {

		xmlHttpRequestFactoryMock = new XMLHttpRequestFactoryMock(XMLHttpRequestMock);

		getRequest = new GetRequest(xmlHttpRequestFactoryMock);

	});

	describe("when asked to get", () => {

		describe("when no url is provided", () => {

			it("will return a rejection with appropriate message", () => {

				return getRequest.handleRequest("").catch((error: object) => {

					expect(error).to.deep.equal({ error: "Please provide a url" });

				});

			});

		});

		describe("when url is provided", () => {

			let createXMLHttpSpy: any;

			beforeEach(() => {

				createXMLHttpSpy = sandbox.spy(xmlHttpRequestFactoryMock, "create");

			});

			it("will create a new instance of the XMLHttpFactory", () => {

				xmlHttpRequestFactoryMock.xmlHttp.readyState = 4;
				xmlHttpRequestFactoryMock.xmlHttp.status = 200;
				xmlHttpRequestFactoryMock.xmlHttp.responseText = '[{ "foo": "bar" }]';

				return getRequest.handleRequest("mockurl/foobar").then(() => {

					expect(createXMLHttpSpy).to.have.callCount(1);

				});

			});

			describe("when get request is sent", () => {

				describe("if request is done and response status is not 200", () => {

					it("will return a rejection with appropriate message", () => {

						xmlHttpRequestFactoryMock.xmlHttp.readyState = 4;
						xmlHttpRequestFactoryMock.xmlHttp.status = 400;

						return getRequest.handleRequest("mockurl/foobar").catch((error) => {

							expect(error).to.deep.equal({ error: "Request didn't come back valid" });

						});

					});

				});

				describe("if request is done and response status is 200", () => {

					describe("if JSON is invalid", () => {

						it("will return the value that was fetched", () => {

							xmlHttpRequestFactoryMock.xmlHttp.readyState = 4;
							xmlHttpRequestFactoryMock.xmlHttp.status = 200;
							xmlHttpRequestFactoryMock.xmlHttp.responseText = '[{ "foo" "bar" }]';

							return getRequest.handleRequest("mockurl/foobar").then((response) => {

								expect(response).to.equal('[{ "foo" "bar" }]');

							});

						});

					});

					describe("if JSON is valid", () => {

						it("will return a valid response JSON", () => {

							xmlHttpRequestFactoryMock.xmlHttp.readyState = 4;
							xmlHttpRequestFactoryMock.xmlHttp.status = 200;
							xmlHttpRequestFactoryMock.xmlHttp.responseText = '[{ "foo": "bar" }]';

							return getRequest.handleRequest("mockurl/foobar").then((response) => {

								expect(response).to.deep.equal([{ foo: "bar" }]);

							});

						});

					});

				});

			});

		});

	});

});

