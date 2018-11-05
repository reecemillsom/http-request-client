import * as Bluebird from "bluebird";

export class WindowMock {

	public isFetchFine: boolean;
	public jsonContent: any;

	public fetch(request: any) {

		if (this.isFetchFine) {

			return Bluebird.resolve({
				ok: true,
				status: 200,
				json: () => {

					if (JSON.parse(this.jsonContent)) {

						return this.jsonContent;

					}

				}
			});

		}

		return Bluebird.resolve({
			ok: false,
			status: 400,
			json: () => {}
		});

	}

}
