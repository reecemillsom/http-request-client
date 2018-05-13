import * as NodeCache from "node-cache";
import {Cache} from "./src/Cache/Cache";
import {DeleteRequest} from "./src/Request/DeleteRequest/DeleteRequest";
import {FetchRequest} from "./src/Request/FetchRequest/FetchRequest";
import {GetRequest} from "./src/Request/GetRequest/GetRequest";
import {PostRequest} from "./src/Request/PostRequest/PostRequest";
import {PutRequest} from "./src/Request/PutRequest/PutRequest";
import {RequestFactory} from "./src/RequestFactory/RequestFactory";
import {XMLHttpRequestFactory} from "./src/XMLHttpRequestFactory/XMLHttpRequestFactory";

const nodeCache = new NodeCache( { stdTTL: 43200, checkperiod: 300 }),
	cache = new Cache(nodeCache),
	factory = new XMLHttpRequestFactory(XMLHttpRequest),
	requestFactory = new RequestFactory(Request),
	get = new GetRequest(factory, cache),
	post = new PostRequest(factory, cache),
	put = new PutRequest(factory, cache),
	del = new DeleteRequest(factory, cache),
	fetch = new FetchRequest(requestFactory, window);

export {
	get,
	post,
	put,
	del,
	fetch
};


