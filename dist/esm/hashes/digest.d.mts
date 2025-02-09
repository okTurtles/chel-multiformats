/**
 * Creates a multihash digest.
 */
export declare function create(code: number, digest: Uint8Array): Digest;
/**
 * Turns bytes representation of multihash digest into an instance.
 */
export declare function decode(multihash: Uint8Array | ArrayBuffer | ArrayBufferView): Digest;
export declare function equals(a: Digest, b: Digest): boolean;
/**
 * Represents a multihash digest which carries information about the
 * hashing algorithm and an actual hash digest.
 */
export declare class Digest {
    code: number;
    size: number;
    digest: Uint8Array<ArrayBufferLike>;
    bytes: Uint8Array<ArrayBufferLike>;
    /**
     * Creates a multihash digest.
     */
    constructor(code: number, size: number, digest: Uint8Array, bytes: Uint8Array);
}
