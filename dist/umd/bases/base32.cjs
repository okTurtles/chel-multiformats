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
    exports.base32z = exports.base32hexpadupper = exports.base32hexpad = exports.base32hexupper = exports.base32hex = exports.base32padupper = exports.base32pad = exports.base32upper = exports.base32 = void 0;
    /* eslint-disable */
    const base_js_1 = require("./base.cjs");
    exports.base32 = (0, base_js_1.rfc4648)({
        prefix: 'b',
        name: 'base32',
        alphabet: 'abcdefghijklmnopqrstuvwxyz234567',
        bitsPerChar: 5
    });
    exports.base32upper = (0, base_js_1.rfc4648)({
        prefix: 'B',
        name: 'base32upper',
        alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567',
        bitsPerChar: 5
    });
    exports.base32pad = (0, base_js_1.rfc4648)({
        prefix: 'c',
        name: 'base32pad',
        alphabet: 'abcdefghijklmnopqrstuvwxyz234567=',
        bitsPerChar: 5
    });
    exports.base32padupper = (0, base_js_1.rfc4648)({
        prefix: 'C',
        name: 'base32padupper',
        alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=',
        bitsPerChar: 5
    });
    exports.base32hex = (0, base_js_1.rfc4648)({
        prefix: 'v',
        name: 'base32hex',
        alphabet: '0123456789abcdefghijklmnopqrstuv',
        bitsPerChar: 5
    });
    exports.base32hexupper = (0, base_js_1.rfc4648)({
        prefix: 'V',
        name: 'base32hexupper',
        alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUV',
        bitsPerChar: 5
    });
    exports.base32hexpad = (0, base_js_1.rfc4648)({
        prefix: 't',
        name: 'base32hexpad',
        alphabet: '0123456789abcdefghijklmnopqrstuv=',
        bitsPerChar: 5
    });
    exports.base32hexpadupper = (0, base_js_1.rfc4648)({
        prefix: 'T',
        name: 'base32hexpadupper',
        alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUV=',
        bitsPerChar: 5
    });
    exports.base32z = (0, base_js_1.rfc4648)({
        prefix: 'h',
        name: 'base32z',
        alphabet: 'ybndrfg8ejkmcpqxot1uwisza345h769',
        bitsPerChar: 5
    });
});
