import React from 'react'
import { useDispatch } from 'react-redux'
import { Tooltip } from 'antd'

import './dashboard.css'
import ProfileOperations from '../../store/features/profile/operations'

const Dashboard = () => {
  // Dispatch Operations
  const dispatch = useDispatch()
  const setRoute = ProfileOperations.dispatchSetRoute(dispatch)

  const onClick = () => {
    setRoute('/food-supply-chain')
  }
  const onClickMedical = () => {
    setRoute('/medical-supply-chain')
  }

  return (
    <div className='HomeContainer'>
      <div className='row ml-5 mr-5'>
        <Tooltip title='This option shows various anaysis regarding the food supply chain.'>
          <div
            onClick={onClick}
            href='food-supply-chain'
            id='food-supply-chain'
            className='col-md-6 text-center p-5 shadow rounded text-decoration-none text-dark'
          >
            <p className='display-4 font-weight-bold text-dark'>
              Food supply chain analysis
            </p>
          </div>
        </Tooltip>

        <Tooltip title='This option shows various anaysis regarding the medicine supply chain.'>
          <div
            onClick={onClickMedical}
            href='medical-supply-chain'
            id='medicine'
            className='col-md-6 text-center p-5 shadow rounded text-decoration-none text-dark'
          >
            <p className='display-4 font-weight-bold text-white'>
              Medical supply chain analysis
            </p>
          </div>
        </Tooltip>
      </div>

      <div className='m-5' id='description'>
        {/* Description of what we are doing */}
        <p>
          Based on data obtained from{' '}
          <a
            href='https://quickstats.nass.usda.gov/'
            target='blank'
            className='text-decoration-none'
          >
            UDSA
          </a>{' '}
          and{' '}
          <a
            href='https://public.emdat.be/'
            target='blank'
            className='text-decoration-none'
          >
            EM-DAT
          </a>
          , we are showing graphs and charts from the year 1980 until 2020.
          These dashboards visually represent the correlation between different
          disasters and supply chain data for food and medicine. Line charts,
          heat maps, table charts, etc. are designed to show changes during
          different years and for different commodities measured in multiple
          units for different states of the USA.
        </p>
      </div>
    </div>
  )
}
//export Dashboard Component
export default Dashboard
