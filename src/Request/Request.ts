import * as _ from "lodash";

export abstract class Request {

	constructor(protected xmlHttpRequestFactory: any) {


	}

	public abstract async handleRequest(url: string, headers?: object, data?: any);


	protected setRequestHeaders(xmlHttpRequest: XMLHttpRequest, headers: object) {

		_.each(headers,(value, key) => {

			xmlHttpRequest.setRequestHeader(key, value);

		});

	}

}
