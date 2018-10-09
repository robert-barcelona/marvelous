import React from 'react'
import './GameHeader.css'
import {Container, Row, Col} from 'reactstrap'


function GameHeader(props) {

  return <header>
    <Container>
      <Row>
        <Col xs='12' md='12'>
          <h1 className='gameHeader__title'> Marvelous: <span className='gameHeader__title-detail'>the Marvel Card Matching Game</span></h1>
        </Col>
      </Row>
    </Container>

  </header>


}


export default GameHeader