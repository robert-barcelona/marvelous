import React from 'react'
import propTypes from 'prop-types'
import './Timer.css'

function Timer(props) {

 Timer.propTypes = {
    seconds: propTypes.number,
  }

  function secondsToTime(seconds) {
    let min = Math.floor(seconds/60)
    min = min < 10 ? '0' + min : min
    let secs = seconds - min * 60
    secs = secs < 10 ? '0' + secs : secs
    return `${min}:${secs}`
  }

  return <div className='timer__main'>
    <h2 className='timer__clock'>{secondsToTime(props.seconds)}</h2>
  </div>

}

export default Timer