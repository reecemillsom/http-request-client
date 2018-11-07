const Head = require('../dist/index').Head,
    XMLHttpFactory = require('../dist/index').XMLHttpFactory;

const xmlHttpFactory = new XMLHttpFactory(XMLHttpRequest);
const head = new Head(xmlHttpFactory);


head.handleRequest("https://jsonplaceholder.typicode.com/posts").then((response) => {

    console.log('response>', response);

}).catch((error) => {

    console.log("error>", error);

});
