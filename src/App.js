import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
}
from "react-router-dom";
import './componentes/Card/style.css'
import Kitchen from './pages/kitchen.js'
import Service from './pages/service.js'
import Nav from './componentes/nav/index.js'
// import Home from './pages/home/home.js'



function App() {
  return (
  <Router>
    <div>
      <Nav/>
      <Switch>
        {/* <Route path="/" component={Home}/> */}
        <Route path="/service" component={Service} />
        <Route path="/kitchen" component={Kitchen} />
      </Switch>
    </div>
  </Router>
  );
}

export default App;
