import axios from 'axios'
import fakedata from '../temporary_data.json'
const logic = {

    _base: 'https://gateway.marvel.com:443/v1/public',

    _apiKey: 'dd93a2eeed1c0d0a981096c21195afd8',


    _validateStringField(fieldName, fieldValue) {
        if (typeof fieldValue !== 'string' || !fieldValue.length) throw new Error(`invalid ${fieldName}`)
    },

    _validateNumberField(fieldName, fieldValue) {
        if (typeof fieldValue !== 'number') throw new Error(`invalid ${fieldName}`)
    },

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

    getMarvelCharacters(offset = 0, limit = 15) {



        return Promise.resolve(() => {
          return JSON.parse(fakedata)

            this._validateNumberField('offset', offset)
            this._validateNumberField('limit', limit)
        })
            .then(() => this._apiCall(`characters?offset=${offset}&limit=${limit}&`, 200))
            .then(response => {
                return response.data.data.results
            })

    },


}

export default logic