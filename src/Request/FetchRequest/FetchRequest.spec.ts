import {expect} from "chai";
import * as sinon from "sinon";
import {RequestMock} from "../../RequestFactory/Request/RequestMock";
import {RequestFactoryMock} from "../../RequestFactory/RequestFactoryMock";
import {FetchRequest} from "./FetchRequest";


describe.only("FetchRequest", () => {

	let requestFactoryMock,
		fetchRequest;

	beforeEach(() => {

		requestFactoryMock = new RequestFactoryMock(RequestMock);
	    fetchRequest = new FetchRequest(requestFactoryMock);

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

	    	return fetchRequest.handleRequest("mockurl", {}).then(() => {

				expect(createSpy).to.have.callCount(1);

			});

	    });
	    
	    describe("when response is invalid", () => {
	    
	        it("will return a rejection message", () => {



	        });
	        
	    });

	});

});
