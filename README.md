**Repository**

<https://github.com/reecemillsom/http-request-client>

## Point to Note

This project uses XMLHttpRequest from the window and the fetch function depending on which request you do, so as long as your projects have access to the DOM this will work.

## Installation and Usage

1. npm i --save http-request-client
2. import { initialiseRequests } from "http-request-client";

initialiseRequests is a function which allows an optional cache config to be passed in as a parameter as an object:

```
    initialiseRequests(); or initialiseRequests({ stdTTL: 32000 });
```

To look at the options you can enter for the cache: <https://www.npmjs.com/package/node-cache#options>

Currently caching results is only used for GET request and if fetch method is GET. The config you pass will determine how long for etc, depending on the options you pass.

When calling initialiseRequests whether it be with a cache config or not, it will return you all request types as an object. e.g. get, post, put, delete, head, fetch which all have a handleRequest function which will either return a promise or error.

## GET, POST, PUT, DELETE, HEAD request

For Request types **get, post, put, delete, head** a handleRequest function should be called which returns a promise result or error. The function has 3 params but only one is required.

Params are:

1. **Url type string required**. This is the url you want to do a request to.
2. **Headers type object**. This is if you have headers you wish to set when doing a request.
3. Data you wish to send. This is if you have data to send along with the request. Typically when using a put or post request. Please stringify data before passing as a param.

Example of how to pass headers:

```json
{"Content-type": "application/x-www-form-urlencoded"}
```

## Fetch request

Request type **fetch** has a handleRequest function which returns a promise result or error. This function only has 2 params.

**Params are:**

1. **Url type string required**. This is the url you want to do a request to.
2. **Options type object**. This is to be able to change type of request e.g. POST, GET or maybe change cache rules etc. To see full list of options visit: <https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch> and look at the init param options. By default fetch request does a GET request.

If using fetch be aware the current support of this function is for more recent browser versions, so use it if your not bothered about supporting older versions.

## Examples of requests

To see examples of how to structure each request visit:

<https://github.com/reecemillsom/http-request-client/tree/master/scripts>

These scripts will not run in this context as it has no access to window. Easiest way to test this is to install yourself and use in a project.

## Issues

If you find an issue please feel free to contact me, or open an issue on the project and I will look.