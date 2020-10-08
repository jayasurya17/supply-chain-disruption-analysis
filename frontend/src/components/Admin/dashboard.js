import React, { Component } from 'react';
import Navbar from './navbar';

class Dashboard extends Component {

    render() {

        return (
            <div className="bg-light">
                <Navbar />
                
                <h1>This is the dashboard</h1>

            </div>
        )
    }
}
//export Dashboard Component
export default Dashboard;