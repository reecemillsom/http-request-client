import * as Bluebird from "bluebird";
import {Request} from "../Request";

export class PatchRequest extends Request {

	public async handleRequest(url: string, headers?: object, data?: any) {

		if (!url) {

			return Bluebird.reject( { error: "Please provide a url" });

		}

		return await this.patchRequest(url, headers, data);


	}


	private patchRequest(url: string, headers?: object, data?: any): Bluebird<object> {

		const xmlHttpRequest = this.xmlHttpRequestFactory.create();

		xmlHttpRequest.open("PATCH", url, true);

		this.setRequestHeaders(xmlHttpRequest, headers);

		return new Bluebird((resolve, reject) => {

			xmlHttpRequest.onload = () => {

				if (this.isRequestSuccessful(xmlHttpRequest)) {

					return resolve(xmlHttpRequest.responseText);

				}

				return reject({ error: "PATCH was unsuccessful", statusCode: xmlHttpRequest.status });

			};


			xmlHttpRequest.send(data);

		});

	}


}
