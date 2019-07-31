const Put = require('../src/Request/PutRequest/PutRequest').PutRequest,
	XMLHttpFactory = require('../src/XMLHttpRequestFactory/XMLHttpRequestFactory').XMLHttpRequestFactory;

const xmlHttpFactory = new XMLHttpFactory(XMLHttpRequest),
	put = new Put(xmlHttpFactory);

module.exports = put;
