import React, { Component } from 'react';
import './dashboard.css';

class Dashboard extends Component {

    render() {

        return (
            <div>                
                <div className="row ml-5 mr-5">
                    <a href="food-supply-chain" id="food" className="col-md-6 text-center p-5 shadow rounded text-decoration-none text-dark">
                        <p className="display-4 font-weight-bold text-dark">Food supply chain analysis</p>
                    </a>
                    <a href="" id="medicine" className="col-md-6 text-center p-5 shadow rounded text-decoration-none text-dark">
                        <p className="display-4 font-weight-bold text-white">Medical supply chain analysis</p>
                    </a>
                </div>

                <div className="m-5" id="description">
                    Description of what we are doing
                    <p>Based on data obtained from <a href="https://quickstats.nass.usda.gov/" target="blank" className="text-decoration-none">UDSA</a> and <a href="https://public.emdat.be/" target="blank" className="text-decoration-none">EM-DAT</a>, we are showing graphs and charts from the year 1980 until 2020.</p>
                </div>

            </div>
        )
    }
}
//export Dashboard Component
export default Dashboard;