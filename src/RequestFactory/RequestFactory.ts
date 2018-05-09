
export class RequestFactory {

	constructor(private request: any) {


	}

	public create(url: string, options?: any) {

		console.log("request>", this.request);

		return new this.request(url, options);

	}

}
