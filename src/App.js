import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
}
from "react-router-dom";
import './componentes/Card/style.css'
import Service from './pages/service.js'
import Nav from './componentes/nav/index.js'
import './componentes/nav/style.css'



function App() {
  return (
  <Router>
    <div>
      <Nav/>
      <Switch>
        <Route path="/" component={Service} />
       
      </Switch>
    </div>
  </Router>
  );
}

export default App;
