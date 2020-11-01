import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';


import Landing from './common/landing';
import AdminDashboard from './admin/dashboard';
import Dashboard from './dashboard/dashboard';
import ErrorPage from './authentication/errorPage';
import FoodSupplyDashboard from './foodSupplyChain/foodSupplyDashboard';

//Create a Main Component
class Main extends Component {
    render() {
        return (
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Landing} />
                <Switch>
                    <Route path="/dashboard" component={Dashboard} exact={true} />
                    <Route path="/admin/dashboard" component={AdminDashboard} exact={true} />

                    <Route path="/food-supply-chain" component={FoodSupplyDashboard} exact={true} />

                    <Route component={ErrorPage} />
                </Switch>
            </div>
        )
    }
}
//Export The Main Component
export default Main;