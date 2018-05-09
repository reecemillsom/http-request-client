const Get = require("../dist/index").get;

// To test actual request I span up a local http server https://docs.python.org/2/library/simplehttpserver.html.
// Created a file called response.json and requested it with different scenarios to ensure correct things come back.

Get.handleRequest("http://localhost:8000/Documents/Example%20payloads/response.json").then((response) => {

    console.log("response>", response);

});

Get.handleRequest("").catch((error) => {

    console.log("error>", error);

});

Get.handleRequest("http://localhost:8000/Documents/Example%20payloa/response.json").catch((error) => {

    console.log("error>", error);

});