const Post = require('../src/Request/PostRequest/PostRequest').PostRequest,
	XMLHttpFactory = require('../src/XMLHttpRequestFactory/XMLHttpRequestFactory').XMLHttpRequestFactory;

const xmlHttpFactory = new XMLHttpFactory(XMLHttpRequest),
	post = new Post(xmlHttpFactory);

module.exports = post;
