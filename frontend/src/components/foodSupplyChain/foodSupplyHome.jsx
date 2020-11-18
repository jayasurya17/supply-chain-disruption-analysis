import React from 'react';
import { Tabs } from 'antd';

import FoodSupplyDashboard from './foodSupplyDashboard';
import DisasterBasedAnalysis from './disasterBasedAnalysis';
import DisasterPerStateAnalysis from './disasterPerState';

const { TabPane } = Tabs;

const FoodSupplyHome = () => {

    function callback(key) {
        console.log(key);
    }

    return (
        <div>
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
            </Tabs>
        </div>    
    );
};

export default FoodSupplyHome;