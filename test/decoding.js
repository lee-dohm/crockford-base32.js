const expect = require('chai').expect

const base32 = require('../lib/index.js')

describe('decoding', function () {
  describe('decode', function () {
    it('decodes a base32-encoded text string', function () {
      expect(base32.decode('A1850M2G')).to.equal('PPPPP')
    })

    it('handles lowercase', function () {
      expect(base32.decode('a1850m2g')).to.equal('PPPPP')
    })

    it('handles substitutions', function () {
      expect(base32.decode('Al85OM2G')).to.equal('PPPPP')
    })

    it('handles longer length strings', function () {
      expect(base32.decode('A1850M2GAl85OM2G')).to.equal('PPPPPPPPPP')
    })
  })

  describe('decodeChunk', function () {
    it('decodes two symbols', function () {
      expect(base32.decodeChunk('A1')).to.equal('P')
    })

    it('decodes four symbols', function () {
      expect(base32.decodeChunk('A185')).to.equal('PP')
    })

    it('decodes five symbols', function () {
      expect(base32.decodeChunk('A1850')).to.equal('PPP')
    })

    it('decodes seven symbols', function () {
      expect(base32.decodeChunk('A1850M2')).to.equal('PPPP')
    })

    it('decodes eight symbols', function () {
      expect(base32.decodeChunk('A1850M2G')).to.equal('PPPPP')
    })
  })

  describe('decodeSingleValue', function () {
    it('decodes any of the symbols to their numeric value', function () {
      expect(base32.decodeSingleValue('0')).to.equal(0)
      expect(base32.decodeSingleValue('Z')).to.equal(31)
    })

    it('decodes lowercase symbols to the numeric value of the uppercase version', function () {
      expect(base32.decodeSingleValue('a')).to.equal(10)
      expect(base32.decodeSingleValue('z')).to.equal(31)
    })

    it('decodes "o" to zero and "l" or "i" to one', function () {
      expect(base32.decodeSingleValue('o')).to.equal(0)
      expect(base32.decodeSingleValue('l')).to.equal(1)
      expect(base32.decodeSingleValue('i')).to.equal(1)
    })
  })
})
