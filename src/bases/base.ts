import { coerce } from '../bytes.js'
import basex from '../base-x.js'
/**
 * Class represents both BaseEncoder and MultibaseEncoder meaning it
 * can be used to encode to multibase or base encode without multibase
 * prefix.
 */
class Encoder {
  name: string
  prefix
  baseEncode: (input: Uint8Array) => string
  constructor (name: string, prefix: string, baseEncode: (input: Uint8Array) => string) {
    this.name = name
    this.prefix = prefix
    this.baseEncode = baseEncode
  }

  encode (bytes: Uint8Array) {
    if (bytes instanceof Uint8Array) {
      return `${this.prefix}${this.baseEncode(bytes)}`
    } else {
      throw Error('Unknown type, must be binary type')
    }
  }
}
/**
 * Class represents both BaseDecoder and MultibaseDecoder so it could be used
 * to decode multibases (with matching prefix) or just base decode strings
 * with corresponding base encoding.
 */
class Decoder {
  name: string
  prefix: string
  baseDecode: (input: string) => Uint8Array
  prefixCodePoint
  constructor (name: string, prefix: string, baseDecode: (input: string) => Uint8Array) {
    this.name = name
    this.prefix = prefix
    /* c8 ignore next 3 */
    if (prefix.codePointAt(0) === undefined) {
      throw new Error('Invalid prefix character')
    }
    this.prefixCodePoint = prefix.codePointAt(0)
    this.baseDecode = baseDecode
  }

  decode (text: string) {
    if (typeof text === 'string') {
      if (text.codePointAt(0) !== this.prefixCodePoint) {
        throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`)
      }
      return this.baseDecode(text.slice(this.prefix.length))
    } else {
      throw Error('Can only multibase decode strings')
    }
  }

  or (decoder: Decoder) {
    return or(this, decoder)
  }
}
class ComposedDecoder {
  decoders: Record<string, Decoder>
  constructor (decoders: Record<string, Decoder>) {
    this.decoders = decoders
  }

  or (decoder: Decoder) {
    return or(this, decoder)
  }

  decode (input: string) {
    const prefix = input[0]
    const decoder = this.decoders[prefix]
    if (decoder != null) {
      return decoder.decode(input)
    } else {
      throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`)
    }
  }
}
export function or (left: ComposedDecoder | Decoder, right: ComposedDecoder | Decoder) {
  return new ComposedDecoder({
    ...((left as ComposedDecoder).decoders ?? { [(left as Decoder).prefix]: left }),
    ...((right as ComposedDecoder).decoders ?? { [(right as Decoder).prefix]: right })
  })
}
export class Codec {
  name: string
  prefix: string
  baseEncode: (input: Uint8Array) => string
  baseDecode: (input: string) => Uint8Array
  encoder: Encoder
  decoder: Decoder
  constructor (name: string, prefix: string, baseEncode: (input: Uint8Array) => string, baseDecode: (input: string) => Uint8Array) {
    this.name = name
    this.prefix = prefix
    this.baseEncode = baseEncode
    this.baseDecode = baseDecode
    this.encoder = new Encoder(name, prefix, baseEncode)
    this.decoder = new Decoder(name, prefix, baseDecode)
  }

  encode (input: Uint8Array) {
    return this.encoder.encode(input)
  }

  decode (input: string) {
    return this.decoder.decode(input)
  }
}
export function from ({ name, prefix, encode, decode }: { name: string, prefix: string, encode: (input: Uint8Array) => string, decode: (input: string) => Uint8Array }) {
  return new Codec(name, prefix, encode, decode)
}
export function baseX ({ name, prefix, alphabet }: { name: string, prefix: string, alphabet: string }) {
  const { encode, decode } = basex(alphabet, name)
  return from({
    prefix,
    name,
    encode,
    decode: (text) => coerce(decode(text))
  })
}
function decode (string: string, alphabet: string, bitsPerChar: number, name: string) {
  // Build the character lookup table:
  const codes: Record<string, number> = {}
  for (let i = 0; i < alphabet.length; ++i) {
    codes[alphabet[i]] = i
  }
  // Count the padding bytes:
  let end = string.length
  while (string[end - 1] === '=') {
    --end
  }
  // Allocate the output:
  const out = new Uint8Array((end * bitsPerChar / 8) | 0)
  // Parse the data:
  let bits = 0 // Number of bits currently in the buffer
  let buffer = 0 // Bits waiting to be written out, MSB first
  let written = 0 // Next byte to write
  for (let i = 0; i < end; ++i) {
    // Read one character from the string:
    const value = codes[string[i]]
    if (value === undefined) {
      throw new SyntaxError(`Non-${name} character`)
    }
    // Append the bits to the buffer:
    buffer = (buffer << bitsPerChar) | value
    bits += bitsPerChar
    // Write out some bits if the buffer has a byte's worth:
    if (bits >= 8) {
      bits -= 8
      out[written++] = 0xff & (buffer >> bits)
    }
  }
  // Verify that we have received just enough bits:
  if (bits >= bitsPerChar || (0xff & (buffer << (8 - bits))) !== 0) {
    throw new SyntaxError('Unexpected end of data')
  }
  return out
}
function encode (data: Uint8Array, alphabet: string, bitsPerChar: number) {
  const pad = alphabet[alphabet.length - 1] === '='
  const mask = (1 << bitsPerChar) - 1
  let out = ''
  let bits = 0 // Number of bits currently in the buffer
  let buffer = 0 // Bits waiting to be written out, MSB first
  for (let i = 0; i < data.length; ++i) {
    // Slurp data into the buffer:
    buffer = (buffer << 8) | data[i]
    bits += 8
    // Write out as much as we can:
    while (bits > bitsPerChar) {
      bits -= bitsPerChar
      out += alphabet[mask & (buffer >> bits)]
    }
  }
  // Partial character:
  if (bits !== 0) {
    out += alphabet[mask & (buffer << (bitsPerChar - bits))]
  }
  // Add padding characters until we hit a byte boundary:
  if (pad) {
    while (((out.length * bitsPerChar) & 7) !== 0) {
      out += '='
    }
  }
  return out
}
/**
 * RFC4648 Factory
 */
export function rfc4648 ({ name, prefix, bitsPerChar, alphabet }: { name: string, prefix: string, bitsPerChar: number, alphabet: string }) {
  return from({
    prefix,
    name,
    encode (input: Uint8Array) {
      return encode(input, alphabet, bitsPerChar)
    },
    decode (input: string) {
      return decode(input, alphabet, bitsPerChar, name)
    }
  })
}
