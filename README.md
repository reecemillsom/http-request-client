**Repository**

<https://github.com/reecemillsom/http-request-client>

[![codecov](https://img.shields.io/travis/reecemillsom/http-request-client.svg)](https://codecov.io/gh/reecemillsom/http-request-client)
[![codecov](https://img.shields.io/codecov/c/github/reecemillsom/http-request-client.svg)](https://codecov.io/gh/reecemillsom/http-request-client)
[![codecov](https://img.shields.io/david/reecemillsom/http-request-client.svg)](https://codecov.io/gh/reecemillsom/http-request-client)
  

## Point to Note

This project uses XMLHttpRequest from the window and the fetch function depending on which request you do, so as long as your projects have access to the DOM this will work.

## Installation and Usage

1. npm i --save http-request-client
2. import { Get, Head, Post, Put, Del, Fetch, XMLHttpFactory, FetchRequestFactory } from "http-request-client";

For all XMLHttpRequest types e.g. Get, Head, Post, Put, Del:

```
    const xmlHttpFactory = new XMLHttpFactory(XMLHttpRequest);
    const get = new Get(xmlHttpFactory);
```

For Fetch:


```
    const requestFactory = new FetchRequestFactory(Request);
    const fetch = new Fetch(requestFactory, window);
```

All of the above have a handleRequest function that is the entry for all requests which can be called once the request class is instantiated.

## GET, POST, PUT, DELETE, HEAD request

GET request tries to parse the response to JSON, if this fails it will return the whole response anyways.

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

Fetch request will try to parse the response to JSON, if not it will return the whole response. This means if your content isn't json you can call .blob(), .text() and more for what you need.

Request type **fetch** has a handleRequest function which returns a promise result or error. This function only has 2 params.

**Params are:**

1. **Url type string required**. This is the url you want to do a request to.
2. **Options type object**. This is to be able to change type of request e.g. POST, GET or maybe change cache rules etc. To see full list of options visit: <https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch> and look at the init param options. By default fetch request does a GET request.

If using fetch be aware the current support of this function is for more recent browser versions, so use it if your not bothered about supporting older versions or do not need certain functionality.

## Examples of requests

To see examples of how to structure each request visit:

<https://github.com/reecemillsom/http-request-client/tree/master/scripts>

These scripts will not run in this context as it has no access to window. Easiest way to test this is to install yourself and use in a project.

## Issues

If you find an issue please feel free to contact me, or open an issue on the project and I will look.
