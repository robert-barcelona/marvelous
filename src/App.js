import React, {Component} from 'react';
import logic from './logic'
import * as log from 'loglevel'
import {Container, Col, Row, Alert} from 'reactstrap'
import './App.css'
import Swal from 'sweetalert2'

import CharacterBoard from './components/CharacterBoard/CharacterBoard'
import GameHeader from './components/GameHeader/GameHeader'
import Scoreboard from './components/Scoreboard/Scoreboard'

class App extends Component {


  state = {
    characters: [],
    seconds: 0,
    matched: '',
    isPlaying: false,
    error: '',
  }

  CARD_SIZE = 'standard_large'
  HIDE_CARDS_TIMEOUT = 1000 * 1

  currentlySelected = null
  secondsInterval = null
  maySelectCharacter = true

  componentDidMount() {
    this.getCharacters()
      .then(() => {
        log.setLevel('debug')
        this.firstModal()
      })
  }

  /**
   * modal dialog on opening
   */
  firstModal = () => {
    Swal({
      title: "Welcome to MARVELous, the Marvel Hero matching game!",
      text: 'Your job is to match the Marvel heroes in the least amount of time possible!',
      type: 'info',
      confirmButtonText: "Let's go!",
      onClose: this.startGame,
    })
  }

  /**
   * modal dialog on end game
   */
  playAgainModal = () => {
    const {state: {seconds}} = this
    Swal({
      title: "You've matched them all!",
      text: `Congrats!  You've matched all the Marvel heroes in ${seconds} seconds! Play again?`,
      type: 'info',
      confirmButtonText: "Sure!",
      cancelButtonText: 'No thanks!',
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        this.restartGame()
      } else {
        Swal({
          text: 'OK, thanks for playing!',
          type: 'info',
        })
      }
    })
  }

  /**
   * start the game
   */
  startGame = () => {
    this.secondsInterval = setInterval(this.tickTock, 1000)
    this.maySelectCharacter = true
    this.setState({seconds: 0, isPlaying: true})
  }

  /**
   * restart the game
   */
  restartGame = () => {
    this.getCharacters(0, 100)
      .then(() => this.startGame())
      .catch(error => this.setState({error}))
  }

  /**
   * at end of game
   */
  endGame = () => {
    if (this.secondsInterval) clearInterval(this.secondsInterval)
    this.maySelectCharacter = false
    this.setState({error: '', matched: '', isPlaying: false, characters: []})
    this.playAgainModal()
  }

  /**
   * called every 1 second to update time in timer
   */
  tickTock = () => {
    let {state: {seconds}} = this
    seconds++
    this.setState({seconds})
  }

  /**
   * Call API to get the Marvel characters
   *
   * @returns {Promise<T | void>}
   */
  getCharacters = () => {
    return logic.getMarvelCharacters()
      .then(characters => this.setState({characters}))
      .then(() => this.preloadImages())
      .catch(error => this.setState({error}))
  }

  /**
   * preload the character images
   * @param characters:object[]
   */
  preloadImages = (characters) => {
    characters.forEach(character => {
      let {thumbnail } = character
      let imgURL
        if (thumbnail) {
          imgURL = `${thumbnail.path}/${this.CARD_SIZE}.${thumbnail.extension}`
          const img = new Image()
          img.src = imgURL
        }

    })
  }

  /**
   * when a card is clicked
   *
   * @param cardID: number
   */
  onCardSelected = (cardID) => {
    const {state: {characters}} = this
    const character = characters.find(character => character.cardID === cardID)
    let matched = ''
    if (!this.maySelectCharacter) return

    character.revealed = true
    if (!this.currentlySelected) {
      this.currentlySelected = character
    } else if (character.id === this.currentlySelected.id) {
      character.matched = this.currentlySelected.matched = true
      matched = character.name
      this.currentlySelected = null
    } else {
      this.maySelectCharacter = false
      this.currentlySelected = null
      setTimeout(this.hideSelectedCharacters, this.HIDE_CARDS_TIMEOUT)
    }
    if (!characters.some(character => !character.matched)) this.endGame()
    else this.setState({matched, characters})
  }

  /**
   * "turn card back over" after timeout if not matched
   */
  hideSelectedCharacters = () => {
    const {state: {characters}} = this
    characters.forEach(character => {
      if (!character.matched) character.revealed = false
    })
    this.maySelectCharacter = true
    this.setState({characters})
  }


  render() {
    const {state: {error, isPlaying, matched, seconds, characters}} = this
    return (<Container>
        <div className="app__background-video">
          <video autoPlay muted poster="images/starscape.png" loop className="app__background-video-video">
            <source src="video/starscape.mp4" type="video/mp4"/>
          </video>
        </div>
        {isPlaying && <div className='app__content'>
          <Row>
            <Col>
              <GameHeader/>
            </Col>
          </Row>
          <Row>
            <Col xs='12' md='3'>
              <aside className='app__scoreboard'>
                <Scoreboard
                  intro={this.INTRO_TEXT}
                  matched={matched}
                  seconds={seconds}/>
              </aside>
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
          {error.length > 0 && <Row>
            <Alert color="danger">
              There was an error: {error}
            </Alert>
          </Row>}
        </div>}
      </Container>
    );
  }
}

export default App;
