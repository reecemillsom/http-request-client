import {expect} from "chai";
import * as sinon from "sinon";
import {RequestMock} from "../../RequestFactory/Request/RequestMock";
import {RequestFactoryMock} from "../../RequestFactory/RequestFactoryMock";
import {WindowMock} from "../Window/WindowMock";
import {FetchRequest} from "./FetchRequest";


describe("FetchRequest", () => {

	let windowMock,
		requestFactoryMock,
		fetchRequest;

	beforeEach(() => {

		windowMock = new WindowMock();
		requestFactoryMock = new RequestFactoryMock(RequestMock);
	    fetchRequest = new FetchRequest(requestFactoryMock, windowMock);

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
	    
	    describe("when ok is invalid", () => {
	    
	        it("will return a rejection message", () => {

				return fetchRequest.handleRequest("mockurl/ok", {}).catch((error) => {

					expect(error).to.deep.equal({ error: "Failed to fetch", statusCode: 400 });

				});

	        });
	        
	    });

		describe("when ok is valid", () => {

			it("will resolve the body of the request", () => {

				windowMock.isFetchFine = true;

				return fetchRequest.handleRequest("mockurl/ok", {}).then((result) => {

					expect(result).to.deep.equal([{ "foo": "bar" }]);

				});

			});

		});

	});

});
