export class Cache {

	constructor(private nodeCache: any) {


	}

	public set(key: string, value: any) {

		return this.nodeCache.set(key, value);

	}

	public get(key) {

		return this.nodeCache.get(key);

	}


}
