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
        define(["require", "exports", "./hashes/digest.cjs"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Hasher = void 0;
    exports.from = from;
    /* eslint-disable */
    const Digest = __importStar(require("./hashes/digest.cjs"));
    function from({ name, code, encode }) {
        return new Hasher(name, code, encode);
    }
    /**
     * Hasher represents a hashing algorithm implementation that produces as
     * `MultihashDigest`.
     */
    class Hasher {
        constructor(name, code, encode) {
            this.name = name;
            this.code = code;
            this.encode = encode;
        }
        digest(input) {
            if (input instanceof Uint8Array || input instanceof ReadableStream) {
                const result = this.encode(input);
                return result instanceof Uint8Array
                    ? Digest.create(this.code, result)
                    /* c8 ignore next 1 */
                    : result.then(digest => Digest.create(this.code, digest));
            }
            else {
                throw Error('Unknown type, must be binary type');
                /* c8 ignore next 1 */
            }
        }
    }
    exports.Hasher = Hasher;
});
