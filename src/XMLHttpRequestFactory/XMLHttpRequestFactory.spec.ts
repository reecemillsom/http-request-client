import {expect} from "chai";
import {XMLHttpRequestMock} from "./XMLHttpRequest/XMLHttpRequestMock";
import {XMLHttpRequestFactory} from "./XMLHttpRequestFactory";

describe("XMLHttpRequestFactory", () => {

	let xmlHttpRequestFactory: XMLHttpRequestFactory;

	describe("when asked to create", () => {

		describe("when XMLHttpRequest is truthy", () => {

			before(() => {

				xmlHttpRequestFactory = new XMLHttpRequestFactory(XMLHttpRequestMock);

			});


			it("should return an instanceOf XMLHttpRequest", () => {

				const createResult = xmlHttpRequestFactory.create();

				expect(createResult).to.be.an.instanceof(XMLHttpRequestMock);

			});

		});

	});

});
