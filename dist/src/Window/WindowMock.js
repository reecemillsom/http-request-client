"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Bluebird = require("bluebird");
var WindowMock = (function () {
    function WindowMock() {
    }
    WindowMock.prototype.fetch = function (request) {
        var _this = this;
        if (this.isFetchFine) {
            return Bluebird.resolve({
                ok: true,
                status: 200,
                json: function () {
                    if (JSON.parse(_this.jsonContent)) {
                        return _this.jsonContent;
                    }
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
