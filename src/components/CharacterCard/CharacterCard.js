import React from 'react'
import PropTypes from 'prop-types'

CharacterCard.propTypes = {
  character: PropTypes.object,
  cardSize: PropTypes.string,
}

function CharacterCard(props) {

  const {character, cardSize} = props
  const {thumbnail} = character

  const imgURL = `${thumbnail.path}/${cardSize}.${thumbnail.extension}`

  return <div>
    <img src={imgURL}/>
  </div>


}

export default CharacterCard