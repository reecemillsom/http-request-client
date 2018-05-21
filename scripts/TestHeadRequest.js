const head = require("../dist/index").head;

head.handleRequest("https://jsonplaceholder.typicode.com/posts").then((result) => {

    console.log("result>");

});

head.handleRequest("https://jsonplaceholder.typicode.com/posts").then((result) => {

    console.log("result>", result);

}).catch((error) => {

    console.log("error>", error);

});