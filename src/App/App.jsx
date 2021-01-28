import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../helpers';
import { alertActions } from '../actions/alert.actions';
import { PrivateRoute } from '../pages/PrivateRoute';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { OpportunitiesPage } from '../pages/OpportunitiesPage';
import { RegisterPage } from '../pages/RegisterPage';
import Navbar from '../components/Navbar/navbar';

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
        console.log("<>,",this.props);
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        
                        <Router history={history} >
                        {(window.location.pathname!=="/login" && window.location.pathname!=="/register") ? <Navbar/>: null }
                            <Switch>

                                <PrivateRoute exact path="/" component={HomePage} />
                                <PrivateRoute exact path="/opportunities" component={OpportunitiesPage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <Redirect from="*" to="/" />
                            </Switch>
                        </Router>
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
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };