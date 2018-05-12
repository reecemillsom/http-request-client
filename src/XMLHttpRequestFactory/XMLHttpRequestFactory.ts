
export class XMLHttpRequestFactory {

	constructor(private xmlHttpRequest: any) {

	}

	public create(): XMLHttpRequest {

		return new this.xmlHttpRequest();

	}

}
