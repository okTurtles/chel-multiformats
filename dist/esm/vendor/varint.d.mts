declare var encode_1: typeof encode;
/**
 * @param {number} num
 * @param {number[]} out
 * @param {number} offset
 */
declare function encode(num: number, out: Uint8Array, offset: number): Uint8Array<ArrayBufferLike>;
declare var decode: typeof read;
/**
 * @param {string | any[]} buf
 * @param {number} offset
 */
declare function read(buf: ArrayLike<number>, offset: number): number;
declare var _brrp_varint: {
    encode: typeof encode_1 & {
        bytes: number;
    };
    decode: typeof decode & {
        bytes: number;
    };
    encodingLength: (value: number) => 1 | 2 | 3 | 4 | 8 | 5 | 6 | 10 | 7 | 9;
};
export default _brrp_varint;
