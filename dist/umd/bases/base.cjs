var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../bytes.cjs", "../base-x.cjs"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Codec = void 0;
    exports.or = or;
    exports.from = from;
    exports.baseX = baseX;
    exports.rfc4648 = rfc4648;
    const bytes_js_1 = require("../bytes.cjs");
    const base_x_js_1 = __importDefault(require("../base-x.cjs"));
    /**
     * Class represents both BaseEncoder and MultibaseEncoder meaning it
     * can be used to encode to multibase or base encode without multibase
     * prefix.
     */
    class Encoder {
        constructor(name, prefix, baseEncode) {
            this.name = name;
            this.prefix = prefix;
            this.baseEncode = baseEncode;
        }
        encode(bytes) {
            if (bytes instanceof Uint8Array) {
                return `${this.prefix}${this.baseEncode(bytes)}`;
            }
            else {
                throw Error('Unknown type, must be binary type');
            }
        }
    }
    /**
     * Class represents both BaseDecoder and MultibaseDecoder so it could be used
     * to decode multibases (with matching prefix) or just base decode strings
     * with corresponding base encoding.
     */
    class Decoder {
        constructor(name, prefix, baseDecode) {
            this.name = name;
            this.prefix = prefix;
            /* c8 ignore next 3 */
            if (prefix.codePointAt(0) === undefined) {
                throw new Error('Invalid prefix character');
            }
            this.prefixCodePoint = prefix.codePointAt(0);
            this.baseDecode = baseDecode;
        }
        decode(text) {
            if (typeof text === 'string') {
                if (text.codePointAt(0) !== this.prefixCodePoint) {
                    throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
                }
                return this.baseDecode(text.slice(this.prefix.length));
            }
            else {
                throw Error('Can only multibase decode strings');
            }
        }
        or(decoder) {
            return or(this, decoder);
        }
    }
    class ComposedDecoder {
        constructor(decoders) {
            this.decoders = decoders;
        }
        or(decoder) {
            return or(this, decoder);
        }
        decode(input) {
            const prefix = input[0];
            const decoder = this.decoders[prefix];
            if (decoder != null) {
                return decoder.decode(input);
            }
            else {
                throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
            }
        }
    }
    function or(left, right) {
        var _a, _b;
        return new ComposedDecoder(Object.assign(Object.assign({}, ((_a = left.decoders) !== null && _a !== void 0 ? _a : { [left.prefix]: left })), ((_b = right.decoders) !== null && _b !== void 0 ? _b : { [right.prefix]: right })));
    }
    class Codec {
        constructor(name, prefix, baseEncode, baseDecode) {
            this.name = name;
            this.prefix = prefix;
            this.baseEncode = baseEncode;
            this.baseDecode = baseDecode;
            this.encoder = new Encoder(name, prefix, baseEncode);
            this.decoder = new Decoder(name, prefix, baseDecode);
        }
        encode(input) {
            return this.encoder.encode(input);
        }
        decode(input) {
            return this.decoder.decode(input);
        }
    }
    exports.Codec = Codec;
    function from({ name, prefix, encode, decode }) {
        return new Codec(name, prefix, encode, decode);
    }
    function baseX({ name, prefix, alphabet }) {
        const { encode, decode } = (0, base_x_js_1.default)(alphabet, name);
        return from({
            prefix,
            name,
            encode,
            decode: (text) => (0, bytes_js_1.coerce)(decode(text))
        });
    }
    function decode(string, alphabet, bitsPerChar, name) {
        // Build the character lookup table:
        const codes = {};
        for (let i = 0; i < alphabet.length; ++i) {
            codes[alphabet[i]] = i;
        }
        // Count the padding bytes:
        let end = string.length;
        while (string[end - 1] === '=') {
            --end;
        }
        // Allocate the output:
        const out = new Uint8Array((end * bitsPerChar / 8) | 0);
        // Parse the data:
        let bits = 0; // Number of bits currently in the buffer
        let buffer = 0; // Bits waiting to be written out, MSB first
        let written = 0; // Next byte to write
        for (let i = 0; i < end; ++i) {
            // Read one character from the string:
            const value = codes[string[i]];
            if (value === undefined) {
                throw new SyntaxError(`Non-${name} character`);
            }
            // Append the bits to the buffer:
            buffer = (buffer << bitsPerChar) | value;
            bits += bitsPerChar;
            // Write out some bits if the buffer has a byte's worth:
            if (bits >= 8) {
                bits -= 8;
                out[written++] = 0xff & (buffer >> bits);
            }
        }
        // Verify that we have received just enough bits:
        if (bits >= bitsPerChar || (0xff & (buffer << (8 - bits))) !== 0) {
            throw new SyntaxError('Unexpected end of data');
        }
        return out;
    }
    function encode(data, alphabet, bitsPerChar) {
        const pad = alphabet[alphabet.length - 1] === '=';
        const mask = (1 << bitsPerChar) - 1;
        let out = '';
        let bits = 0; // Number of bits currently in the buffer
        let buffer = 0; // Bits waiting to be written out, MSB first
        for (let i = 0; i < data.length; ++i) {
            // Slurp data into the buffer:
            buffer = (buffer << 8) | data[i];
            bits += 8;
            // Write out as much as we can:
            while (bits > bitsPerChar) {
                bits -= bitsPerChar;
                out += alphabet[mask & (buffer >> bits)];
            }
        }
        // Partial character:
        if (bits !== 0) {
            out += alphabet[mask & (buffer << (bitsPerChar - bits))];
        }
        // Add padding characters until we hit a byte boundary:
        if (pad) {
            while (((out.length * bitsPerChar) & 7) !== 0) {
                out += '=';
            }
        }
        return out;
    }
    /**
     * RFC4648 Factory
     */
    function rfc4648({ name, prefix, bitsPerChar, alphabet }) {
        return from({
            prefix,
            name,
            encode(input) {
                return encode(input, alphabet, bitsPerChar);
            },
            decode(input) {
                return decode(input, alphabet, bitsPerChar, name);
            }
        });
    }
});
