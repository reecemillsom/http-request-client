const fetchRequest = require("../dist/index").fetch;

fetchRequest.handleRequest("https://jsonplaceholder.typicode.com/posts").then((response) => {

    console.log("response>", response);

});

fetchRequest.handleRequest("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    mode: "cors"
}).then((response) => {

    console.log("response>", response);

});
