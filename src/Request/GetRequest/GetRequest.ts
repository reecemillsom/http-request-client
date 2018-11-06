import * as Bluebird from "bluebird";
import {Request} from "../Request";

export class GetRequest extends Request {

	public async handleRequest(url: string, headers?: object, data?: any) {

		if (!url) {

			return Bluebird.reject({ error: "Please provide a url"});

		}

		if (this.isCachePresent() && this.isValueInCache(url)) {

			return Bluebird.resolve(this.cache.get(url));

		}

		return await this.getResponse(url, headers, data);

	}


	private getResponse(url: string, headers?: object, data?: any): Bluebird<object> {

		const xmlHttpRequest = this.xmlHttpRequestFactory.create();

		xmlHttpRequest.open("GET", url, true);

		this.setRequestHeaders(xmlHttpRequest, headers);

		return new Bluebird((resolve, reject) => {

			xmlHttpRequest.onload = () => {

				if (xmlHttpRequest.readyState === 4) {

					if (!this.isRequestSuccessful(xmlHttpRequest)) {

						return reject({ error: "Request didn't come back valid" });

					}


					try {

						const result = this.parseResponse(xmlHttpRequest.responseText);

						if (this.isCachePresent()) {

							this.cache.set(url, result);

						}

						return resolve(result);


					} catch (error) {

						return resolve(xmlHttpRequest.responseText);

					}

				}

			};

			xmlHttpRequest.send();

		});

	}



	private parseResponse(responseText: string): object {

		return JSON.parse(responseText);

	}


	protected isCachePresent() {

		return !!this.cache;

	}


}
