import {expect, use} from "chai";
import {Cache} from "./Cache";
import {NodeCacheMock} from "./NodeCache/NodeCacheMock";


describe("Cache", () => {

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

				expect(cache.get("url")).to.equal("value");

			});
	        
	    });

	    describe("when key doesn't exist in cache", () => {

	    	it("will set the value in cache", () => {

	    	    cache.set("url", "value");

	    	    expect(nodeCacheMock.cache["url"]).to.equal("value");

	    	});

	    });
	    
	});

});
