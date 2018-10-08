import React, {Component} from 'react';
import logic from './logic'

import CharacterBoard from './components/CharacterBoard/CharacterBoard'

class App extends Component {

  state = {
    characters: [],
  }

  CARD_SIZE=  'portrait_xlarge'

  HIDE_CARDS_TIMEOUT = 1000 * 5

  currentlySelected = null
  maySelectCharacter = true

  componentDidMount() {
    this.getCharacters()
  }


  getCharacters = () => {
    logic.getMarvelCharacters(0, 100)
      .then(characters => this.setState({characters}))
      .catch(error => console.log(error))
  }


  onCardSelected = (cardID) => {
    const {state: {characters}} = this

    const character = characters.find(character => character.cardID === cardID)
    character.revealed = true
    if (!this.currentlySelected) {
      this.currentlySelected = character
    } else if (character.id === this.currentlySelected.id) {
      character.matched = this.currentlySelected.matched = true
      this.currentlySelected = null
    } else {
      this.maySelectCharacter = false
      setTimeout(this.hideSelectedCharacters, this.HIDE_CARDS_TIMEOUT)
    }
  }

  hideSelectedCharacters = () => {
    const {state: {characters}} = this
    characters.forEach(character => {
      if (!character.matched) character.revealed = false
    })
  }


  render() {

    const {state: {characters}} = this
    return (
      <div>
        <header>
        </header>
        <main>
          <CharacterBoard
            onCardSelected={this.onCardSelected}
            rowSize={logic.ROW_SIZE}
            characters={characters}
            cardSize={this.CARD_SIZE}/>
        </main>
      </div>
    );
  }
}

export default App;
