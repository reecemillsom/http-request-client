import * as Bluebird from "bluebird";

export class HttpClient {

	constructor(private xmlHttpRequestFactory: any) {


	}


	public async get(url: string) {

		return await this.getResponse(url);

	}

	private getResponse(url: string):Bluebird<object> {

		if (!url) {

			return Bluebird.reject({ error: "Please provide a url"});

		}

		const xmlHttpRequest = this.xmlHttpRequestFactory.create();

		xmlHttpRequest.open("GET", url, true);

		console.log("SHIT");

		xmlHttpRequest.onload = () => {

			if (xmlHttpRequest.readyState === 4) {

				console.log("BOO");

				if (!this.isResponseValid(xmlHttpRequest)) {

					console.log("HERE");

					return Bluebird.reject({ error: "Request didn't come back valid" });

				}

				console.log("respnonse>", this.parseResponse(xmlHttpRequest.responseText));

				return this.parseResponse(xmlHttpRequest.responseText);

			}

		};

		xmlHttpRequest.send();

	}


	private isResponseValid(xmlHttpRequest: XMLHttpRequest): boolean {

		return xmlHttpRequest.status >= 200 && xmlHttpRequest.status < 400;

	}


	private parseResponse(responseText: string): Bluebird<object> {

		let parsedResponse;

		try {

			parsedResponse = JSON.parse(responseText);

		} catch(error) {

			console.log("error>", error);

			return Bluebird.reject({ error: error });

		}

		console.log("parsedResponse>", parsedResponse);


		return Bluebird.resolve(parsedResponse);

	}


}
