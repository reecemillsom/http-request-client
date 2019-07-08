import * as _ from "lodash";

export enum ResponseType {
	ArrayBuffer = 'arraybuffer',
	Blob = 'blob',
	Document = 'document',
	Json = 'json',
	Text = 'text'
}

export interface Request {
	url: string;
	responseType: ResponseType;
}

export abstract class Request {

	constructor(protected xmlHttpRequestFactory: any) {


	}

	//TODO change this to use type Request rather than string.
	public abstract async handleRequest(url: string, headers?: object, data?: any);


	protected setRequestHeaders(xmlHttpRequest: XMLHttpRequest, headers: object) {

		_.each(headers, (value, key) => {

			xmlHttpRequest.setRequestHeader(key, value);

		});

	}

	protected isRequestSuccessful(xmlHttpRequest: XMLHttpRequest): boolean {

		const statusCode = xmlHttpRequest.status;

		return xmlHttpRequest.readyState === 4 && (statusCode >= 200 && statusCode < 400);

	}

}
