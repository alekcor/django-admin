import {Component} from 'react';
import {User} from "./pages/user/user";
import HomePage from "./pages/homepage/homepage";
import SaturnLayout from "./layouts/layout";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <SaturnLayout>
            <Switch>
              <Route exact path={"/"}>
                <HomePage/>
              </Route>
              <Route exact path={"/auth/user"}>
                <User/>
              </Route>
            </Switch>
          </SaturnLayout>
        </Router>
      </div>
    );
  }
}

export default App;
