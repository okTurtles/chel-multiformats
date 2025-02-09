export declare const empty: Uint8Array<ArrayBuffer>;
export declare function toHex(d: Uint8Array): string;
export declare function fromHex(hex: string): Uint8Array<ArrayBuffer>;
export declare function equals(aa: Uint8Array, bb: Uint8Array): boolean;
export declare function coerce(o: Uint8Array | ArrayBuffer | ArrayBufferView): Uint8Array;
export declare function isBinary(o: object): o is ArrayBuffer | ArrayBufferView<ArrayBufferLike>;
export declare function fromString(str: string): Uint8Array<ArrayBufferLike>;
export declare function toString(b: ArrayBuffer | ArrayBufferView): string;
