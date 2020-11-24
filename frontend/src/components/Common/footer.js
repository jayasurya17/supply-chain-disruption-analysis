import React, { Component } from 'react';

class Footer extends Component {

    render() {

        return (
            <div className="row ml-2 mr-2 mt-2 bg-light pt-3">
                <div className="col-md-4 text-center">
                    <p>Aswin Prasad</p>
                    <p>Farha Kauser</p>
                    <p>Jayasurya Pinaki</p>
                    <p>Shubhangi Yadav</p>
                </div>
                <div className="col-md-8">
                    {/* <p className="display-3 text-justify">The page you are looking for does not exist. Take me back <a href="/" className="text-decoration-none" style={{ color: "#ff6600" }}>home</a></p> */}
                </div>
            </div>
        )
    }
}
//export Footer Component
export default Footer;