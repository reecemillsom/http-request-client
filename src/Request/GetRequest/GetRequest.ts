import * as Bluebird from "bluebird";
import {Request} from "../Request";

export class GetRequest extends Request {

	//TODO this will have to change to be of type Request instead of string.
	public async handleRequest(url: string, headers?: object, data?: any) {

		if (!url) {

			return Bluebird.reject({error: "Please provide a url"});

		}

		return await this.getResponse(url, headers, data);

	}

	//TODO this will have to change to be of type Request instead of string.
	private getResponse(url: string, headers?: object, data?: any): Bluebird<object> {

		const xmlHttpRequest = this.xmlHttpRequestFactory.create();

		xmlHttpRequest.open("GET", url, true);

		this.setRequestHeaders(xmlHttpRequest, headers);

		return new Bluebird((resolve, reject) => {

			xmlHttpRequest.onload = () => {

				if (xmlHttpRequest.readyState === 4) {

					if (!this.isRequestSuccessful(xmlHttpRequest)) {

						return reject({error: "Request didn't come back valid"});

					}

					//TODO if understood responseType correctly won't need to try resolve manually, just resolve the returned value from the server.
					try {

						const result = this.parseResponse(xmlHttpRequest.responseText);

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


}
