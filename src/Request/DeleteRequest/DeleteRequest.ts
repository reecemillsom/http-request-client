import * as Bluebird from "bluebird";
import {Request} from "../Request";

export class DeleteRequest extends Request {

	public async handleRequest(url: string, headers?: object, data?: any) {

		if (!url) {

			return Bluebird.reject( { error: "Please provide a url" });

		}

		return await this.deleteRequest(url, headers, data);


	}


	private deleteRequest(url: string, headers?: object, data?: any) {

		const xmlHttpRequest = this.xmlHttpRequestFactory.create();

		xmlHttpRequest.open("DELETE", url, true);

		this.setRequestHeaders(xmlHttpRequest, headers);

		return new Bluebird((resolve, reject) => {

			xmlHttpRequest.onload = () => {

				if (this.isRequestSuccessful(xmlHttpRequest)) {


					return resolve(xmlHttpRequest.responseText);

				}


				return reject({ error: "DELETE was unsuccessful", statusCode: xmlHttpRequest.status });

			};


			xmlHttpRequest.send();

		});

	}


}
