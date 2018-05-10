export class Cache {

	constructor(private nodeCache: any) {


	}

	public execute(key: string, value?: any) {

		const cacheValue = this.nodeCache.get(key);

		if (!!cacheValue) {

			return cacheValue;

		}

		return this.nodeCache.set(key, value);

	}


}
