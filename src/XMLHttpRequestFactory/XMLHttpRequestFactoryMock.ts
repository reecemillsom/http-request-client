import {XMLHttpRequestMock} from "./XMLHttpRequest/XMLHttpRequestMock";

export class XMLHttpRequestFactoryMock {

	constructor(private XMLHttpRequest: any) {

	}


	public create(): XMLHttpRequestMock {

		return new this.XMLHttpRequest();

	}


}
