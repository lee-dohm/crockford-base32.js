const symbols = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'

class Base32 {
  static encode (item, options = {}) {
    return Base32.encodeBuffer(Buffer.from(item))
  }

  static encodeBuffer (buffer) {
    const chunks = Math.floor(buffer.length / 5) + 1
    let encoded = ''

    for (let i = 0; i < chunks; ++i) {
      const chunk = buffer.slice(i * 5, (i + 1) * 5)
      encoded += Base32.encodeChunk(chunk)
    }

    return encoded
  }

  static encodeChunk (chunk) {
    let encoded = ''

    switch (chunk.length) {
      case 1:
        encoded += Base32.encodeSingleValue(chunk[0] >>> 3)
        encoded += Base32.encodeSingleValue((chunk[0] & 7) << 2)
        break

      case 2:
        encoded += Base32.encodeSingleValue(chunk[0] >>> 3)
        encoded += Base32.encodeSingleValue(((chunk[0] & 7) << 2) + (chunk[1] >>> 6))
        encoded += Base32.encodeSingleValue((chunk[1] & 62) >>> 1)
        encoded += Base32.encodeSingleValue((chunk[1] & 1) << 4)
        break

      case 3:
        encoded += Base32.encodeSingleValue(chunk[0] >>> 3)
        encoded += Base32.encodeSingleValue(((chunk[0] & 7) << 2) + (chunk[1] >>> 6))
        encoded += Base32.encodeSingleValue((chunk[1] & 62) >>> 1)
        encoded += Base32.encodeSingleValue(((chunk[1] & 1) << 4) + ((chunk[2] & 240) >>> 4))
        encoded += Base32.encodeSingleValue((chunk[2] & 15) << 1)
        break

      case 4:
        encoded += Base32.encodeSingleValue(chunk[0] >>> 3)
        encoded += Base32.encodeSingleValue(((chunk[0] & 7) << 2) + (chunk[1] >>> 6))
        encoded += Base32.encodeSingleValue((chunk[1] & 62) >>> 1)
        encoded += Base32.encodeSingleValue(((chunk[1] & 1) << 4) + ((chunk[2] & 240) >>> 4))
        encoded += Base32.encodeSingleValue(((chunk[2] & 15) << 1) + (chunk[3] >>> 7))
        encoded += Base32.encodeSingleValue((chunk[3] & 124) >>> 2)
        encoded += Base32.encodeSingleValue((chunk[3] & 3) << 3)
        break

      case 5:
        encoded += Base32.encodeSingleValue(chunk[0] >>> 3)
        encoded += Base32.encodeSingleValue(((chunk[0] & 7) << 2) + (chunk[1] >>> 6))
        encoded += Base32.encodeSingleValue((chunk[1] & 62) >>> 1)
        encoded += Base32.encodeSingleValue(((chunk[1] & 1) << 4) + ((chunk[2] & 240) >>> 4))
        encoded += Base32.encodeSingleValue(((chunk[2] & 15) << 1) + (chunk[3] >>> 7))
        encoded += Base32.encodeSingleValue((chunk[3] & 124) >>> 2)
        encoded += Base32.encodeSingleValue(((chunk[3] & 3) << 3) + (chunk[4] >>> 5))
        encoded += Base32.encodeSingleValue(chunk[4] & 31)
        break
    }

    return encoded
  }

  static encodeSingleValue (value) {
    return symbols.slice(value, value + 1)
  }
}

module.exports = Base32
