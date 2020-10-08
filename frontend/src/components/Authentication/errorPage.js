import React, { Component } from 'react';

class ErrorPage extends Component {

    render() {

        return (
            <div className="row p-5 m-5">
                <div className="col-md-4 text-center">
                    <img src="/notFound.gif" className="img-thumbnail rounded" alt="404" />
                </div>
                <div className="col-md-8">
                    <p className="display-3 text-justify">The page you are looking for does not exist. Take me back <a href="/" className="text-decoration-none" style={{ color: "#ff6600" }}>home</a></p>
                </div>
            </div>
        )
    }
}
//export ErrorPage Component
export default ErrorPage;