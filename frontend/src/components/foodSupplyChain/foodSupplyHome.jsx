import React from 'react';
import { Tabs } from 'antd';

import FoodSupplyDashboard from './yearlyProductionChart/yearlyProduction';
import DisasterBasedAnalysis from './disasterPerYearChart/disasterPerYear';
import DisasterPerStateAnalysis from './disasterHeatMap/disasterPerState';
import CropsPerState from './cropsPerStateHeatMap/cropsPerState';
import QuarterlyDifference from './quarterlyDifference/quarterlyDifference';
import './FoodSupplyHome.css'

const { TabPane } = Tabs;

const FoodSupplyHome = () => {

    function callback(key) {
        console.log(key);
    }

    return (
        <div className="foodSupplyHomeContainer">
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Yearly food production" key="1">
                    <FoodSupplyDashboard />
                </TabPane>
                <TabPane tab="Production in a year with disasters" key="2">
                    <DisasterBasedAnalysis />
                </TabPane>
                <TabPane tab="Disasters heat map" key="3">
                    <DisasterPerStateAnalysis />
                </TabPane>
                <TabPane tab="Crops produced per state" key="4">
                    <CropsPerState />
                </TabPane>
                <TabPane tab="Quarterly analysis" key="5">
                    <QuarterlyDifference />
                </TabPane>
            </Tabs>
        </div>    
    );
};

export default FoodSupplyHome;