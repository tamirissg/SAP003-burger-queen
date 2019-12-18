import React  from 'react';

const Button = (props) => {
    return (
        <button onClick = {props.handclick} 
        className = 'button'>{props.text}</button>
    )
}

export default Button;