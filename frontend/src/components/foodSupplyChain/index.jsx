import React from 'react'
import { Tabs } from 'antd'
import FoodProductionHome from './Food production/FoodProductionHome'
import FoodTransportationHome from './Food transportation/index'

import './FoodSupplyHome.css'

const { TabPane } = Tabs

const FoodSupplyHome = () => {
  function callback (key) {
    // console.log(key);
  }

  return (
    <div className='foodSupplyHomeContainer'>
      <Tabs defaultActiveKey='1' onChange={callback} centered='true'>
        <TabPane tab='Food production' key='1'>
          <FoodProductionHome />
        </TabPane>
        <TabPane tab='Food transportation' key='2'>
          <FoodTransportationHome />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default FoodSupplyHome

