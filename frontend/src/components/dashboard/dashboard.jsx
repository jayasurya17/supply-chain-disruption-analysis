import React from 'react';
import { useDispatch } from 'react-redux';
import { Tooltip } from 'antd';

import './dashboard.css';
import ProfileOperations from '../../store/features/profile/operations';

const Dashboard = () => {

    // Dispatch Operations
    const dispatch = useDispatch();
    const setRoute = ProfileOperations.dispatchSetRoute(dispatch);

    const onClick = () => {
        setRoute('/food-supply-chain');
    };

    return (
        <div className="containers">                
            <div className="row ml-5 mr-5">
                <Tooltip title="This Option shows various anaysis regarding the food supply chain.">
                    <div onClick={onClick} href="food-supply-chain" id="food-supply-chain" className="col-md-6 text-center p-5 shadow rounded text-decoration-none text-dark">
                        <p className="display-4 font-weight-bold text-dark">Food supply chain analysis</p>
                    </div>
                </Tooltip>  

                <Tooltip title="This Option shows various anaysis regarding the medicine supply chain.">
                    <div href="" id="medicine" className="col-md-6 text-center p-5 shadow rounded text-decoration-none text-dark">
                        <p className="display-4 font-weight-bold text-white">Medical supply chain analysis</p>
                    </div>
                </Tooltip>
            </div>

            <div className="m-5" id="description">
                Description of what we are doing
                <p>Based on data obtained from <a href="https://quickstats.nass.usda.gov/" target="blank" className="text-decoration-none">UDSA</a> and <a href="https://public.emdat.be/" target="blank" className="text-decoration-none">EM-DAT</a>, we are showing graphs and charts from the year 1980 until 2020.</p>
            </div>

        </div>
    );
}
//export Dashboard Component
export default Dashboard;