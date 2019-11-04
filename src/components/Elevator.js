import React from 'react';

const Elevator = (props) => {
  
    var transition = 'bottom ' + ((props.duration)/1000) + 's' 
    
    var leftDoor = props.open ? "leftDoor open" : 'leftDoor'
    var rightDoor = props.open ? "rightDoor open" : 'rightDoor'
  
    return(
      <div className='elevator' style={{bottom: props.top, transition}} onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave}>
        <div style={{position: 'relative', width: 50, backgroundColor: 'grey'}}>
        <div className={leftDoor}></div>
        <div className={rightDoor}></div>
        </div>
      </div>
    )
}

export default Elevator;