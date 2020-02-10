import React from 'react';
import { Link } from "react-router-dom"


function Home() {
    return (
        <div className="home">
            <div className='links'>
                <Link to="/service" className='link-home'>RESTAURANTE</Link>
                <Link to="/kitchen" className='link-home'>COZINHA</Link>
                
            </div>
        </div>
    )
}

export default Home