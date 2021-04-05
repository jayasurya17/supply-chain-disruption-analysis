import React from 'react'
import { Tabs } from 'antd'

import MedicineUnitsSupplied from './medicineUnitSupply/index'
import MedicineHeatMap from './Medicine Heat Map'
import Articles from './Articles'

import './MedicalSupplyChainHome.css'

const { TabPane } = Tabs

const MedicalSupplyHome = () => {
  function callback (key) {
    // console.log(key);
  }

  return (
    <div className='medicineSupplyHomeContainer'>
      <Tabs defaultActiveKey='1' onChange={callback} centered='true'>
        <TabPane tab='Units supplied' key='1'>
          <MedicineUnitsSupplied />
        </TabPane>
        <TabPane tab='Heat map' key='2'>
          <MedicineHeatMap />
        </TabPane>
        <TabPane tab='Articles' key='3'>
          <Articles />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default MedicalSupplyHome
