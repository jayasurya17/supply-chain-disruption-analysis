import React from 'react'
import { Tabs } from 'antd'

import StatewiseImportDependacy from './Statewise import dependency'
import StatewiseImportExportComparision from './Statewise import export comparision'
import FoodExportHeatMap from './Food Export Heat Map'
import StatewiseExportDetails from './Statewise export details'

const { TabPane } = Tabs

const FoodTransportationHome = () => {

  function callback (key) {
    // console.log(key);
  }

  return (
    <div className='FoodTransportationHomeContainer'>
      <Tabs defaultActiveKey='1' onChange={callback}>
        <TabPane tab='Statewise import dependancy' key='1'>
          <StatewiseImportDependacy />
        </TabPane>
        <TabPane tab='Statewise export details' key='2'>
          <StatewiseExportDetails />
        </TabPane>
        <TabPane tab='Statewise import export comparision' key='3'>
          <StatewiseImportExportComparision />
        </TabPane>
        <TabPane tab='Export by states heat map' key='4'>
          <FoodExportHeatMap />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default FoodTransportationHome