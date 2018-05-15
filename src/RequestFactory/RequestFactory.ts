
export class RequestFactory {

	constructor(private request: any) {


	}

	public create(url: string, options?: any) {

		return new this.request(url, options);

	}

}
