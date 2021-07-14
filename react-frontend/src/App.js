import logo from './logo.svg';


import './styles/reset.css'
import './styles/index.css'
import './App.css';

import { Button } from 'antd';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import routes from './router';

import Login from './components/Login/Login';
import Station from './components/Station/Station';
import Police from './components/Police/Police';
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
      </header> */}

      <Router>
          {/* <Link to="/login"><Button type="primary" size="large">Enter Login</Button></Link>
          <Link to="/station"><Button type="primary" size="large">Enter Station</Button></Link>  
          <Link to="/police"><Button type="primary" size="large">Enter Police</Button></Link>   */}

          <Switch>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/index">
              <Index></Index>
            </Route>
            {/* <Route path="/station">
              <Station></Station>
            </Route>
            <Route path="/police">
              <Police></Police>
            </Route> */}
          </Switch>
        </Router>


    </div>
    
  );
}


export default App;
