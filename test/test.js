const expect = require('chai').expect

const base32 = require('../lib/index.js')

describe('base32', function () {
  describe('encoding', function () {
    describe('encode', function () {
      it('encodes "fubarfubar" into "CSTP4RBJCSTP4RBJ"', function () {
        expect(base32.encode('fubarfubar')).to.equal('CSTP4RBJCSTP4RBJ')
      })

      it('encodes "fubarfuz" into "CSTP4RBJCSTQM"', function () {
        expect(base32.encode('fubarfuz')).to.equal('CSTP4RBJCSTQM')
      })
    })

    describe('encodeBuffer', function () {
      it('encodes "fubarfubar" into "CSTP4RBJCSTP4RBJ"', function () {
        expect(base32.encodeBuffer(Buffer.from('fubarfubar'))).to.equal('CSTP4RBJCSTP4RBJ')
      })

      it('encodes "fubarfub" into the padded text', function () {
        expect(base32.encodeBuffer(Buffer.from('fubarfuz'))).to.equal('CSTP4RBJCSTQM')
      })
    })

    describe('encodeChunk', function () {
      it('encodes first sample into all ones digits', function () {
        const buffer = Buffer.alloc(5)
        buffer.writeUInt8(8, 0)
        buffer.writeUInt8(66, 1)
        buffer.writeUInt8(16, 2)
        buffer.writeUInt8(132, 3)
        buffer.writeUInt8(33, 4)

        expect(base32.encodeChunk(buffer)).to.equal('11111111')
      })

      it('encodes second sample into the digits one through eight', function () {
        const buffer = Buffer.alloc(5)
        buffer.writeUInt8(8, 0)
        buffer.writeUInt8(134, 1)
        buffer.writeUInt8(66, 2)
        buffer.writeUInt8(152, 3)
        buffer.writeUInt8(232, 4)

        expect(base32.encodeChunk(buffer)).to.equal('12345678')
      })

      it('encodes one character by emitting two digits', function () {
        const buffer = Buffer.alloc(1)
        buffer.writeUInt8(255, 0)

        expect(base32.encodeChunk(buffer)).to.equal('ZW')
      })

      it('encodes two characters by emitting four digits', function () {
        const buffer = Buffer.alloc(2)
        buffer.writeUInt8(255, 0)
        buffer.writeUInt8(255, 1)

        expect(base32.encodeChunk(buffer)).to.equal('ZZZG')
      })

      it('encodes three characters by emitting five digits', function () {
        const buffer = Buffer.alloc(3)
        buffer.writeUInt8(255, 0)
        buffer.writeUInt8(255, 1)
        buffer.writeUInt8(255, 2)

        expect(base32.encodeChunk(buffer)).to.equal('ZZZZY')
      })

      it('encodes four characters by emitting seven digits', function () {
        const buffer = Buffer.alloc(4)
        buffer.writeUInt8(255, 0)
        buffer.writeUInt8(255, 1)
        buffer.writeUInt8(255, 2)
        buffer.writeUInt8(255, 3)

        expect(base32.encodeChunk(buffer)).to.equal('ZZZZZZR')
      })
    })
  })
})
