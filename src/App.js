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



function App() {
  return (
  <Router>
    <div>
      <Switch>
        <Route path="/service" component={Service} />
        <Route path="/kitchen" component={Kitchen} />
      </Switch>
    </div>
  </Router>
  );
}

export default App;
