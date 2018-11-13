import * as Bluebird from "bluebird";
import {RequestFactory} from "../../RequestFactory/RequestFactory";

export class FetchRequest {

  	//TODO remove window from here as a parameter
	constructor(private requestFactory: RequestFactory, private window: any) {


	}

	public async handleRequest(url: string, options?: any) {

		if (!url) {

			return Bluebird.reject( { error: "Please provide a url" });

		}

		//TODO this.window remove. Just call fetch as a function
		const request = this.requestFactory.create(url, options),
			response = await this.window.fetch(request);

		if (response.ok) return this.handleResponseBody(response);

		return Bluebird.reject({ error: "Failed to fetch", statusCode: response.status });

	}


	private async handleResponseBody(response: any): Bluebird<object>  {

		const responseBody = await this.handleResponseTypes(response);

		return Bluebird.resolve(responseBody);

	}


	private async handleResponseTypes(response: any): Bluebird<any> {

		let content: any;

		try {

			content = await response.json();

		} catch(error) {

			content = response;

		}

		return Bluebird.resolve(content);

	}

}
