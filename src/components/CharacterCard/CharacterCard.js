import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './CharacterCard.css'

class CharacterCard extends Component {
  static propTypes = {
    character: PropTypes.object,
    cardSize: PropTypes.string,
    onCardSelected: PropTypes.func,
  }

  onCardSelected = (e) => {
    const {props: {character, onCardSelected}} = this
    e.preventDefault()
    onCardSelected(character.cardID)
  }

  render() {
    const {props: {character, cardSize}} = this
    const {thumbnail} = character
    const imgURL = `${thumbnail.path}/${cardSize}.${thumbnail.extension}`

    return <div className='characterCard__card'>
      <div className='characterCard__card-back'>
        <img src="/images/card_back.svg" alt=""/>
      </div>
      < div className='characterCard__card-front'>< a href="/#" onClick={this.onCardSelected}>< img alt='' src={imgURL}/></a></div>
      </div>

      }


      }

      export default CharacterCard