import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CharacterCard from "../CharacterCard/CharacterCard"
import './CharacterBoard.css'
import {Container,Row,Col} from 'reactstrap'
class CharacterBoard extends Component {

  static propTypes = {
    characters: PropTypes.array,
    cardSize: PropTypes.string,
    rowSize: PropTypes.number,
    onCardSelected: PropTypes.func,
  }


  render() {
    const {props: {characters, rowSize, cardSize,onCardSelected}} = this
    const rowUnit = 12 / rowSize

    const cardLayout = characters
      .map((character, i) => (
          <Col xs={6} sm={rowUnit} key={`col-${i}`}>
            <CharacterCard
              onCardSelected = {onCardSelected}
              key={i + Math.random()}
              character={character}
              cardSize={cardSize}
            />
          </Col>
        )
      )

    return (
      <div>
        <Container>
          <Row>
            {cardLayout}
          </Row>
        </Container>
      </div>
    )
  }


        }

        export default CharacterBoard