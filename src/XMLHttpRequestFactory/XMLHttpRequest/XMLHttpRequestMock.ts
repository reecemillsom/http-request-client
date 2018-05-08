export class XMLHttpRequestMock {

	public responseText: string;
	public readyState: number;
	public status: number;

	constructor() {


	}



	public open(method: string, url: string, async: boolean) {


	}

	public setRequestHeader(header: string, value: string) {


	}

	public send() {


		this.onload();


	}

	public onload() {


	}

}
