import React from 'react'
import { Tabs } from 'antd'

import StatewiseImportDependacy from './Statewise import dependency'
import StatewiseImportExportComparision from './Statewise import export comparision'
import FoodExportHeatMap from './Food Export Heat Map'
import StatewiseExportDetails from './Statewise export details'
import StatewiseExportBubbleChart from './Bubble chart of state exports'

const { TabPane } = Tabs

const FoodTransportationHome = () => {

  function callback (key) {
    // console.log(key);
  }

  return (
    <div className='FoodTransportationHomeContainer'>
      <Tabs defaultActiveKey='1' onChange={callback}>
        <TabPane tab='Statewise import dependency' key='1'>
          <StatewiseImportDependacy />
        </TabPane>
        <TabPane tab='Statewise exports (To other states)' key='2'>
          <StatewiseExportDetails />
        </TabPane>
        <TabPane tab='Statewise exports (Bubble chart)' key='3'>
          <StatewiseExportBubbleChart />
        </TabPane>
        <TabPane tab='Statewise import export comparision' key='4'>
          <StatewiseImportExportComparision />
        </TabPane>
        <TabPane tab='Export by states heat map' key='5'>
          <FoodExportHeatMap />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default FoodTransportationHome