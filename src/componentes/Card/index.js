import React from 'react';

const Card = (props) =>{
    return (
        <div placeholder={props.placeholder} value={props.state} id={props.id}
             onClick={props.handleClick} className="card">
            <p>{props.name} </p>
            <p>{props.price}</p>
            <img src={props.image} className="image"/>
        </div>
    );
} 


export default Card;