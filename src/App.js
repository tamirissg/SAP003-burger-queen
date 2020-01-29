import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
}
from "react-router-dom";
import './componentes/Card/style.css'
import Service from './pages/service.js'
import kitchen from './pages/kitchen.js'
import Nav from './componentes/nav/index.js'
import './componentes/nav/style.css'



function App() {
  return (
  <Router>
      <Nav/>
      <Switch>
        <Route path="/service" component={Service} />
        <Route path="/kitchen" component={kitchen}/> 
      </Switch>
  </Router>
  );
}

export default App;
