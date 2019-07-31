const Fetch = require('../src/Request/FetchRequest/FetchRequest').FetchRequest,
	XMLHttpFactory = require('../src/XMLHttpRequestFactory/XMLHttpRequestFactory').XMLHttpRequestFactory;

const xmlHttpFactory = new XMLHttpFactory(XMLHttpRequest),
	fetch = new Fetch(xmlHttpFactory);

module.exports = fetch;
