import {XMLHttpRequest} from "xmlhttprequest";
import {DeleteRequest} from "./src/Request/DeleteRequest/DeleteRequest";
import {GetRequest} from "./src/Request/GetRequest/GetRequest";
import {PostRequest} from "./src/Request/PostRequest/PostRequest";
import {PutRequest} from "./src/Request/PutRequest/PutRequest";
import {XMLHttpRequestFactory} from "./src/XMLHttpRequestFactory/XMLHttpRequestFactory";

const factory = new XMLHttpRequestFactory(XMLHttpRequest),
	Get = new GetRequest(factory),
	Post = new PostRequest(factory),
	Put = new PutRequest(factory),
	Delete = new DeleteRequest(factory);

export {
	Get,
	Post,
	Put,
	Delete
};


