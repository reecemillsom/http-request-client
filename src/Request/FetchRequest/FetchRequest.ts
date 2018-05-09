import * as Bluebird from "bluebird";
import {RequestFactory} from "../../RequestFactory/RequestFactory";

export class FetchRequest {


	constructor(private requestFactory: RequestFactory) {



	}

	public async handleRequest(url: string, options?: any) {

		if (!url) {

			return Bluebird.reject( { error: "Please provide a url" });

		}

		const request = this.requestFactory.create(url, options),
			response = await fetch(request);

		if (response.ok) return await response.json();

		return Bluebird.reject({ error: "Failed to fetch", statusCode: response.status });

	}

}
