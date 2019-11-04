import React from 'react';

const Button = (props) =>{
  
    var val = props.index === -1 ? 'L' : props.index + 2
    
    return(
        <div className="button" style={{backgroundColor: props.backgroundColor}} onClick={()=>{props.addClickedButton(props.index + 1)}}>{val}</div>  
    )
}

export default Button;