const initialiseRequests = require("../dist/index").initialiseRequests,
    requests = initialiseRequests(); //Can pass the cache config here if you want to make use of it.

requests.post.handleRequest("https://jsonplaceholder.typicode.com/posts", null, JSON.stringify({
    title: 'dog',
    body: 'cat',
    userId: 200
})).then((response) => {

    console.log("response>", response);

}).catch((error) => {

    console.log("error>", error);

});