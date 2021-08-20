import logo from './logo.svg';


import './styles/reset.css'
import './styles/index.css'
import './styles/color.css'
import './App.css';

import { Button } from 'antd';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Login from './components/Login/Login';
import Index from './components/Index/Index';

import routes from './router';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/index">
            <Index></Index>
          </Route>
        </Switch>
      </Router>
      {/* <Router routes={routes}></Router> */}
    </div>
  );
}


export default App;
