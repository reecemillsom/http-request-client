**Repository**

<https://github.com/reecemillsom/http-request-client>

**Point to Note**

This project uses XMLHttpRequest from the window, so as long as your projects have access to the DOM this will work.

**Installation and Usage**

1. npm i --save http-request-client
2. import {get, post, put, del, fetch} from "http-request-client";

Request types get, post, put, delete have a handleRequest function which returns a promise result or error. The function has 3 params but only one is required.

Params are:

1. Url type string **required**. This is the url you want to do a request to.
2. Headers type object. This is if you have headers you wish to set when doing a request.
3. Data you wish to send. This is if you have data to send along with the request. Typically when using a put or post request. If your sending JSON, please stringify before passing as a param.

Example of how to pass headers:

```json
{"Content-type": "application/x-www-form-urlencoded"}
```

Request type fetch has a handleRequest function which returns a promise result or error. This function only has 2 params.

Params are:

1. Url type string **required**. This is the url you want to do a request to.
2. Options type object. This is to be able to change type of request e.g. POST, GET or maybe change cache rules etc. To see full list of options visit: <https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch> and look at the init param options.

If using fetch be aware the current support of this function is for more recent browser versions, so use it if your not bothered about supporting older versions.

To see examples of how to structure each request visit:

<https://github.com/reecemillsom/http-request-client/tree/master/scripts>

These scripts will not run in this context as it has no access to window. Easiest way to test this is to install yourself and use in a project.

**Cache**

This module uses a caching module to store previous get request results for 12 hours.

**Issues**

If you find an issue please feel free to contact me, or open an issue on the project and I will look into it as soon as I can.