import React, {Component} from 'react'
import './Scoreboard.css'
import Timer from "../Timer/Timer"
import propTypes from 'prop-types'


class Scoreboard extends Component {

  static propTypes = {
    seconds: propTypes.number,
    matched:propTypes.string,
  }

  render() {
    const {props: {intro,seconds,matched}} = this

    return <div className='scoreboard__main'>
      Your time:<Timer seconds={seconds}/>
     { matched.length > 0 && <h2>{`You matched ${matched}`}</h2>}
    </div>
  }

}

export default Scoreboard