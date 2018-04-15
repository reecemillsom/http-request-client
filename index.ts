import {XMLHttpRequest} from "xmlhttprequest";
import {GetRequest} from "./src/Request/GetRequest/GetRequest";
import {PostRequest} from "./src/Request/PostRequest/PostRequest";
import {XMLHttpRequestFactory} from "./src/XMLHttpRequestFactory/XMLHttpRequestFactory";

const factory = new XMLHttpRequestFactory(XMLHttpRequest),
	Get = new GetRequest(factory),
	Post = new PostRequest(factory);

export {
	Get,
	Post
};


