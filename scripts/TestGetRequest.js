const Get = require('../dist/index').Get,
    XMLHttpFactory = require('../dist/index').XMLHttpFactory;

const xmlHttpFactory = new XMLHttpFactory(XMLHttpRequest);
const get = new Get(xmlHttpFactory);


get.handleRequest("https://jsonplaceholder.typicode.com/posts").then((response) => {

    console.log('response>', response);

}).catch((error) => {

    console.log("error>", error);

});
