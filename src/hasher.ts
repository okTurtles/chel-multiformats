/* eslint-disable */
import * as Digest from './hashes/digest.js';

type IEncode = |
    { (input: Uint8Array): Uint8Array } |
    { (input: Uint8Array): Promise<Uint8Array> } |
    { (input: ReadableStream<Uint8Array>): Promise<Uint8Array> } |
    { (input: Uint8Array | ReadableStream<Uint8Array>): Promise<Uint8Array> };

export function from({ name, code, encode }: { name: string, code: number, encode: IEncode }) {
    return new Hasher(name, code, encode);
}
/**
 * Hasher represents a hashing algorithm implementation that produces as
 * `MultihashDigest`.
 */
export class Hasher {
    name;
    code;
    encode: IEncode;
    constructor(name: string, code: number, encode: IEncode) {
        this.name = name;
        this.code = code;
        this.encode = encode;
    }
    digest(input: Uint8Array | ReadableStream<Uint8Array>) {
        if (input instanceof Uint8Array || input instanceof ReadableStream) {
            const result = this.encode(input as Uint8Array & ReadableStream<Uint8Array>);
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
