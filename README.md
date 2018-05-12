**Installation and Usage**

1. npm i --save http-request-client
2. import {Get, Post, Put, Delete} from "http-request-client";

Each request type has a handle request function. They have 3 params but only one is required.

Params are:

1. Url type string *required. This is the url you want to do a request to.
2. Headers type object. This is if you have headers you wish to set when doing a request.
3. Data you wish to send. This is if you have data to send along with the request. Typically when using a put or delete request. If your sending JSON, please stringify before passing as a param.

Example of how to pass headers:

```json
{"Content-type": "application/x-www-form-urlencoded"}
```

Return value will be either a error result saying that the request was unsuccessful or successful, or in the case of Get request it may contain a JSON result.
