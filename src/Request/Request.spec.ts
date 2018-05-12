import * as chai from "chai";
import {expect} from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
import {CacheMock} from "../Cache/CacheMock";
import {NodeCacheMock} from "../Cache/NodeCache/NodeCacheMock";
import {XMLHttpRequestMock} from "../XMLHttpRequestFactory/XMLHttpRequest/XMLHttpRequestMock";
import {XMLHttpRequestFactoryMock} from "../XMLHttpRequestFactory/XMLHttpRequestFactoryMock";
import {Request} from "./Request";

chai.use(sinonChai);

class MockClass extends Request {

	constructor(httpRequestFactory, cache) {

		super(httpRequestFactory, cache);

	}

	public handleRequest(url, headers, data) {

		const xmlHttpRequest = this.xmlHttpRequestFactory.create();

		this.setRequestHeaders(xmlHttpRequest, headers);

	}

}

describe("Request", () => {

	let mockClass,
		httpRequestFactoryMock;

	before(() => {

		const nodeCacheMock = new NodeCacheMock(),
			cacheMock = new CacheMock(nodeCacheMock);

		httpRequestFactoryMock = new XMLHttpRequestFactoryMock(XMLHttpRequestMock);

		mockClass = new MockClass(httpRequestFactoryMock, cacheMock);

	});

	describe("when set request headers is called", () => {

		describe("when headers are provided", () => {

			let setRequestHeaderSpy;

			beforeEach(() => {

				setRequestHeaderSpy = sinon.spy(httpRequestFactoryMock.xmlHttp, "setRequestHeader");

			});

			it("will set headers for all data in the object", () => {


				mockClass.handleRequest("mockurl", { value: false, value2: true }, null);

				expect(setRequestHeaderSpy.getCall(0)).to.have.been.calledWith("value", false);
				expect(setRequestHeaderSpy.getCall(1)).to.have.been.calledWith("value2", true);

			});

		});

	});

});
