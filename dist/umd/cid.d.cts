import type { Codec } from './bases/base.cjs';
import * as Digest from './hashes/digest.cjs';
export * from './link/interface.cjs';
export declare function format(link: CID, base?: Codec): string;
export declare function toJSON(link: CID): {
    '/': string;
};
export declare function fromJSON(json: {
    '/': string;
}): CID;
export declare class CID {
    code: number;
    version: number;
    multihash: Digest.Digest;
    bytes: Uint8Array<ArrayBufferLike>;
    '/': Uint8Array<ArrayBufferLike>;
    /**
     * @param version - Version of the CID
     * @param code - Code of the codec content is encoded in, see https://github.com/multiformats/multicodec/blob/master/table.csv
     * @param multihash - (Multi)hash of the of the content.
     */
    constructor(version: number, code: number, multihash: Digest.Digest, bytes: Uint8Array);
    /**
     * Signalling `cid.asCID === cid` has been replaced with `cid['/'] === cid.bytes`
     * please either use `CID.asCID(cid)` or switch to new signalling mechanism
     *
     * @deprecated
     */
    get asCID(): this;
    get byteOffset(): number;
    get byteLength(): number;
    toV0(): CID;
    toV1(): CID;
    equals(other: CID): boolean;
    static equals(self: CID, other: CID): boolean;
    toString(base?: Codec): string;
    toJSON(): {
        '/': string;
    };
    link(): this;
    [Symbol.toStringTag]: string;
    /**
     * Takes any input `value` and returns a `CID` instance if it was
     * a `CID` otherwise returns `null`. If `value` is instanceof `CID`
     * it will return value back. If `value` is not instance of this CID
     * class, but is compatible CID it will return new instance of this
     * `CID` class. Otherwise returns null.
     *
     * This allows two different incompatible versions of CID library to
     * co-exist and interop as long as binary interface is compatible.
     */
    static asCID(input?: unknown): CID | null;
    /**
     * @param version - Version of the CID
     * @param code - Code of the codec content is encoded in, see https://github.com/multiformats/multicodec/blob/master/table.csv
     * @param digest - (Multi)hash of the of the content.
     */
    static create(version: number, code: number, digest: Digest.Digest): CID;
    /**
     * Simplified version of `create` for CIDv0.
     */
    static createV0(digest: Digest.Digest): CID;
    /**
     * Simplified version of `create` for CIDv1.
     *
     * @param code - Content encoding format code.
     * @param digest - Multihash of the content.
     */
    static createV1(code: number, digest: Digest.Digest): CID;
    /**
     * Decoded a CID from its binary representation. The byte array must contain
     * only the CID with no additional bytes.
     *
     * An error will be thrown if the bytes provided do not contain a valid
     * binary representation of a CID.
     */
    static decode(bytes: Uint8Array): CID;
    /**
     * Decoded a CID from its binary representation at the beginning of a byte
     * array.
     *
     * Returns an array with the first element containing the CID and the second
     * element containing the remainder of the original byte array. The remainder
     * will be a zero-length byte array if the provided bytes only contained a
     * binary CID representation.
     */
    static decodeFirst(bytes: Uint8Array): [cid: CID, remainder: Uint8Array];
    /**
     * Inspect the initial bytes of a CID to determine its properties.
     *
     * Involves decoding up to 4 varints. Typically this will require only 4 to 6
     * bytes but for larger multicodec code values and larger multihash digest
     * lengths these varints can be quite large. It is recommended that at least
     * 10 bytes be made available in the `initialBytes` argument for a complete
     * inspection.
     */
    static inspectBytes(initialBytes: Uint8Array): {
        version: number;
        codec: number;
        multihashCode: number;
        digestSize: number;
        multihashSize: number;
        size: number;
    };
    /**
     * Takes cid in a string representation and creates an instance. If `base`
     * decoder is not provided will use a default from the configuration. It will
     * throw an error if encoding of the CID is not compatible with supplied (or
     * a default decoder).
     */
    static parse(source: string, base?: Codec): CID;
}
