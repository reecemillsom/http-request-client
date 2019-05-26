const Patch = require('../dist/index').Patch,
    XMLHttpFactory = require('../dist/index').XMLHttpFactory;

const xmlHttpFactory = new XMLHttpFactory(XMLHttpRequest);
const patch = new Patch(xmlHttpFactory);

patch.handleRequest("https://jsonplaceholder.typicode.com/posts/1", null, JSON.stringify({
    title: 'dog',
    id: 100,
    body: 'cat',
    userId: 10
})).then((response) => {

    console.log('response>', response);

}).catch((error) => {

    console.log("error>", error);

});
