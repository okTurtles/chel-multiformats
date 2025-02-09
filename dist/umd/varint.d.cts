export declare function decode(data: ArrayLike<number>, offset?: number): number[];
export declare function encodeTo(int: number, target: Uint8Array, offset?: number): Uint8Array<ArrayBufferLike>;
export declare function encodingLength(int: number): 1 | 2 | 3 | 4 | 8 | 5 | 6 | 10 | 7 | 9;
