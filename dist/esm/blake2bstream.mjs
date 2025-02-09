var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import blakejs from 'blakejs';
import * as bytes from './bytes.mjs';
import { from } from './hasher.mjs';
const { blake2b, blake2bInit, blake2bUpdate, blake2bFinal } = blakejs;
export const blake2b256stream = from({
    name: 'blake2b-256',
    code: 0xb220,
    encode: (input) => __awaiter(void 0, void 0, void 0, function* () {
        if (input instanceof ReadableStream) {
            const ctx = blake2bInit(32);
            const reader = input.getReader();
            for (;;) {
                const result = yield reader.read();
                if (result.done)
                    break;
                blake2bUpdate(ctx, bytes.coerce(result.value));
            }
            return blake2bFinal(ctx);
        }
        else {
            return bytes.coerce(blake2b(input, undefined, 32));
        }
    })
});
