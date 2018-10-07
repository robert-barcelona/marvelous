import React, {Component} from 'react'
import PropTypes from 'prop-types'


class CharacterCard extends Component {
  static propTypes = {
    character: PropTypes.object,
    cardSize: PropTypes.string,
    onCardSelected: PropTypes.func,
  }

  onCardSelected = (e) => {
    const {props: {character,onCardSelected}} = this
    e.preventDefault()
    onCardSelected(character.cardID)
  }

  render() {
    const {props: {character, cardSize}} = this
    const {thumbnail} = character
    const imgURL = `${thumbnail.path}/${cardSize}.${thumbnail.extension}`

    return <a href="/#" onClick={this.onCardSelected}><img alt='' src={imgURL}/></a>

  }

}

export default CharacterCard