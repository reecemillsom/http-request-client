import {XMLHttpRequest} from "xmlhttprequest";
import {GetRequest} from "./src/Request/GetRequest/GetRequest";
import {XMLHttpRequestFactory} from "./src/XMLHttpRequestFactory/XMLHttpRequestFactory";

const factory = new XMLHttpRequestFactory(XMLHttpRequest),
	Get = new GetRequest(factory);

export {
	Get
};


