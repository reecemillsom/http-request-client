import {RequestMock} from "./Request/RequestMock";

export class RequestFactoryMock {

	public request: RequestMock;

	constructor(private Request: any) {

		this.request = new this.Request();

	}


	public create(): RequestMock {

		return this.request;

	}


}
