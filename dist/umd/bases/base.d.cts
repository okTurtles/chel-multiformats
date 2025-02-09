/**
 * Class represents both BaseEncoder and MultibaseEncoder meaning it
 * can be used to encode to multibase or base encode without multibase
 * prefix.
 */
declare class Encoder {
    name: string;
    prefix: string;
    baseEncode: (input: Uint8Array) => string;
    constructor(name: string, prefix: string, baseEncode: (input: Uint8Array) => string);
    encode(bytes: Uint8Array): string;
}
/**
 * Class represents both BaseDecoder and MultibaseDecoder so it could be used
 * to decode multibases (with matching prefix) or just base decode strings
 * with corresponding base encoding.
 */
declare class Decoder {
    name: string;
    prefix: string;
    baseDecode: (input: string) => Uint8Array;
    prefixCodePoint: number | undefined;
    constructor(name: string, prefix: string, baseDecode: (input: string) => Uint8Array);
    decode(text: string): Uint8Array<ArrayBufferLike>;
    or(decoder: Decoder): ComposedDecoder;
}
declare class ComposedDecoder {
    decoders: Record<string, Decoder>;
    constructor(decoders: Record<string, Decoder>);
    or(decoder: Decoder): ComposedDecoder;
    decode(input: string): Uint8Array<ArrayBufferLike>;
}
export declare function or(left: ComposedDecoder | Decoder, right: ComposedDecoder | Decoder): ComposedDecoder;
export declare class Codec {
    name: string;
    prefix: string;
    baseEncode: (input: Uint8Array) => string;
    baseDecode: (input: string) => Uint8Array;
    encoder: Encoder;
    decoder: Decoder;
    constructor(name: string, prefix: string, baseEncode: (input: Uint8Array) => string, baseDecode: (input: string) => Uint8Array);
    encode(input: Uint8Array): string;
    decode(input: string): Uint8Array<ArrayBufferLike>;
}
export declare function from({ name, prefix, encode, decode }: {
    name: string;
    prefix: string;
    encode: (input: Uint8Array) => string;
    decode: (input: string) => Uint8Array;
}): Codec;
export declare function baseX({ name, prefix, alphabet }: {
    name: string;
    prefix: string;
    alphabet: string;
}): Codec;
/**
 * RFC4648 Factory
 */
export declare function rfc4648({ name, prefix, bitsPerChar, alphabet }: {
    name: string;
    prefix: string;
    bitsPerChar: number;
    alphabet: string;
}): Codec;
export {};
