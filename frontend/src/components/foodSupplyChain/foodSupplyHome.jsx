import React from 'react';
import { Tabs } from 'antd';
import { useSelector, shallowEqual } from 'react-redux';
import FoodSupplyDashboard from './yearlyProductionChart/yearlyProduction';
import DisasterBasedAnalysis from './disasterPerYearChart/disasterPerYear';
import DisasterPerStateAnalysis from './disasterHeatMap/disasterPerState';
import CropsPerState from './cropsPerStateHeatMap/cropsPerState';
import QuarterlyDifference from './quarterlyDifference/quarterlyDifference';
import ProfileSelectors from '../../../src/store/features/profile/selectors';

import './FoodSupplyHome.css'

const { TabPane } = Tabs;

const FoodSupplyHome = () => {

    function callback(key) {
        // console.log(key);
    }

    const {
        user,
    } = useSelector(
        state => ({
            user: ProfileSelectors.user(state),
        }),
        shallowEqual,
    );
    return (
        <div className="foodSupplyHomeContainer">
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Production in a year with disasters" key="1">
                    <DisasterBasedAnalysis />
                </TabPane>
                <TabPane tab="Quarterly analysis" key="2">
                    <QuarterlyDifference />
                </TabPane>
                <TabPane tab="Yearly food production" key="3">
                    <FoodSupplyDashboard user={user} />
                </TabPane>
                <TabPane tab="Disasters heat map" key="4">
                    <DisasterPerStateAnalysis />
                </TabPane>
                <TabPane tab="Crops produced per state" key="5">
                    <CropsPerState />
                </TabPane>
            </Tabs>
        </div>    
    );
};

export default FoodSupplyHome;