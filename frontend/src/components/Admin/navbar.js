import React, { Component } from 'react';
import './navbar.css'

class Navbar extends Component {

    render() {

        return (
            <div className="row text-center border-bottom pt-4 pb-4 stickyNavBar bg-light">
                <div className="col-md-2 border-left border-right"><a href="" className="text-secondary text-decoration-none"><p>Dashboard</p></a></div>
                <div className="col-md-2 border-left border-right"><a href="" className="text-secondary text-decoration-none"><p>All users</p></a></div>
                <div className="col-md-2 border-left border-right"><a href="" className="text-secondary text-decoration-none"><p>All games</p></a></div>
                <div className="col-md-2 border-left border-right"><a href="" className="text-secondary text-decoration-none"><p>Active games</p></a></div>
                <div className="col-md-2 border-left border-right"><a href="" className="text-secondary text-decoration-none"><p>Lobby games</p></a></div>
                <div className="col-md-2 border-left border-right"><a href="" className="text-secondary text-decoration-none"><p>No parent</p></a></div>
            </div>
        )
    }
}
//export Navbar Component
export default Navbar;