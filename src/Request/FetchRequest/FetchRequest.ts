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


	private isValueInCache(url: string): boolean {

		const cacheValue = this.cache.get(url);

		return !!cacheValue;

	}


	private async handleResponseBody(url: string, response: any, options: any): Bluebird<object>  {

		const responseBody = await this.handleResponseTypes(response);

		if (this.isRequestGet(options)) {

			this.cache.set(url, responseBody);

		}

		return Bluebird.resolve(responseBody);

	}



	private isRequestGet(options: any): boolean {

		return !options || options.method === "GET";

	}


	private async handleResponseTypes(response: any): Bluebird<any> {

		const headers = response.headers.get("content-type");

		switch (headers) {

			case "application/json":

				return Bluebird.resolve(await response.json());

			case "text/html":

				return Bluebird.resolve(await response.text());

			default:

				return Bluebird.resolve(response);

		}

	}


}
