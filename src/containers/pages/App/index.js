import React from "react";
// import logo from "../../../assets/img/logo/logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "../Dashboard";
import Register from "../Register";
import Login from "../Login";
import { Provider } from "react-redux";
import { store } from "../../../config/redux";

function App() {
  return (
    // <div className='App'>
    //   <header className='App-header'>
    //     <img src={logo} className='App-logo' alt='logo' />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className='App-link'
    //       href='https://reactjs.org'
    //       target='_blank'
    //       rel='noopener noreferrer'
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <Provider store={store}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Dahboard</Link>
              </li>
              <li>
                <Link to='/register'>Register</Link>
              </li>
              <li>
                <Link to='/Login'>Login</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

          <Route path='/' exact component={Dashboard} />
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
