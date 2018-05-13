**Repository**

<https://github.com/reecemillsom/http-request-client>

**Point to Note**

This project uses XMLHttpRequest from the window, so as long as your projects have access to the DOM this will work.

**Installation and Usage**

1. npm i --save http-request-client
2. import {get, post, put, del} from "http-request-client";

Each request type has a handleRequest function which returns a promise result or error. The function has 3 params but only one is required.

Params are:

1. Url type string **required**. This is the url you want to do a request to.
2. Headers type object. This is if you have headers you wish to set when doing a request.
3. Data you wish to send. This is if you have data to send along with the request. Typically when using a put or post request. If your sending JSON, please stringify before passing as a param.

Example of how to pass headers:

```json
{"Content-type": "application/x-www-form-urlencoded"}
```

If you wish to see examples of how to use this module then look at the scripts directory:

<https://github.com/reecemillsom/http-request-client/tree/master/scripts>

You can run these if you clone the project and do e.g. ```node scripts/filename.js``` assuming you are in root of project. Change the urls, use headers and become familiar with how to use it.

**Cache**

This module uses a caching module to store previous get request results for 12 hours.

**Issues**

If you find an issue please feel free to contact me, or open an issue on the project and I will look into it as soon as I can.