    import React from "react";
    import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
    import Users from "./pages/Users";
    import User from "./pages/User";
    import CreateUser from "./pages/CreateUser";
    import { UserProvider} from "./useContext";

    export default function App() {

      return (
          <Router>
              <UserProvider>
                  <Switch>
                      <Route path="/" exact>
                          <Users />
                      </Route>
                      <Route path="/user/:id">
                          <User />
                      </Route>
                      <Route path="/createuser">
                          <CreateUser />
                      </Route>
                  </Switch>
              </ UserProvider>
          </Router>
      );
    }