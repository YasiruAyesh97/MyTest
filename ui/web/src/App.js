import {Route,Switch,Redirect} from 'react-router-dom';
import React from "react";
import Login from './component/Login';
import Dashboard from './component/dashbord';

function App() {
  return (
      <>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Redirect from="/" exact to="/login"/>
          <Redirect to="/login"/>
        </Switch>
      </>
  );
}

export default App;
