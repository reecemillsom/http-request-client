import * as NodeCache from "node-cache";
import {Cache} from "./src/Cache/Cache";
import {DeleteRequest} from "./src/Request/DeleteRequest/DeleteRequest";
import {FetchRequest} from "./src/Request/FetchRequest/FetchRequest";
import {GetRequest} from "./src/Request/GetRequest/GetRequest";
import {HeadRequest} from "./src/Request/HeadRequest/HeadRequest";
import {PostRequest} from "./src/Request/PostRequest/PostRequest";
import {PutRequest} from "./src/Request/PutRequest/PutRequest";
import {RequestFactory} from "./src/RequestFactory/RequestFactory";
import {XMLHttpRequestFactory} from "./src/XMLHttpRequestFactory/XMLHttpRequestFactory";

export function initialiseRequests(cacheOptions?: object) {

	const nodeCache = initialiseCache(cacheOptions),
		cache = new Cache(nodeCache),
		factory = new XMLHttpRequestFactory(XMLHttpRequest),
		requestFactory = new RequestFactory(Request);

	return {
		get: new GetRequest(factory, cache),
		head: new HeadRequest(factory),
		post: new PostRequest(factory),
		put: new PutRequest(factory),
		del: new DeleteRequest(factory),
		fetch: new FetchRequest(requestFactory, window, cache)
	};

}

function initialiseCache(cacheOptions?: object) {

	if (cacheOptions) {

		return new NodeCache(cacheOptions);

	}

	return new NodeCache();

}

