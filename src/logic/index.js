import axios from 'axios'
import fakedata from '../temporary_data.json'
import shuffleArray from '../utilities/shuffleArray'

const logic = {

  ROW_SIZE: 4,
  IMAGE_COUNT_FOR_BOARD: 8,

  _base: 'https://gateway.marvel.com:443/v1/public',

  _apiKey: 'dd93a2eeed1c0d0a981096c21195afd8',

  /**
   * validate that field contains string value
   * throws error if not
   *
   * @param fieldName:string
   * @param fieldValue:*
   * @private
   */
  _validateStringField(fieldName, fieldValue) {
    if (typeof fieldValue !== 'string' || !fieldValue.length) throw new Error(`invalid ${fieldName}`)
  },

  /**
   * validate that field contains number value
   * throws error if not
   *
   * @param fieldName:string
   * @param fieldValue:*
   * @private
   */
  _validateNumberField(fieldName, fieldValue) {
    if (typeof fieldValue !== 'number') throw new Error(`invalid ${fieldName}`)
  },

  /**
   * calls Marvel api to get character information
   *
   * @param path:string
   * @param expectedResponse:number
   * @returns {Promise<AxiosResponse<any> | never>}
   * @private
   */
  _apiCall(path, expectedResponse) {
    return Promise.resolve(() => {
      this._validateStringField('path', path)
      this._validateNumberField('expectedResponse', expectedResponse)
    })
      .then(() => axios.get(`${this._base}/${path}apikey=${this._apiKey}`))
      .then(response => {
        if (response.status === expectedResponse) {
          return response
        } else
          throw new Error(`Bad API call, status = ${response.status}`)
      })
      .catch(error => {
        throw new Error(`Bad API call, error = ${error}`)
      })
  },

  /**
   * processes characters to fit needs of game
   *
   * @param characters:object[]
   * @returns {*|any[]}
   * @private
   */
  _setupCharacters(characters) {
    characters = characters.slice(0, this.IMAGE_COUNT_FOR_BOARD) // let's only work with the images we need
    characters = characters.map((character, i) => {
      // add extra data we need for our game
      // we should probably filter out all the extra Marvel data but for now it doesn't hurt us
      character.revealed = false
      character.matched = false
      character.id = character.cardID = i
      return character
    })
    const charactersDupe = []
    characters.forEach(character => {
      let char = Object.assign({}, character)
      char.cardID += this.IMAGE_COUNT_FOR_BOARD // can't have the same cardID
      charactersDupe.push(char)
    })
    let finalCharacters = [...characters, ...charactersDupe] // we need two of each character
    finalCharacters = shuffleArray(finalCharacters)
    return finalCharacters
  },

  /**
   * attempt to remove all characters which do not have an image
   *
   * @param characters:object[]
   * @returns {*|*|any[]}
   * @private
   */
  _processCharacters(characters) {
    // get rid of those characters without an image -- or try to
    characters = characters.filter(character => !character.thumbnail.path.includes('image_not_available'))
    return this._setupCharacters(characters)
  },

  /**
   * externally available method for presentation layer to get Marvel characters
   * @param offset:number
   * @param limit: number
   * @returns {Promise<Function | never>}
   */
  getMarvelCharacters(offset = 0, limit = 15) {

    return Promise.resolve(() => {
      // return this._processCharacters( JSON.parse(fakedata))
      this._validateNumberField('offset', offset)
      this._validateNumberField('limit', limit)
    })
      .then(() => this._apiCall(`characters?offset=${offset}&limit=${limit}&`, 200))
      .then(response => this._processCharacters(response.data.data.results))

  },


}

export default logic