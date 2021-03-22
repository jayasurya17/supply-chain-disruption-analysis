import React from 'react'
import { Tabs } from 'antd'
import FoodSupplyDashboard from '../yearlyProductionChart/yearlyProduction'
import DisasterBasedAnalysis from '../disasterPerYearChart/disasterPerYear'
import DisasterPerStateAnalysis from '../disasterHeatMap/disasterPerState'
import CropsPerState from '../cropsPerStateHeatMap/cropsPerState'
import QuarterlyDifference from '../quarterlyDifference/quarterlyDifference'

import './FoodProductionHome.css'

const { TabPane } = Tabs

const FoodProductionHome = () => {
  function callback (key) {
    // console.log(key);
  }

  return (
    <div className='foodSupplyHomeContainer' style={{margin: '1%'}}>
      <Tabs defaultActiveKey='1' onChange={callback} centered='true'>
        <TabPane tab='Production in a year with disasters' key='1'>
          <DisasterBasedAnalysis />
        </TabPane>
        <TabPane tab='Quarterly analysis' key='2'>
          <QuarterlyDifference />
        </TabPane>
        <TabPane tab='Yearly food production' key='3'>
          <FoodSupplyDashboard />
        </TabPane>
        <TabPane tab='Disasters heat map' key='4'>
          <DisasterPerStateAnalysis />
        </TabPane>
        <TabPane tab='Crops produced per state' key='5'>
          <CropsPerState />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default FoodProductionHome
