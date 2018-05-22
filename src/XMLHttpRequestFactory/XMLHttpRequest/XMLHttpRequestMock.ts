export class XMLHttpRequestMock {

	public responseText: string;
	public readyState: number;
	public status: number;
	public headers: any;

	constructor() {


	}



	public open(method: string, url: string, async: boolean) {


	}

	public setRequestHeader(header: string, value: string) {


	}


	getAllResponseHeaders() {

		return this.headers;

	}


	public send() {


		this.onload();


	}

	public onload() {


	}

}
