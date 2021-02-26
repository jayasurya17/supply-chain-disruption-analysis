import React from 'react'
import { Tabs } from 'antd'

import MedicineUnitsSupplied from './medicineUnitSupply/index'

//import './FoodSupplyHome.css'

const { TabPane } = Tabs

const MedicalSupplyHome = () => {
  function callback (key) {
    // console.log(key);
  }

  return (
    <div className='foodSupplyHomeContainer'>
      <Tabs defaultActiveKey='1' onChange={callback}>
        <TabPane tab='Units supplied' key='1'>
          <MedicineUnitsSupplied />
        </TabPane>
        <TabPane tab='N/A' key='2'>
          Two
        </TabPane>
      </Tabs>
    </div>
  )
}

export default MedicalSupplyHome
