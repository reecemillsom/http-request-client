const initialiseRequests = require("../dist/index").initialiseRequests,
    requests = initialiseRequests(); //Can pass the cache config here if you want to make use of it.

requests.fetch.handleRequest("https://jsonplaceholder.typicode.com/posts").then((response) => {

    console.log("response>", response);

});

requests.fetch.handleRequest("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    mode: "cors"
}).then((response) => {

    console.log("response>", response);

});