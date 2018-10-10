import React from 'react'
import './GameHeader.css'
import {Container, Row, Col} from 'reactstrap'
import styled from 'styled-components';

const Header = styled.div`
   background-color: rgba(0, 0, 128, 0.5);
  margin-bottom: 20px;
 background-image:url('images/marvel-clipart-hd-9.png');
 background-repeat: no-repeat;
    background-size: contain;
    background-position:left 30px top;
`;

function GameHeader(props) {

  return <Header className='gameHeader__main'>
    <Container>
      <Row>
        <Col xs='12' md='12'>
          <h1 className='gameHeader__title'>Marvelous: <span className='gameHeader__title-detail'>the Marvel Card Matching Game</span>
          </h1>
        </Col>
      </Row>
    </Container>

  </Header>


}


export default GameHeader