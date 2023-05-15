import React from 'react'

export default function Die(props) {
    const styles = {
        backgroundColor: props.isChosen ? '#dfc923' : 'white'
    }

  return (
    <div className='dice-box' style={styles} onClick={props.chosen}>
      <h2>{props.value}</h2>
    </div>
  )
}
