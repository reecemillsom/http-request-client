import * as Bluebird from "bluebird";
import {Request} from "../Request";

export class GetRequest extends Request {

	public async handleRequest(url: string, headers?: object, data?: any) {

		if (!url) {

			return Bluebird.reject({ error: "Please provide a url"});

		}

		if (this.isValueInCache(url)) {

			return Bluebird.resolve(this.cache.get(url));

		}

		return await this.getResponse(url, headers, data);

	}


	private getResponse(url: string, headers?: object, data?:any):Bluebird<object> {

		const xmlHttpRequest = this.xmlHttpRequestFactory.create();

		xmlHttpRequest.open("GET", url, true);

		this.setRequestHeaders(xmlHttpRequest, headers);

		return new Bluebird((resolve, reject) => {

			xmlHttpRequest.onload = () => {

				if (xmlHttpRequest.readyState === 4) {

					if (!this.isRequestSuccessful(xmlHttpRequest)) {

						return reject({ error: "Request didn't come back valid" });

					}

					return this.parseResponse(xmlHttpRequest.responseText).then((response) => {

						this.cache.set(url, response);

						return resolve(response);

					}).catch((error) => {

						return reject(error);

					});

				}

			};

			xmlHttpRequest.send();

		});

	}


	private isValueInCache(url: string): boolean {

		const cacheValue = this.cache.get(url);

		return !!cacheValue;

	}


	private parseResponse(responseText: string): Bluebird<object> {

		return Bluebird.attempt(() => {

			return JSON.parse(responseText);

		});

	}


}
