import {XMLHttpRequest} from "xmlhttprequest";
import {HttpClient} from "./src/HttpClient/HttpClient";
import {XMLHttpRequestFactory} from "./src/XMLHttpRequestFactory/XMLHttpRequestFactory";

export = () => {

	const factory = new XMLHttpRequestFactory(XMLHttpRequest);

	return new HttpClient(factory);

};
