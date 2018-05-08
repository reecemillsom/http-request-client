const Post = require("../dist/index.js").Post;

//I tested this by using a fake online rest api called https://jsonplaceholder.typicode.com/

Post.handleRequest("https://jsonplaceholder.typicode.com/posts", null, JSON.stringify({
    title: 'dog',
    body: 'cat',
    userId: 200
})).then((response) => {

    console.log("response>", response);

}).catch((error) => {

    console.log("error>", error);

});
