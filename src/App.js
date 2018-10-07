import React, {Component} from 'react';
import logic from './logic'
import CharacterBoard from './components/CharacterBoard/CharacterBoard'

class App extends Component {

  state = {
    characters: [],
  }

  CARD_SIZE = 'standard_xlarge'
  IMAGES_FOR_BOARD = 15

  componentDidMount() {
    this.getCharacters()
  }

  getCharacters() {
    logic.getMarvelCharacters(0, 100)
      .then(characters => this.processCharacters(characters))
      .catch(error => console.log(error))
  }

  processCharacters(characters) {
    characters = characters.filter(character => !character.thumbnail.path.includes('image_not_available'))
    const stateCharacters = [...this.state.characters, ...characters]
    this.setState({characters: stateCharacters})
    if (stateCharacters.length < this.IMAGES_FOR_BOARD) this.getCharacters()
  }


  render() {

    const {state: {characters}} = this
    console.log(characters)
    return (
      <div>
        <header>
        </header>
        <main>
          <CharacterBoard characters={characters} cardSize={this.CARD_SIZE}/>
        </main>
      </div>
    );
  }
}

export default App;
