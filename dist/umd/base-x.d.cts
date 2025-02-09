/**
 * @param {string} ALPHABET
 * @param {any} name
 */
declare function base(ALPHABET: string, name: string): {
    encode: (source: ArrayLike<number>) => string;
    decodeUnsafe: (source: string) => Uint8Array<ArrayBuffer> | undefined;
    decode: (string: string) => Uint8Array<ArrayBuffer>;
};
declare var _brrp__multiformats_scope_baseX: typeof base;
export default _brrp__multiformats_scope_baseX;
