var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../bytes.cjs", "../varint.cjs"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Digest = void 0;
    exports.create = create;
    exports.decode = decode;
    exports.equals = equals;
    /* eslint-disable */
    const bytes_js_1 = require("../bytes.cjs");
    const varint = __importStar(require("../varint.cjs"));
    /**
     * Creates a multihash digest.
     */
    function create(code, digest) {
        const size = digest.byteLength;
        const sizeOffset = varint.encodingLength(code);
        const digestOffset = sizeOffset + varint.encodingLength(size);
        const bytes = new Uint8Array(digestOffset + size);
        varint.encodeTo(code, bytes, 0);
        varint.encodeTo(size, bytes, sizeOffset);
        bytes.set(digest, digestOffset);
        return new Digest(code, size, digest, bytes);
    }
    /**
     * Turns bytes representation of multihash digest into an instance.
     */
    function decode(multihash) {
        const bytes = (0, bytes_js_1.coerce)(multihash);
        const [code, sizeOffset] = varint.decode(bytes);
        const [size, digestOffset] = varint.decode(bytes.subarray(sizeOffset));
        const digest = bytes.subarray(sizeOffset + digestOffset);
        if (digest.byteLength !== size) {
            throw new Error('Incorrect length');
        }
        return new Digest(code, size, digest, bytes);
    }
    function equals(a, b) {
        if (a === b) {
            return true;
        }
        else {
            const data = b;
            return (a.code === data.code &&
                a.size === data.size &&
                data.bytes instanceof Uint8Array &&
                (0, bytes_js_1.equals)(a.bytes, data.bytes));
        }
    }
    /**
     * Represents a multihash digest which carries information about the
     * hashing algorithm and an actual hash digest.
     */
    class Digest {
        /**
         * Creates a multihash digest.
         */
        constructor(code, size, digest, bytes) {
            this.code = code;
            this.size = size;
            this.digest = digest;
            this.bytes = bytes;
        }
    }
    exports.Digest = Digest;
});
