import React from "react";
import { BrowserRouter,Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { history } from "../helpers";
import { alertActions } from "../actions/alert.actions";
import { PrivateRoute } from "../pages/PrivateRoute";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { OpportunitiesPage } from "../pages/OpportunitiesPage";
import { RegisterPage } from "../pages/RegisterPage";
import Navbar from "../components/Navbar/navbar";
import './App.css'
class App extends React.Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      // clear alert on location change
      this.props.clearAlerts();
    });
  }

  render() {
    const { alert } = this.props;
    console.log("<>,", this.props);
    return (
      <div className="jumbotron" history={history}>
        {window.location.pathname !== "/" &&
        window.location.pathname !== "/register" ? (
          <Navbar />
        ) : null}
        <div className="container">
          <div className="col-sm-8 col-sm-offset-2">
            {alert.message && (
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            )}

            <BrowserRouter history={history}>
              <Switch>
                <PrivateRoute exact path="/home" component={HomePage} />
                <PrivateRoute
                  exact
                  path="/opportunities"
                  component={OpportunitiesPage}
                />

                <Route exact path="/register" component={RegisterPage} />
                <Route exact path="/" component={LoginPage} />
                <Redirect from="*" to="/" />
              </Switch>
            </BrowserRouter>
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear,
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };
