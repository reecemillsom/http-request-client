export class CacheMock {

	public exists: boolean;

	constructor(private cache: any) {

		this.exists = false;

	}

	public get() {

		if (this.exists) {

			return { a: 1, b: 2 };

		}

		return;

	}

	public set() {

		console.log("args>", arguments);

	}

}
