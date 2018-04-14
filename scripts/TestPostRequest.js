const Post = require("../dist/index.js").Post;

// To test actual request I span up a local http server https://docs.python.org/2/library/simplehttpserver.html.
// Created a file called response.json and requested it with different scenarios to ensure correct things come back.

Post.handleRequest("https://jsonplaceholder.typicode.com/posts/101", null, JSON.stringify({
    title: 'dog',
    body: 'cat',
    userId: 200
})).then((response) => {

    console.log("response>", response);

}).catch((error) => {

    console.log("error>", error);

});
