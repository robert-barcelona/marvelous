const logic = require('.')
const {expect} = require('chai')


describe('logic', () => {
  const expectedResponse = 200
  const path = `characters?offset=0&limit=15&`

  describe('internal API call', () => {
    it('should succeed on correct values', () =>
      logic._apiCall(path, expectedResponse)
        .then(response => {
          const characters = response.data.data.results
          expect(characters).to.be.an('array')
          expect(characters.length).to.equal(15)
          expect(characters[0].name).to.be.a('string')
        })
    )

    it('should fail on bad path', () =>
      logic._apiCall('xyz123', expectedResponse)
        .catch(error => {
          expect(error).to.be.equal("Bad API call, status = 409")
        })
    )

    it('should fail on missing path', () =>
      logic._apiCall('', expectedResponse)
        .catch(error => {
          expect(error).to.be.equal("invalid path")
        })
    )


  })


})