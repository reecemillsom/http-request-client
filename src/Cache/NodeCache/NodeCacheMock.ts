export class NodeCacheMock {

	public cache: any;

	constructor() {

		this.cache = {};

	}

	public get(key) {

		return this.cache[key];

	}


	public set(key, value) {

		this.cache[key] = value;

	}

}