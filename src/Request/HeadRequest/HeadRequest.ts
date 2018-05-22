import * as Bluebird from "bluebird";
import * as _ from "lodash";
import {Request} from "../Request";

export class HeadRequest extends Request {

	public async handleRequest(url: string, headers?: object, data?: any) {

		if (!url) {

			return Bluebird.reject({ error: "Please provide a url"});

		}

		return await this.headResponse(url, headers, data);

	}


	private headResponse(url: string, headers?: object, data?:any): Bluebird<object> {

		const xmlHttpRequest = this.xmlHttpRequestFactory.create();

		xmlHttpRequest.open("HEAD", url, true);

		this.setRequestHeaders(xmlHttpRequest, headers);

		return new Bluebird((resolve, reject) => {

			xmlHttpRequest.onload = () => {

				if (!this.isRequestSuccessful(xmlHttpRequest)) {

					return reject({ error: "Request didn't come back valid", statusCode: xmlHttpRequest.status });

				}

				return resolve(this.formatHeaders(xmlHttpRequest.getAllResponseHeaders()));


			};

			xmlHttpRequest.send();

		});

	}

	private formatHeaders(responseHeaders: string): object {

		const headers = responseHeaders.trim().split(/[\r\n]+/);

		return _.reduce(headers, (formattedHeaders: object, header: string) => {

			const parts = header.split(": ");

			formattedHeaders[parts[0]] = parts[1];

			return formattedHeaders;

		}, {});

	}

}
