const Delete = require("../dist/index").Delete;

//I tested this by using a fake online rest api called https://jsonplaceholder.typicode.com/

Delete.handleRequest("https://jsonplaceholder.typicode.com/posts/1").then((response) => {

    console.log("response>", response);

}).catch((error) => {

    console.log("error>", error);

});
