const Get = require('../src/Request/GetRequest/GetRequest').GetRequest,
    XMLHttpFactory = require('../src/XMLHttpRequestFactory/XMLHttpRequestFactory').XMLHttpRequestFactory;

const xmlHttpFactory = new XMLHttpFactory(XMLHttpRequest),
    get = new Get(xmlHttpFactory);

module.exports = get;
