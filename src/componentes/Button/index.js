import React  from 'react';

const Button = (props) => {
    return (
        <button onClick = {props.handclick} 
        className = 'button'>{props.title}</button>
    )
}

export default Button;