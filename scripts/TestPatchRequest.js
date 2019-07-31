const Patch = require('../src/Request/PatchRequest/PatchRequest').PatchRequest,
	XMLHttpFactory = require('../src/XMLHttpRequestFactory/XMLHttpRequestFactory').XMLHttpRequestFactory;

const xmlHttpFactory = new XMLHttpFactory(XMLHttpRequest),
	patch = new Patch(xmlHttpFactory);

module.exports = patch;
