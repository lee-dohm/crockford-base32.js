const expect = require('chai').expect

const base32 = require('../lib/index.js')

describe('decoding', function () {
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
