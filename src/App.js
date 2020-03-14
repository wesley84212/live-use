import React, { Component } from 'react'
import { ChartApp, FormTest } from './chart/';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


class App extends Component {
    render() {
        return (
            <Router>
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
