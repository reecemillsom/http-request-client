import * as XMLHttpRequest from "xmlhttprequest";
import {DeleteRequest} from "./src/Request/DeleteRequest/DeleteRequest";
import {FetchRequest} from "./src/Request/FetchRequest/FetchRequest";
import {GetRequest} from "./src/Request/GetRequest/GetRequest";
import {PostRequest} from "./src/Request/PostRequest/PostRequest";
import {PutRequest} from "./src/Request/PutRequest/PutRequest";
import {RequestFactory} from "./src/RequestFactory/RequestFactory";
import {XMLHttpRequestFactory} from "./src/XMLHttpRequestFactory/XMLHttpRequestFactory";

const factory = new XMLHttpRequestFactory(XMLHttpRequest),
	requestFactory = new RequestFactory(Request),
	get = new GetRequest(factory),
	post = new PostRequest(factory),
	put = new PutRequest(factory),
	del = new DeleteRequest(factory),
	fetch = new FetchRequest(requestFactory);

export {
	get,
	post,
	put,
	del,
	fetch
};
