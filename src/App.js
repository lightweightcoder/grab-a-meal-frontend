import './App.css';
import NavbarComponent from './components/NavBar.jsx'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router >
        <NavbarComponent/>
        <Switch>
          <Route path='/' component={''} />
          <Route path='/login' component={''}/>
          <Route path='/home' component={''}/>
          <Route path='/profile' component={''}/>
          <Route path='/messages' component={''}/>
          <Route path='/logout' component={''}/>
        </Switch>
        <div className="container">
          <p> hello world</p>
        </div>
      </Router>
      
    </>
  );
}

export default App;
