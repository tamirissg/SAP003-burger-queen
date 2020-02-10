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
import Home from './componentes/home/home.js'
import './componentes/home/style.css'
import './componentes/nav/style.css'




function App() {
  return (
  <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/service" component={Service} />
        <Route exact path="/kitchen" component={kitchen}/> 
      </Switch>
  </Router>
  );
}

export default App;
