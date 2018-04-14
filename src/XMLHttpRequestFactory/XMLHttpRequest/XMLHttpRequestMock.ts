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

	public send(data) {

		if (data) {


			return this.onreadystatechange();

		}


		this.onload();


	}

	public onreadystatechange() {


	}

	public onload() {


	}

}
