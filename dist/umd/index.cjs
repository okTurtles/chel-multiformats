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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./bases/base.cjs", "./bases/base32.cjs", "./bases/base58.cjs", "./blake2b.cjs", "./blake2bstream.cjs", "./cid.cjs", "./hasher.cjs", "./hashes/digest.cjs"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.digestEquals = exports.digestDecode = exports.digestCreate = exports.Digest = exports.hasherFrom = exports.Hasher = exports.base58flickr = exports.base58btc = exports.base32z = exports.base32upper = exports.base32padupper = exports.base32pad = exports.base32hexpadupper = exports.base32hex = exports.base32 = exports.rfc4648 = exports.codecFrom = exports.baseX = exports.Codec = void 0;
    var base_js_1 = require("./bases/base.cjs");
    Object.defineProperty(exports, "Codec", { enumerable: true, get: function () { return base_js_1.Codec; } });
    Object.defineProperty(exports, "baseX", { enumerable: true, get: function () { return base_js_1.baseX; } });
    Object.defineProperty(exports, "codecFrom", { enumerable: true, get: function () { return base_js_1.from; } });
    Object.defineProperty(exports, "rfc4648", { enumerable: true, get: function () { return base_js_1.rfc4648; } });
    var base32_js_1 = require("./bases/base32.cjs");
    Object.defineProperty(exports, "base32", { enumerable: true, get: function () { return base32_js_1.base32; } });
    Object.defineProperty(exports, "base32hex", { enumerable: true, get: function () { return base32_js_1.base32hex; } });
    Object.defineProperty(exports, "base32hexpadupper", { enumerable: true, get: function () { return base32_js_1.base32hexpadupper; } });
    Object.defineProperty(exports, "base32pad", { enumerable: true, get: function () { return base32_js_1.base32pad; } });
    Object.defineProperty(exports, "base32padupper", { enumerable: true, get: function () { return base32_js_1.base32padupper; } });
    Object.defineProperty(exports, "base32upper", { enumerable: true, get: function () { return base32_js_1.base32upper; } });
    Object.defineProperty(exports, "base32z", { enumerable: true, get: function () { return base32_js_1.base32z; } });
    var base58_js_1 = require("./bases/base58.cjs");
    Object.defineProperty(exports, "base58btc", { enumerable: true, get: function () { return base58_js_1.base58btc; } });
    Object.defineProperty(exports, "base58flickr", { enumerable: true, get: function () { return base58_js_1.base58flickr; } });
    __exportStar(require("./blake2b.cjs"), exports);
    __exportStar(require("./blake2bstream.cjs"), exports);
    __exportStar(require("./cid.cjs"), exports);
    var hasher_js_1 = require("./hasher.cjs");
    Object.defineProperty(exports, "Hasher", { enumerable: true, get: function () { return hasher_js_1.Hasher; } });
    Object.defineProperty(exports, "hasherFrom", { enumerable: true, get: function () { return hasher_js_1.from; } });
    var digest_js_1 = require("./hashes/digest.cjs");
    Object.defineProperty(exports, "Digest", { enumerable: true, get: function () { return digest_js_1.Digest; } });
    Object.defineProperty(exports, "digestCreate", { enumerable: true, get: function () { return digest_js_1.create; } });
    Object.defineProperty(exports, "digestDecode", { enumerable: true, get: function () { return digest_js_1.decode; } });
    Object.defineProperty(exports, "digestEquals", { enumerable: true, get: function () { return digest_js_1.equals; } });
});
