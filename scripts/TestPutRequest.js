const initialiseRequests = require("../dist/index").initialiseRequests,
    requests = initialiseRequests(); //Can pass the cache config here if you want to make use of it.

requests.put.handleRequest("https://jsonplaceholder.typicode.com/posts/1", null, JSON.stringify({
    title: 'dog',
    id: 100,
    body: 'cat',
    userId: 10
})).then((response) => {

    console.log("response>", response);

}).catch((error) => {

    console.log("error>", error);

});