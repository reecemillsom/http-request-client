const initialiseRequests = require("../dist/index").initialiseRequests,
    requests = initialiseRequests(); //Can pass the cache config here if you want to make use of it.

requests.get.handleRequest("https://jsonplaceholder.typicode.com/posts").then((response) => {

    console.log("response>", response);

}).catch((error) => {

    console.log("error>", error);

});