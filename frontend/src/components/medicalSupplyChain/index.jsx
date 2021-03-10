import React from 'react'
import { Tabs } from 'antd'

import MedicineUnitsSupplied from './medicineUnitSupply/index'
import MedicineHeatMap from './Medicine Heat Map'
import Articles from './Articles'

//import './FoodSupplyHome.css'

const { TabPane } = Tabs

const MedicalSupplyHome = () => {
  function callback (key) {
    // console.log(key);
  }

  return (
    <div className='medicineSupplyHomeContainer'>
      <Tabs defaultActiveKey='1' onChange={callback}>
        <TabPane tab='Units supplied' key='1'>
          <MedicineUnitsSupplied />
        </TabPane>
        <TabPane tab='Additional' key='2'>
          Find more requirements
        </TabPane>
        <TabPane tab='Heat map' key='3'>
          <MedicineHeatMap />
        </TabPane>
        <TabPane tab='Articles' key='4'>
          <Articles />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default MedicalSupplyHome
