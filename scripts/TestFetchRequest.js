const fetchRequest = require("../dist/index").fetch;

fetchRequest.handleRequest("https://jsonplaceholder.typicode.com/posts").then((response) => {

    console.log("response>", response);

});