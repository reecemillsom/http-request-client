import * as Bluebird from "bluebird";
import {Request} from "../Request";

export class GetRequest extends Request {

	public async handleRequest(url: string, headers?: object) {

		return await this.getResponse(url, headers);

	}

	private getResponse(url: string, headers?: object):Bluebird<object> {

		if (!url) {

			return Bluebird.reject({ error: "Please provide a url"});

		}

		const xmlHttpRequest = this.xmlHttpRequestFactory.create();

		xmlHttpRequest.open("GET", url, true);

		this.setRequestHeaders(xmlHttpRequest, headers);

		return new Bluebird((resolve, reject) => {

			xmlHttpRequest.onload = () => {

				if (xmlHttpRequest.readyState === 4) {

					if (!this.isResponseValid(xmlHttpRequest)) {

						return reject({ error: "Request didn't come back valid" });

					}

					return this.parseResponse(xmlHttpRequest.responseText).then((response) => {

						return resolve(response);

					}).catch((error) => {

						return reject(error);

					});

				}

			};

			xmlHttpRequest.send();

		});

	}


	private isResponseValid(xmlHttpRequest: XMLHttpRequest): boolean {

		return xmlHttpRequest.status >= 200 && xmlHttpRequest.status < 400;

	}


	private parseResponse(responseText: string): Bluebird<object> {

		return Bluebird.attempt(() => {

			return JSON.parse(responseText);

		});

	}


}
