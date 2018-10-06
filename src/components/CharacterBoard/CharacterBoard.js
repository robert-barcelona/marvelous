import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CharacterCard from "../CharacterCard/CharacterCard"


class CharacterBoard extends Component {

  static propTypes = {
    characters: PropTypes.array,
    cardSize: PropTypes.string,
  }


  render() {
    const {props: {characters,cardSize}} = this

    const characterDivs = characters.map((character, i) => <CharacterCard key={i + Math.random()}
      character={character}
      cardSize={cardSize}
    />)


    return <div>
      {characterDivs}
    </div>


  }


}

export default CharacterBoard