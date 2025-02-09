import * as Digest from './hashes/digest.cjs';
type IEncode = {
    (input: Uint8Array): Uint8Array;
} | {
    (input: Uint8Array): Promise<Uint8Array>;
} | {
    (input: ReadableStream<Uint8Array>): Promise<Uint8Array>;
} | {
    (input: Uint8Array | ReadableStream<Uint8Array>): Promise<Uint8Array>;
};
export declare function from({ name, code, encode }: {
    name: string;
    code: number;
    encode: IEncode;
}): Hasher;
/**
 * Hasher represents a hashing algorithm implementation that produces as
 * `MultihashDigest`.
 */
export declare class Hasher {
    name: string;
    code: number;
    encode: IEncode;
    constructor(name: string, code: number, encode: IEncode);
    digest(input: Uint8Array | ReadableStream<Uint8Array>): Digest.Digest | Promise<Digest.Digest>;
}
export {};
