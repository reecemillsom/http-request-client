import {DeleteRequest} from "./src/Request/DeleteRequest/DeleteRequest";
import {FetchRequest} from "./src/Request/FetchRequest/FetchRequest";
import {GetRequest} from "./src/Request/GetRequest/GetRequest";
import {HeadRequest} from "./src/Request/HeadRequest/HeadRequest";
import {PatchRequest} from "./src/Request/PatchRequest/PatchRequest";
import {PostRequest} from "./src/Request/PostRequest/PostRequest";
import {PutRequest} from "./src/Request/PutRequest/PutRequest";
import {RequestFactory} from "./src/RequestFactory/RequestFactory";
import {XMLHttpRequestFactory} from "./src/XMLHttpRequestFactory/XMLHttpRequestFactory";

export {
	GetRequest as Get,
	HeadRequest as Head,
	PatchRequest as Patch,
	PostRequest as Post,
	PutRequest as Put,
	DeleteRequest as Del,
	FetchRequest as Fetch,
	XMLHttpRequestFactory as XMLHttpFactory,
	RequestFactory as FetchRequestFactory,
}


