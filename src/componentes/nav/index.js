import React from 'react';
import { Link } from "react-router-dom"
import '../nav/style.css'
import Logo from './logotipo.png'

function Nav () {
    return(
        <div class="nav">
            <div class="logo">
                <img src={Logo} alt="logo"  />
            </div>
            <nav>
            <ul>
                <li>
                    <Link className="link" to="/service">Restaurante</Link>
                </li>
                <li>
                    <Link className="link" to="/kitchen">Cozinha</Link>
                </li>
                <li>
                    <Link className="link" to="/">Home</Link>
                </li>
            </ul>
            </nav>
        </div>
    )
}

export default Nav