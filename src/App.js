import React, {Component} from 'react';
import logic from './logic'
import shuffleArray from './utilities/shuffleArray'

import CharacterBoard from './components/CharacterBoard/CharacterBoard'

class App extends Component {

  state = {
    characters: [],
  }

  CARD_SIZE = 'standard_xlarge'
  ROW_SIZE = 6
  IMAGE_COUNT_FOR_BOARD = (this.ROW_SIZE * this.ROW_SIZE) / 2
  HIDE_CARDS_TIMEOUT = 1000 * 5

  currentlySelected = null
  maySelectCharacter = true

  componentDidMount() {
    this.getCharacters()
  }


  getCharacters = () => {
    logic.getMarvelCharacters(0, 100)
      .then(characters => this.processCharacters(characters))
      .catch(error => console.log(error))
  }

  setupCharacters = (characters) => {
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
      char.cardID += this.IMAGE_COUNT_FOR_BOARD
      charactersDupe.push(char)
    })
    let finalCharacters = [...characters, ...charactersDupe] // we need two of each character
    finalCharacters = shuffleArray(finalCharacters)
    this.setState({characters:finalCharacters})
  }

  processCharacters = (characters) => {
    // get rid of those characters without an image -- or try to
    characters = characters.filter(character => !character.thumbnail.path.includes('image_not_available'))
    const charactersRetrieved = [...this.state.characters, ...characters]

    // check if we have enough and if not get some more
    if (charactersRetrieved.length < this.IMAGE_COUNT_FOR_BOARD) this.getCharacters()
    // otherwise let's move on
    else this.setupCharacters(charactersRetrieved)
  }

  onCardSelected = (cardID) => {
    const {state: {characters}} = this

    const character = characters.find(character => character.cardID === cardID)
    character.revealed = true
    console.log("this currently selected",this.currentlySelected)
    if (this.currentlySelected) console.log(this.currentlySelected.id,character.id)
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
            rowSize={this.ROW_SIZE}
            characters={characters}
            cardSize={this.CARD_SIZE}/>
        </main>
      </div>
    );
  }
}

export default App;
