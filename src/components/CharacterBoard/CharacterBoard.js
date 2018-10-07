import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CharacterCard from "../CharacterCard/CharacterCard"
import './CharacterBoard.css'

class CharacterBoard extends Component {

  static propTypes = {
    characters: PropTypes.array,
    cardSize: PropTypes.string,
    rowSize: PropTypes.number,
  }


  render() {
    const {props: {characters, rowSize, cardSize}} = this
    const rowUnit = 12 / rowSize

    const cardLayout = characters.map((character, i) => {

      return  <div className='characterBoard__card'>
          <CharacterCard key={i + Math.random()}
                         character={character}
                         cardSize={cardSize}
          />
        </div>


        })

        return <div className='characterBoard__board'>
            {cardLayout}
        </div>


        }


        }

        export default CharacterBoard