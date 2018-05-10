import {expect, use} from "chai";
import {Cache} from "./Cache";
import {NodeCacheMock} from "./NodeCache/NodeCacheMock";


describe.only("Cache", () => {

	let nodeCacheMock,
		cache;

	beforeEach(() => {

		nodeCacheMock = new NodeCacheMock();
		cache = new Cache(nodeCacheMock);

	});

	describe("when asked to execute", () => {
	
	    describe("when key already exists in cache", () => {

	        it("will return the value in cache", () => {

	        	nodeCacheMock.set("url", "value");

				expect(cache.execute("url", "value")).to.equal("value");

			});
	        
	    });

	    describe("when key doesn't exist in cache", () => {

	    	it("will set the value in cache", () => {

	    	    cache.execute("url", "value");

	    	    expect(nodeCacheMock.cache["url"]).to.equal("value");

	    	});

	    });
	    
	});

});
