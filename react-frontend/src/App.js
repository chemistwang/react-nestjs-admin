import logo from './logo.svg';


import './styles/reset.css'
import './styles/index.css'
import './styles/color.css'
import './App.css';

import { Button } from 'antd';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Login from './components/Login/Login';
import Index from './components/Index/Index';


function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button type="primary" size="large">Enter App</Button>
      </header> */}
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
    </div>
    
  );
}


export default App;
