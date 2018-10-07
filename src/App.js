import React, {Component} from 'react';
import logic from './logic'
import CharacterBoard from './components/CharacterBoard/CharacterBoard'

class App extends Component {

  state = {
    characters: [],
  }

  CARD_SIZE = 'standard_xlarge'
  ROW_SIZE = 6

  IMAGES_FOR_BOARD = (this.ROW_SIZE * this.ROW_SIZE) / 2.

  componentDidMount() {
    this.getCharacters()
  }

  getCharacters() {
    logic.getMarvelCharacters(0, 100)
      .then(characters => this.processCharacters(characters))
      .catch(error => console.log(error))
  }

  setupCharacters(characters) {
    
  }

  processCharacters(characters) {
    characters = characters.filter(character => !character.thumbnail.path.includes('image_not_available'))
    const stateCharacters = [...this.state.characters, ...characters]
    this.setState({characters: stateCharacters})
    if (stateCharacters.length < this.IMAGES_FOR_BOARD) this.getCharacters()
    else this.setupCharacters(stateCharacters)
  }


  render() {

    const {state: {characters}} = this
    return (
      <div>
        <header>
        </header>
        <main>
          <CharacterBoard
            rowSize={this.ROW_SIZE}
            characters={characters}
            cardSize={this.CARD_SIZE}/>
        </main>
      </div>
    );
  }
}

export default App;
