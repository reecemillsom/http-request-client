const Del = require('../dist/index').Del,
    XMLHttpFactory = require('../dist/index').XMLHttpFactory;

const xmlHttpFactory = new XMLHttpFactory(XMLHttpRequest);
const del = new Del(xmlHttpFactory);


del.handleRequest("https://jsonplaceholder.typicode.com/posts/1").then((response) => {

    console.log('response>', response);

}).catch((error) => {

    console.log("error>", error);

});
