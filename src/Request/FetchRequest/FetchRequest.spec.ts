import {expect} from "chai";
import * as sinon from "sinon";
import {CacheMock} from "../../Cache/CacheMock";
import {NodeCacheMock} from "../../Cache/NodeCache/NodeCacheMock";
import {RequestMock} from "../../RequestFactory/Request/RequestMock";
import {RequestFactoryMock} from "../../RequestFactory/RequestFactoryMock";
import {WindowMock} from "../../Window/WindowMock";
import {FetchRequest} from "./FetchRequest";


describe("FetchRequest", () => {

	let cacheMock,
		windowMock,
		requestFactoryMock,
		fetchRequest;

	beforeEach(() => {

		const nodeCacheMock = new NodeCacheMock();

		cacheMock = new CacheMock(nodeCacheMock);
		windowMock = new WindowMock();
		requestFactoryMock = new RequestFactoryMock(RequestMock);
	    fetchRequest = new FetchRequest(requestFactoryMock, windowMock, cacheMock);

	});

	describe("when asked to fetch", () => {

		let createSpy;

		beforeEach(() => {

		    createSpy = sinon.spy(requestFactoryMock, "create");

		});

		describe("when no url is provided", () => {

		    it("will reject with appropriate message", () => {

		    	return fetchRequest.handleRequest("", {}).catch((error) => {

		    		expect(error).to.deep.equal({ error: "Please provide a url" });

				});

			});

		});

	    it("will create a instance of Request", () => {

	    	windowMock.isFetchFine = true;

	    	return fetchRequest.handleRequest("mockurl/ok", {}).then(() => {

				expect(createSpy).to.have.callCount(1);

			});

	    });

	    describe("when request is GET", () => {

	    	let setSpy;

	    	beforeEach(() => {

	    	    setSpy = sinon.spy(cacheMock, "set");

	    	});

	    	describe("if key already exists in cache", () => {

	    	    it("should return the cached value", () => {

					cacheMock.exists = true;
					windowMock.isFetchFine = true;

					return fetchRequest.handleRequest("mockurl").then((result) => {

						expect(result).to.deep.equal({ a: 1, b: 2 });

					});

	    	    });

	    	});

	    	describe("when no options are passed", () => {

				it("should store the value in cache", () => {

					windowMock.isFetchFine = true;

					return fetchRequest.handleRequest("mockurl").then(() => {

						expect(setSpy).to.have.callCount(1);

					});

				});

	    	});

			describe("when options method are passed", () => {

				it("should store the value in cache", () => {

					windowMock.isFetchFine = true;

					return fetchRequest.handleRequest("mockurl", { method: "GET" }).then(() => {

						expect(setSpy).to.have.callCount(1);

					});

				});

			});

	    });

	    describe("when request is not get", () => {

			let setSpy;

			beforeEach(() => {

				setSpy = sinon.spy(cacheMock, "set");

			});

	        it("should not store any values in cache", () => {

				windowMock.isFetchFine = true;

				return fetchRequest.handleRequest("mockurl", { method: "POST" }).then(() => {

					expect(setSpy).to.have.callCount(0);

				});

	        });

	    });

	    describe("when ok is invalid", () => {

	        it("will return a rejection message", () => {

				return fetchRequest.handleRequest("mockurl/ok", {}).catch((error) => {

					expect(error).to.deep.equal({ error: "Failed to fetch", statusCode: 400 });

				});

	        });

	    });

		describe("when ok is valid", () => {

			describe("when response is json", () => {

				it("will resolve the body of the request", () => {

					windowMock.isFetchFine = true;
					windowMock.requestType = "application/json";

					return fetchRequest.handleRequest("mockurl/ok", {}).then((result) => {

						expect(result).to.deep.equal([{ "foo": "bar" }]);

					});

				});

			});

			describe("when response is text", () => {

			    it("will resolve the text of the request", () => {

			        windowMock.isFetchFine = true;
			        windowMock.requestType = 'text/html';

			        return fetchRequest.handleRequest("mockurl/ok", {}).then((result) => {

			        	expect(result).to.equal("some text");

					});

			    });

			});

			describe("when response is something else", () => {

			    it("will resolve the content that is returned", () => {

			        windowMock.isFetchFine = true;
			        windowMock.requestType = "some/other";

					return fetchRequest.handleRequest("mockurl/ok", {}).then((result) => {

						expect(result).to.contain({
							ok: true,
							status: 200,
						});

						expect(result.headers.get()).to.equal("some/other");

					});

			    });

			});

		});

	});

});
