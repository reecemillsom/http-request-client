const Delete = require('../src/Request/DeleteRequest/DeleteRequest').DeleteRequest,
	XMLHttpFactory = require('../src/XMLHttpRequestFactory/XMLHttpRequestFactory').XMLHttpRequestFactory;

const xmlHttpFactory = new XMLHttpFactory(XMLHttpRequest),
	del = new Delete(xmlHttpFactory);

module.exports = del;
