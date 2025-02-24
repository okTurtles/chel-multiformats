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
    /* eslint-disable */
    var encode_1 = encode;
    var MSB = 0x80, REST = 0x7F, MSBALL = ~REST, INT = Math.pow(2, 31);
    /**
     * @param {number} num
     * @param {number[]} out
     * @param {number} offset
     */
    function encode(num, out, offset) {
        out = out || [];
        offset = offset || 0;
        var oldOffset = offset;
        while (num >= INT) {
            out[offset++] = (num & 0xFF) | MSB;
            num /= 128;
        }
        while (num & MSBALL) {
            out[offset++] = (num & 0xFF) | MSB;
            num >>>= 7;
        }
        out[offset] = num | 0;
        // @ts-ignore
        encode.bytes = offset - oldOffset + 1;
        return out;
    }
    var decode = read;
    var MSB$1 = 0x80, REST$1 = 0x7F;
    /**
     * @param {string | any[]} buf
     * @param {number} offset
     */
    function read(buf, offset) {
        var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf.length;
        do {
            if (counter >= l) {
                // @ts-ignore
                read.bytes = 0;
                throw new RangeError('Could not decode varint');
            }
            b = buf[counter++];
            res += shift < 28
                ? (b & REST$1) << shift
                : (b & REST$1) * Math.pow(2, shift);
            shift += 7;
        } while (b >= MSB$1);
        // @ts-ignore
        read.bytes = counter - offset;
        return res;
    }
    var N1 = Math.pow(2, 7);
    var N2 = Math.pow(2, 14);
    var N3 = Math.pow(2, 21);
    var N4 = Math.pow(2, 28);
    var N5 = Math.pow(2, 35);
    var N6 = Math.pow(2, 42);
    var N7 = Math.pow(2, 49);
    var N8 = Math.pow(2, 56);
    var N9 = Math.pow(2, 63);
    var length = function (/** @type {number} */ value) {
        return (value < N1 ? 1
            : value < N2 ? 2
                : value < N3 ? 3
                    : value < N4 ? 4
                        : value < N5 ? 5
                            : value < N6 ? 6
                                : value < N7 ? 7
                                    : value < N8 ? 8
                                        : value < N9 ? 9
                                            : 10);
    };
    var varint = {
        encode: encode_1,
        decode: decode,
        encodingLength: length
    };
    var _brrp_varint = varint;
    exports.default = _brrp_varint;
});
