const Fetch = require('../dist/index').Fetch,
    RequestFactory = require('../dist/index').FetchRequestFactory;

const requestFactory = new RequestFactory(Request);
const fetch = new Fetch(requestFactory, window);


fetch.handleRequest("https://jsonplaceholder.typicode.com/posts").then((response) => {

    console.log('response>', response);

}).catch((error) => {

    console.log("error>", error);

});

fetch.handleRequest("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    mode: "cors"
}).then((response) => {

    console.log("response>", response);

}).catch((error) => {

    console.log('error>', error);

});
