import * as Bluebird from "bluebird";

export class WindowMock {

	public isFetchFine: boolean;

	public fetch(request: any) {

		if (this.isFetchFine) {

			return Bluebird.resolve({
				ok: true,
				status: 200,
				json: () => {

					return [{ "foo": "bar" }];

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