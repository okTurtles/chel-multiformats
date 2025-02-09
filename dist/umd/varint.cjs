var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./vendor/varint.cjs"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.decode = decode;
    exports.encodeTo = encodeTo;
    exports.encodingLength = encodingLength;
    /* eslint-disable */
    const varint_js_1 = __importDefault(require("./vendor/varint.cjs"));
    function decode(data, offset = 0) {
        const code = varint_js_1.default.decode(data, offset);
        return [code, varint_js_1.default.decode.bytes];
    }
    function encodeTo(int, target, offset = 0) {
        varint_js_1.default.encode(int, target, offset);
        return target;
    }
    function encodingLength(int) {
        return varint_js_1.default.encodingLength(int);
    }
});
