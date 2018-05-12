const Put = require("../dist/index.js").Put;

//I tested this by using a fake online rest api called https://jsonplaceholder.typicode.com/

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