"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bluebird = require("bluebird");
var WindowMock = (function () {
    function WindowMock() {
    }
    WindowMock.prototype.fetch = function (request) {
        if (this.isFetchFine) {
            return Bluebird.resolve({
                ok: true,
                status: 200,
                json: function () {
                    return [{ "foo": "bar" }];
                }
            });
        }
        return Bluebird.resolve({
            ok: false,
            status: 400,
            json: function () { }
        });
    };
    return WindowMock;
}());
exports.WindowMock = WindowMock;
