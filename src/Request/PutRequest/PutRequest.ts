import * as Bluebird from "bluebird";
import {Request} from "../Request";

export class PutRequest extends Request {

	public async handleRequest(url: string, headers?: object, data?: any) {

		if (!url) {

			return Bluebird.reject({error: "Please provide a url"});

		}

		return await this.putRequest(url, headers, data);


	}


	private putRequest(url: string, headers?: object, data?: any) {

		const xmlHttpRequest = this.xmlHttpRequestFactory.create();

		xmlHttpRequest.open("PUT", url, true);

		this.setRequestHeaders(xmlHttpRequest, headers);

		return new Bluebird((resolve, reject) => {

			xmlHttpRequest.onreadystatechange = () => {

				if (this.isRequestSuccessful(xmlHttpRequest)) {

					return resolve(xmlHttpRequest.responseText);

				}

				return reject({ error: "PUT was unsuccessful", statusCode: xmlHttpRequest.status });

			};


			xmlHttpRequest.send(data);

		});

	}

	private isRequestSuccessful(xmlHttpRequest: XMLHttpRequest): boolean {

		const statusCode = xmlHttpRequest.status;

		return xmlHttpRequest.readyState === 4 && (statusCode >= 200 && statusCode < 400);

	}

}
