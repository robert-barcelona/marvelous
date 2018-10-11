import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './CharacterCard.css'
import classNames from 'classnames'

class CharacterCard extends Component {
  static propTypes = {
    character: PropTypes.object,
    cardSize: PropTypes.string,
    onCardSelected: PropTypes.func,
  }

  onCardSelected = (e) => {
    const {props: {character, onCardSelected}} = this
    e.preventDefault()
    if (!character.revealed  && !character.matched)   onCardSelected(character.cardID)
  }

  render() {
    const {props: {character, cardSize}} = this
    const {thumbnail, revealed} = character
    const imgURL = `${thumbnail.path}/${cardSize}.${thumbnail.extension}`

   // const topCardClass = classNames('characterCard__card-back', {'characterCard__card-back--hidden': revealed})
    return < a href="/#" onClick={this.onCardSelected}>
      <div className='characterCard__card'>
       {!revealed && <div className='characterCard__card-back'>
          <img src="/images/card_back.png" alt=""/>
        </div>}
       {revealed && < div className='characterCard__card-front'>< img alt=''
                                                          src={imgURL}/>
        </div>}
      </div>
    </a>

  }


}

export default CharacterCard