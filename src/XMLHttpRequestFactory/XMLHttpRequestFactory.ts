
export class XMLHttpRequestFactory {

	constructor(private xmlHttpRequest: any) {

	}

	public create() {

		if (!this.xmlHttpRequest) {

			throw Error("Error need valid XMLHttpRequest object");

		}

		return new this.xmlHttpRequest();

	}

}
