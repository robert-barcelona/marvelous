import React, {Component} from 'react'
import PropTypes from 'prop-types'


class CharacterCard extends Component {
  static propTypes = {
    character: PropTypes.object,
    cardSize: PropTypes.string,
  }


  render() {
    const {props: {character, cardSize}} = this
    const {thumbnail} = character
    const imgURL = `${thumbnail.path}/${cardSize}.${thumbnail.extension}`

    return <img alt='' src={imgURL}/>

  }

}

export default CharacterCard