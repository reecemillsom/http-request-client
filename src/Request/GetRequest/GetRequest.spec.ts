import * as chai from "chai";
import {expect} from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import {CacheMock} from "../../Cache/CacheMock";
import {NodeCacheMock} from "../../Cache/NodeCache/NodeCacheMock";
import {XMLHttpRequestMock} from "../../XMLHttpRequestFactory/XMLHttpRequest/XMLHttpRequestMock";
import {XMLHttpRequestFactoryMock} from "../../XMLHttpRequestFactory/XMLHttpRequestFactoryMock";
import {GetRequest} from "./GetRequest";

chai.use(sinonChai);

describe("GetRequest", () => {

	let cacheMock: CacheMock,
		xmlHttpRequestFactoryMock: XMLHttpRequestFactoryMock,
		getRequest: GetRequest,
		sandbox = sinon.sandbox.create();

	beforeEach(() => {

		const nodeCacheMock = new NodeCacheMock();
			cacheMock = new CacheMock(nodeCacheMock);

		xmlHttpRequestFactoryMock = new XMLHttpRequestFactoryMock(XMLHttpRequestMock);

		getRequest = new GetRequest(xmlHttpRequestFactoryMock, cacheMock);

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

			describe("when key already exists in cache", () => {

			    it("will return a promise with the stored value", () => {

			    	cacheMock.exists = true;

					return getRequest.handleRequest("mockurl/foobar").then((result) => {

						expect(result).to.deep.equal({ a: 1, b: 2 });

					});
			    });

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

						it("will return a error response", () => {

							xmlHttpRequestFactoryMock.xmlHttp.readyState = 4;
							xmlHttpRequestFactoryMock.xmlHttp.status = 200;
							xmlHttpRequestFactoryMock.xmlHttp.responseText = '[{ "foo" "bar" }]';

							return getRequest.handleRequest("mockurl/foobar").catch((error) => {

								expect(error).to.be.a.instanceOf(SyntaxError);

							});

						});

					});

					describe("if JSON is valid", () => {

						let setSpy;

						beforeEach(() => {

						    setSpy = sinon.spy(cacheMock, "set");

						});

						it("will store the result in cache", () => {

							xmlHttpRequestFactoryMock.xmlHttp.readyState = 4;
							xmlHttpRequestFactoryMock.xmlHttp.status = 200;
							xmlHttpRequestFactoryMock.xmlHttp.responseText = '[{ "foo": "bar" }]';

							return getRequest.handleRequest("mockurl/foobar").then((result) => {

								expect(setSpy).to.have.been.calledWith("mockurl/foobar", [ { foo: 'bar' } ]);

							});

						});

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

