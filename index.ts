import * as NodeCache from "node-cache";
import {XMLHttpRequest} from "xmlhttprequest";
import {Cache} from "./src/Cache/Cache";
import {DeleteRequest} from "./src/Request/DeleteRequest/DeleteRequest";
import {GetRequest} from "./src/Request/GetRequest/GetRequest";
import {PostRequest} from "./src/Request/PostRequest/PostRequest";
import {PutRequest} from "./src/Request/PutRequest/PutRequest";
import {XMLHttpRequestFactory} from "./src/XMLHttpRequestFactory/XMLHttpRequestFactory";


const nodeCache = new NodeCache( { stdTTL: 43200, checkperiod: 300 }),
	cache = new Cache(nodeCache),
	factory = new XMLHttpRequestFactory(XMLHttpRequest),
	Get = new GetRequest(factory, cache),
	Post = new PostRequest(factory, cache),
	Put = new PutRequest(factory, cache),
	Delete = new DeleteRequest(factory, cache);

export {
	Get,
	Post,
	Put,
	Delete
};


