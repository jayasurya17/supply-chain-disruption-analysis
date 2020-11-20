import React from 'react';
import { Tabs } from 'antd';

import FoodSupplyDashboard from './foodSupplyDashboard';
import DisasterBasedAnalysis from './disasterBasedAnalysis';
import DisasterPerStateAnalysis from './disasterPerState';
import CropsPerState from './cropsPerState/cropsPerState';
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
                <TabPane tab="Food Supply chain home page" key="1">
                    <FoodSupplyDashboard />
                </TabPane>
                <TabPane tab="Food supply chain disaster" key="2">
                    <DisasterBasedAnalysis />
                </TabPane>
                <TabPane tab="Food supply chain disaster state" key="3">
                    <DisasterPerStateAnalysis />
                </TabPane>
                <TabPane tab="Crops per state" key="4">
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