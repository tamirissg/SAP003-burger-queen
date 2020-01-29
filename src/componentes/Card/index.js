import React from 'react';

const Card = (props) =>{
    return (
        <section placeholder={props.placeholder} 
             value={props.state} 
             id={props.id}
             onClick={props.handleClick} 
             className="card">
            <p>{props.name} </p>
            <p>{props.price}</p>
            <img src={props.image} className="image"/>
        </section>
    );
} 


export default Card;