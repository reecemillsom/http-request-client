const Head = require('../src/Request/HeadRequest/HeadRequest').HeadRequest,
	XMLHttpFactory = require('../src/XMLHttpRequestFactory/XMLHttpRequestFactory').XMLHttpRequestFactory;

const xmlHttpFactory = new XMLHttpFactory(XMLHttpRequest),
	head = new Head(xmlHttpFactory);

module.exports = head;
