import React, { Component } from 'react'
import { ChartApp, FormTest } from './chart/';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

class App extends Component {
    render() {
        return (
            <Router history={createBrowserHistory()}>
                <Switch>
                    <Route path="/ChartApp">
                        <ChartApp />
                    </Route>
                    <Route path="/FormTest">
                        <FormTest />
                    </Route>
                    <Route path="/">
                        <ChartApp />
                    </Route>
                </Switch>
            </Router>
        )
    }

}

export default App;
