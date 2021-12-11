import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Create from './pages/Create';
import RenderForm from './pages/RenderForm';

function App() {

  return (
    <BrowserRouter>
      <Switch>
      <Route exact path="/forms/create" component={Create} />
      <Route exact path="/forms/:id" component={RenderForm} />
      </Switch>
      
    </BrowserRouter>
  );
  
}

export default App;
