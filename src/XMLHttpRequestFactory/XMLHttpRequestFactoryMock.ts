import {XMLHttpRequestMock} from "./XMLHttpRequest/XMLHttpRequestMock";

export class XMLHttpRequestFactoryMock {

	public xmlHttp: XMLHttpRequestMock;

	constructor(private XMLHttpRequest: any) {

		this.xmlHttp = new this.XMLHttpRequest();

	}


	public create(): XMLHttpRequestMock {

		return this.xmlHttp;

	}


}
