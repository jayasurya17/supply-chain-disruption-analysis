import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';


import Landing from './Common/Landing';
import Dashboard from './Admin/dashboard';
import ErrorPage from './Authentication/errorPage';

//Create a Main Component
class Main extends Component {
    render() {
        return (
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Landing} />
                <Switch>
                    <Route path="/admin/dashboard" component={Dashboard} />

                    <Route component={ErrorPage} />
                </Switch>
            </div>
        )
    }
}
//Export The Main Component
export default Main;