import React, {Component} from 'react';
import logic from './logic'
import * as log from 'loglevel'
import {Container, Col, Row} from 'reactstrap'
import './App.css'

import CharacterBoard from './components/CharacterBoard/CharacterBoard'
import GameHeader from './components/GameHeader/GameHeader'

class App extends Component {


  state = {
    characters: [],
  }

  CARD_SIZE = 'portrait_xlarge'

  HIDE_CARDS_TIMEOUT = 1000 * 1

  currentlySelected = null
  maySelectCharacter = true

  componentDidMount() {
    this.getCharacters()
    log.setLevel('debug')
  }


  getCharacters = () => {
    logic.getMarvelCharacters(0, 100)
      .then(characters => this.setState({characters}))
      .catch(error => log.error(error))
  }


  onCardSelected = (cardID) => {
    const {state: {characters}} = this
    const character = characters.find(character => character.cardID === cardID)
    if (!this.maySelectCharacter) return

    character.revealed = true
    if (!this.currentlySelected) {
      this.currentlySelected = character
    } else if (character.id === this.currentlySelected.id) {
      log.debug('a match with id', character.id)
      character.matched = this.currentlySelected.matched = true
      this.currentlySelected = null
    } else {
      this.maySelectCharacter = false
      this.currentlySelected = null
      setTimeout(this.hideSelectedCharacters, this.HIDE_CARDS_TIMEOUT)
    }
    this.setState({characters})
  }

  hideSelectedCharacters = () => {
    const {state: {characters}} = this
    characters.forEach(character => {
      if (!character.matched) character.revealed = false
    })
    this.maySelectCharacter = true
    this.setState({characters})
  }


  render() {
    const {state: {characters}} = this
    return (<Container>

        <div className="app__background-video">
            <video autoPlay muted loop class="app__background-video-video">
              <source src="video/starscape.mp4" type="video/mp4"/>
            </video>
        </div>
        <div className='app__content'>

          <Row>
            <Col>
              <GameHeader/>
            </Col>
          </Row>
          <Row>
            <Col xs='12' md='3'>

              <aside></aside>
            </Col>
            <Col xs='12' md='9'>
              <main>
                <CharacterBoard
                  onCardSelected={this.onCardSelected}
                  rowSize={logic.ROW_SIZE}
                  characters={characters}
                  cardSize={this.CARD_SIZE}/>
              </main>
            </Col>

          </Row>
        </div>
      </Container>

    );
  }
}

export default App;
