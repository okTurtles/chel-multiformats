(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.empty = void 0;
    exports.toHex = toHex;
    exports.fromHex = fromHex;
    exports.equals = equals;
    exports.coerce = coerce;
    exports.isBinary = isBinary;
    exports.fromString = fromString;
    exports.toString = toString;
    exports.empty = new Uint8Array(0);
    function toHex(d) {
        return d.reduce((hex, byte) => hex + byte.toString(16).padStart(2, '0'), '');
    }
    function fromHex(hex) {
        const hexes = hex.match(/../g);
        return hexes != null ? new Uint8Array(hexes.map(b => parseInt(b, 16))) : exports.empty;
    }
    function equals(aa, bb) {
        if (aa === bb) {
            return true;
        }
        if (aa.byteLength !== bb.byteLength) {
            return false;
        }
        for (let ii = 0; ii < aa.byteLength; ii++) {
            if (aa[ii] !== bb[ii]) {
                return false;
            }
        }
        return true;
    }
    function coerce(o) {
        if (o instanceof Uint8Array && o.constructor.name === 'Uint8Array') {
            return o;
        }
        if (o instanceof ArrayBuffer) {
            return new Uint8Array(o);
        }
        if (ArrayBuffer.isView(o)) {
            return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
        }
        throw new Error('Unknown type, must be binary type');
    }
    function isBinary(o) {
        return o instanceof ArrayBuffer || ArrayBuffer.isView(o);
    }
    function fromString(str) {
        return new TextEncoder().encode(str);
    }
    function toString(b) {
        return new TextDecoder().decode(b);
    }
});
