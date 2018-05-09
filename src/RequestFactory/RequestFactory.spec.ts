import {expect} from "chai";
import {RequestMock} from "./Request/RequestMock";
import {RequestFactory} from "./RequestFactory";

describe.only("RequestFactory", () => {

	let requestFactory;

	beforeEach(() => {

	 	requestFactory = new RequestFactory(RequestMock);

	});

    describe("when asked to create", () => {

        it("will return an instance of request", () => {

            expect(requestFactory.create("url", {})).to.be.an.instanceof(RequestMock);

        });

    });

});
