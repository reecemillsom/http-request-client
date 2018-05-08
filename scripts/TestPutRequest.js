const Put = require("../dist/index.js").Put;

// To test actual request I span up a local http server https://docs.python.org/2/library/simplehttpserver.html.
// Created a file called response.json and requested it with different scenarios to ensure correct things come back.

Put.handleRequest("https://jsonplaceholder.typicode.com/posts/1", null, JSON.stringify({
    title: 'dog',
    id: 100,
    body: 'cat',
    userId: 10
})).then((response) => {

    console.log("response>", response);

}).catch((error) => {

    console.log("error>", error);

});
