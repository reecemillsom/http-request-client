import * as Bluebird from "bluebird";
import {Cache} from "../../Cache/Cache";
import {RequestFactory} from "../../RequestFactory/RequestFactory";

export class FetchRequest {


	constructor(private requestFactory: RequestFactory, private window: any, private cache: Cache) {


	}

	public async handleRequest(url: string, options?: any) {

		if (!url) {

			return Bluebird.reject( { error: "Please provide a url" });

		}

		if (this.isValueInCache(url)) {

			return Bluebird.resolve(this.cache.get(url));

		}

		const request = this.requestFactory.create(url, options),
			response = await this.window.fetch(request);

		if (response.ok) return this.handleResponseBody(url, response, options);

		return Bluebird.reject({ error: "Failed to fetch", statusCode: response.status });

	}


	private isValueInCache(url: string) {

		const cacheValue = this.cache.get(url);

		return !!cacheValue;

	}


	private async handleResponseBody(url: string, response: any, options: any): Bluebird<object>  {

		const responseBody = await response.json();

		if (this.isRequestGet(options)) {

			this.cache.set(url, responseBody);

		}

		return Bluebird.resolve(responseBody);

	}



	private isRequestGet(options: any): boolean {

		return !options || options.method === "GET";

	}


}
