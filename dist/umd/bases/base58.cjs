(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./base.cjs"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.base58flickr = exports.base58btc = void 0;
    const base_js_1 = require("./base.cjs");
    exports.base58btc = (0, base_js_1.baseX)({
        name: 'base58btc',
        prefix: 'z',
        alphabet: '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
    });
    exports.base58flickr = (0, base_js_1.baseX)({
        name: 'base58flickr',
        prefix: 'Z',
        alphabet: '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'
    });
});
