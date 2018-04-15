import {XMLHttpRequest} from "xmlhttprequest";

export class XMLHttpRequestFactory {

	constructor(private xmlHttpRequest: XMLHttpRequest) {

	}

	public create(): XMLHttpRequest {

		return new this.xmlHttpRequest();

	}

}
