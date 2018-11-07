const Post = require('../dist/index').Post,
    XMLHttpFactory = require('../dist/index').XMLHttpFactory;

const xmlHttpFactory = new XMLHttpFactory(XMLHttpRequest);
const post = new Post(xmlHttpFactory);


post.handleRequest("https://jsonplaceholder.typicode.com/posts", null, JSON.stringify({
    title: 'dog',
    body: 'cat',
    userId: 200
})).then((response) => {

    console.log('response>', response);

}).catch((error) => {

    console.log("error>", error);

});
