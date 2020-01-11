import React from 'react';

import {
    Link
  } from "react-router-dom";
  

  
        function HomeOptions() {
            return (
              <div className="teste">
                <div className="teste2">
                Bem vindas! ao BURGUER QUEEN 
                </div>
                <div className="teste3">
                  <span className='link'>
                    <Link to="/service">Restaurante</Link>
                  </span>
                  <span className='link'>
                    <Link to="/kitchen">Cozinha</Link>
                  </span>
                  
                </div>
              </div>
            )
          }
          
          

  
  
  export default HomeOptions;