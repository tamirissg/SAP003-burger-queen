import React from 'react';
import Logo from './logotipo.png'
import {Link} from "react-router-dom"



const Nav = () => (
     <div>
    <header className = "header-logo">
      <img  src={Logo} alt="Logo Burger Queen" />
      <nav className ="nav">
        <ul>
          <li>
            <Link to ="/service">Salão</Link>
          </li>
          <li>
            <Link to ="/kitchen">Cozinha</Link>
          </li>
        </ul>
      </nav>
    </header>
    </div>
  );
  
  export default Nav; 