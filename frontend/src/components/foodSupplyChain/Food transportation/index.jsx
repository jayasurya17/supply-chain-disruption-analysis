import React from 'react'
import { Tabs } from 'antd'

const { TabPane } = Tabs

const FoodTransportationHome = () => {

  function callback (key) {
    // console.log(key);
  }

  return (
    <div className='FoodTransportationHomeContainer'>
      <Tabs defaultActiveKey='1' onChange={callback}>
        <TabPane tab='Statewise import dependancy' key='1'>
          
        </TabPane>
        <TabPane tab='Statewise import export comparision' key='2'>
          
        </TabPane>
      </Tabs>
    </div>
  )
}

export default FoodTransportationHome