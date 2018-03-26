import * as chai from "chai";
import {expect} from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import {XMLHttpRequestMock} from "../XMLHttpRequestFactory/XMLHttpRequest/XMLHttpRequestMock";
import {XMLHttpRequestFactoryMock} from "../XMLHttpRequestFactory/XMLHttpRequestFactoryMock";
import {HttpClient} from "./HttpClient";

chai.use(sinonChai);

describe.only("Http Client", () => {

	let xmlHttpRequestFactoryMock: XMLHttpRequestFactoryMock,
		httpClient: HttpClient,
		sandbox = sinon.sandbox.create();

	beforeEach(() => {

		xmlHttpRequestFactoryMock = new XMLHttpRequestFactoryMock(XMLHttpRequestMock);

		httpClient = new HttpClient(xmlHttpRequestFactoryMock);

	});

	afterEach(() => {

		sandbox.restore();

	});

	describe("when asked to get", () => {

		describe("when no url is provided", () => {

			it("will return a rejection with appropriate message", () => {

				return httpClient.get("").catch((error: object) => {

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

				return httpClient.get("mockurl/foobar").then(() => {

					expect(createXMLHttpSpy).to.have.callCount(1);

				});

			});

			describe("when get request is sent", () => {

				describe("if request is done and response status is not 200", () => {

					it.only("will return a rejection with appropriate message", () => {

						// XMLHttpRequestMock.readyState = 4;
						// XMLHttpRequestMock.status = 400;

						xmlHttpRequestFactoryMock.xmlHttp.readyState = 4;
						xmlHttpRequestFactoryMock.xmlHttp.status = 400;

						return httpClient.get("mockurl/foobar").catch((error) => {

							expect(error).to.deep.equal({ error: "Request didn't come back valid" });

						});

					});

				});

				describe.only("if request is done and response status is 200", () => {

					describe("if JSON is invalid", () => {

						it("will return a error response", () => {

							// XMLHttpRequestMock.readyState = 4;
							// XMLHttpRequestMock.status = 200;
							// XMLHttpRequestMock.responseText = '[{ "foo": "bar" }]';

							xmlHttpRequestFactoryMock.xmlHttp.readyState = 4;
							xmlHttpRequestFactoryMock.xmlHttp.status = 200;
							xmlHttpRequestFactoryMock.xmlHttp.responseText = '[{ "foo" "bar" }]';

							return httpClient.get("mockurl/foobar").catch((response) => {

								console.log("response>", response);

								expect(response).to.deep.equal([{ foo: "bar" }]);

							});

						});

					});

					describe("if JSON is valid", () => {

						it("will return a valid response JSON", () => {

							// XMLHttpRequestMock.readyState = 4;
							// XMLHttpRequestMock.status = 200;
							// XMLHttpRequestMock.responseText = '[{ "foo": "bar" }]';

							xmlHttpRequestFactoryMock.xmlHttp.readyState = 4;
							xmlHttpRequestFactoryMock.xmlHttp.status = 200;
							xmlHttpRequestFactoryMock.xmlHttp.responseText = '[{ "foo": "bar" }]';

							return httpClient.get("mockurl/foobar").then((response) => {

								console.log("response>", response);

								expect(response).to.deep.equal([{ foo: "bar" }]);

							});

						});

					});

				});

			});

		});

	});

});
