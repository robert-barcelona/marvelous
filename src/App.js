import React, { Component } from 'react';
import logic from './logic'
import CharacterBoard from './components/CharacterBoard/CharacterBoard'

class App extends Component {

  state = {
    characters:[],
  }

  cardSize = 'portrait_xlarge'

  componentDidMount() {
    logic.getMarvelCharacters()
      .then(characters => this.setState({characters}))
      .catch(error => console.log(error))
  }


  render() {

    const {state:{characters}} = this

    return (
      <div >
        <header >


        </header>
        <main>
          <CharacterBoard characters={characters} cardSize={this.cardSize}/>
        </main>
      </div>
    );
  }
}

export default App;
