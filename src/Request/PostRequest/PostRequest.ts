import * as Bluebird from "bluebird";
import {Request} from "../Request";

export class PostRequest extends Request {

	public async handleRequest(url: string, headers?: object, data?: any) {

		if (!url) {

			return Bluebird.reject({ error: "Please provide a url" });

		}

		return await this.postRequest(url, headers, data);


	}


	private postRequest(url: string, headers?: object, data?: any): Bluebird<object> {

		const xmlHttpRequest = this.xmlHttpRequestFactory.create();

		xmlHttpRequest.open("POST", url, true);

		this.setRequestHeaders(xmlHttpRequest, headers);

		return new Bluebird((resolve, reject) => {

			xmlHttpRequest.onload = () => {

				if (this.isRequestSuccessful(xmlHttpRequest)) {

					return resolve(xmlHttpRequest.responseText);

				}

				return reject({ error: "POST was unsuccessful", statusCode: xmlHttpRequest.status });

			};

			xmlHttpRequest.send(data);

		});

	}

}
