const symbols = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'

class Base32 {
  static encode (item, options = {}) {
    return this.encodeBuffer(Buffer.from(item))
  }

  static decode (text) {
    const chunks = Math.floor(text.length / 8) + 1
    let decoded = ''

    for (let i = 0; i < chunks; ++i) {
      const chunk = text.slice(i * 8, (i + 1) * 8)
      decoded += this.decodeChunk(chunk)
    }

    return decoded
  }

  static encodeBuffer (buffer) {
    const chunks = Math.floor(buffer.length / 5) + 1
    let encoded = ''

    for (let i = 0; i < chunks; ++i) {
      const chunk = buffer.slice(i * 5, (i + 1) * 5)
      encoded += this.encodeChunk(chunk)
    }

    return encoded
  }

  static decodeChunk (chunk) {
    let decoded = ''
    let value = 0

    switch (chunk.length) {
      case 2:
        value = (this.decodeSingleValue(chunk.charAt(0)) << 3) +
                (this.decodeSingleValue(chunk.charAt(1)) >>> 2)
        decoded += String.fromCharCode(value)
        break

      case 4:
        value = (this.decodeSingleValue(chunk.charAt(0)) << 3) +
                (this.decodeSingleValue(chunk.charAt(1)) >>> 2)
        decoded += String.fromCharCode(value)
        value = ((this.decodeSingleValue(chunk.charAt(1)) & 3) << 6) +
                (this.decodeSingleValue(chunk.charAt(2)) << 1) +
                (this.decodeSingleValue(chunk.charAt(3)) >>> 4)
        decoded += String.fromCharCode(value)
        break

      case 5:
        value = (this.decodeSingleValue(chunk.charAt(0)) << 3) +
                (this.decodeSingleValue(chunk.charAt(1)) >>> 2)
        decoded += String.fromCharCode(value)
        value = ((this.decodeSingleValue(chunk.charAt(1)) & 3) << 6) +
                (this.decodeSingleValue(chunk.charAt(2)) << 1) +
                (this.decodeSingleValue(chunk.charAt(3)) >>> 4)
        decoded += String.fromCharCode(value)
        value = ((this.decodeSingleValue(chunk.charAt(3)) & 15) << 4) +
                (this.decodeSingleValue(chunk.charAt(4)) >>> 1)
        decoded += String.fromCharCode(value)
        break

      case 7:
        value = (this.decodeSingleValue(chunk.charAt(0)) << 3) +
                (this.decodeSingleValue(chunk.charAt(1)) >>> 2)
        decoded += String.fromCharCode(value)
        value = ((this.decodeSingleValue(chunk.charAt(1)) & 3) << 6) +
                (this.decodeSingleValue(chunk.charAt(2)) << 1) +
                (this.decodeSingleValue(chunk.charAt(3)) >>> 4)
        decoded += String.fromCharCode(value)
        value = ((this.decodeSingleValue(chunk.charAt(3)) & 15) << 4) +
                (this.decodeSingleValue(chunk.charAt(4)) >>> 1)
        decoded += String.fromCharCode(value)
        value = ((this.decodeSingleValue(chunk.charAt(4)) & 1) << 7) +
                (this.decodeSingleValue(chunk.charAt(5)) << 2) +
                (this.decodeSingleValue(chunk.charAt(6)) >>> 3)
        decoded += String.fromCharCode(value)
        break

      case 8:
        value = (this.decodeSingleValue(chunk.charAt(0)) << 3) +
                (this.decodeSingleValue(chunk.charAt(1)) >>> 2)
        decoded += String.fromCharCode(value)
        value = ((this.decodeSingleValue(chunk.charAt(1)) & 3) << 6) +
                (this.decodeSingleValue(chunk.charAt(2)) << 1) +
                (this.decodeSingleValue(chunk.charAt(3)) >>> 4)
        decoded += String.fromCharCode(value)
        value = ((this.decodeSingleValue(chunk.charAt(3)) & 15) << 4) +
                (this.decodeSingleValue(chunk.charAt(4)) >>> 1)
        decoded += String.fromCharCode(value)
        value = ((this.decodeSingleValue(chunk.charAt(4)) & 1) << 7) +
                (this.decodeSingleValue(chunk.charAt(5)) << 2) +
                (this.decodeSingleValue(chunk.charAt(6)) >>> 3)
        decoded += String.fromCharCode(value)
        value = ((this.decodeSingleValue(chunk.charAt(6)) & 7) << 5) +
                (this.decodeSingleValue(chunk.charAt(7)))
        decoded += String.fromCharCode(value)
        break
    }

    return decoded
  }

  static encodeChunk (chunk) {
    let encoded = ''

    switch (chunk.length) {
      case 1:
        encoded += this.encodeSingleValue(chunk[0] >>> 3)
        encoded += this.encodeSingleValue((chunk[0] & 7) << 2)
        break

      case 2:
        encoded += this.encodeSingleValue(chunk[0] >>> 3)
        encoded += this.encodeSingleValue(((chunk[0] & 7) << 2) + (chunk[1] >>> 6))
        encoded += this.encodeSingleValue((chunk[1] & 62) >>> 1)
        encoded += this.encodeSingleValue((chunk[1] & 1) << 4)
        break

      case 3:
        encoded += this.encodeSingleValue(chunk[0] >>> 3)
        encoded += this.encodeSingleValue(((chunk[0] & 7) << 2) + (chunk[1] >>> 6))
        encoded += this.encodeSingleValue((chunk[1] & 62) >>> 1)
        encoded += this.encodeSingleValue(((chunk[1] & 1) << 4) + ((chunk[2] & 240) >>> 4))
        encoded += this.encodeSingleValue((chunk[2] & 15) << 1)
        break

      case 4:
        encoded += this.encodeSingleValue(chunk[0] >>> 3)
        encoded += this.encodeSingleValue(((chunk[0] & 7) << 2) + (chunk[1] >>> 6))
        encoded += this.encodeSingleValue((chunk[1] & 62) >>> 1)
        encoded += this.encodeSingleValue(((chunk[1] & 1) << 4) + ((chunk[2] & 240) >>> 4))
        encoded += this.encodeSingleValue(((chunk[2] & 15) << 1) + (chunk[3] >>> 7))
        encoded += this.encodeSingleValue((chunk[3] & 124) >>> 2)
        encoded += this.encodeSingleValue((chunk[3] & 3) << 3)
        break

      case 5:
        encoded += this.encodeSingleValue(chunk[0] >>> 3)
        encoded += this.encodeSingleValue(((chunk[0] & 7) << 2) + (chunk[1] >>> 6))
        encoded += this.encodeSingleValue((chunk[1] & 62) >>> 1)
        encoded += this.encodeSingleValue(((chunk[1] & 1) << 4) + ((chunk[2] & 240) >>> 4))
        encoded += this.encodeSingleValue(((chunk[2] & 15) << 1) + (chunk[3] >>> 7))
        encoded += this.encodeSingleValue((chunk[3] & 124) >>> 2)
        encoded += this.encodeSingleValue(((chunk[3] & 3) << 3) + (chunk[4] >>> 5))
        encoded += this.encodeSingleValue(chunk[4] & 31)
        break
    }

    return encoded
  }

  static decodeSingleValue (value) {
    value = value.toUpperCase()

    switch (value) {
      case 'O':
        value = '0'
        break

      case 'L':
      case 'I':
        value = '1'
        break
    }

    return symbols.indexOf(value)
  }

  static encodeSingleValue (value) {
    return symbols.slice(value, value + 1)
  }
}

module.exports = Base32
