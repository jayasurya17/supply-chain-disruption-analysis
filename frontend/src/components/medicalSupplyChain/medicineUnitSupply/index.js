import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col, Select } from 'antd'
import './MedicineUnitSupply.css'

//mport { addCommas } from '../../../Utilities/utils'
import stateNames from '../../../constants/stateNames'
import yearRange from '../../../constants/years'
import medicineNames from '../../../constants/medicines'

import Fusion from '../medicineUnitSupply/Fusion'

const { Option } = Select

const MedicineUnitSupply = () => {
  const [medicines] = useState(medicineNames)
  const [selectedMedicine, setSelectedMedicine] = useState(medicines[0])
  const [states] = useState(stateNames)
  const [selectedState, setSelectedState] = useState(states[0])
  const [years] = useState(yearRange)
  // eslint-disable-next-line
  const [setSelectedYear] = useState(years[0])

  let chartConfigs = {
    type: 'column2d', // The chart type
    width: '1000', // Width of the chart
    height: '700', // Height of the chart
    dataFormat: 'json', // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        caption: selectedMedicine + '- Units supplied over 10 years ',
        subcaption: selectedState,
        xaxisname: 'Years',
        yaxisname: 'Units Supplied',
        //numberprefix: 'Units',
        theme: 'fusion',
        rotateValues: '0'
      },
      data: [],
      linkeddata: []
    }
  }
  const [chartData, setChartData] = useState()
  const getUnitsSupplied = async () => {
    await axios
      .get(
        `analysis/quarterlyMedicineUtilizationDisruptionByState?commodity=${selectedMedicine}&state=${selectedState}`
      )
      .then(unitsSuppliedResponse => {
        console.log(unitsSuppliedResponse)
        let data = []
        let linkedchart = []
        for (let [key, value] of Object.entries(unitsSuppliedResponse.data)) {
          //console.log(key)
          let summedValue = 0

          let drill = {
            id: key,
            linkedchart: {
              chart: {
                caption: key + '- Quarterly Sales',
                subcaption: selectedMedicine + ' - ' + selectedState,
                theme: 'fusion',
                plottooltext: '  Number of units - $dataValue'
              },
              data: []
            }
          }
          for (let [key1, value1] of Object.entries(value)) {
            //console.log(key1)
            //console.log(value1)
            drill.linkedchart.data.push({ label: key1, value: value1.value })
            summedValue += parseInt(value1.value, 10)
          }
          console.log('Summed value for' + key + ' is ' + summedValue)
          linkedchart.push(drill)
          let eachYear = {
            label: key,
            value: summedValue,
            link: 'newchart-xml-' + key
          }
          data.push(eachYear)
          //console.log('Drilled', linkedchart)
        }
        let chartDataLocal
        if (chartData === '') chartDataLocal = chartData
        else chartDataLocal = chartConfigs
        chartDataLocal.dataSource.data = data
        chartDataLocal.dataSource.linkeddata = linkedchart
        chartDataLocal.dataSource.chart.subcaption = selectedState
        setChartData(chartDataLocal)

        //console.log('Access', chartDataLocal.dataSource.data)
      })
  }

  useEffect(() => {
    getUnitsSupplied()
  }, [])

  useEffect(() => {
    getUnitsSupplied()
  }, [selectedState])
  useEffect(() => {
    getUnitsSupplied()
  }, [selectedMedicine])

  /* We clear all the data in the lower hierarchy when an item in higher hierarchy is changed */
  const handleSelectedStateChange = async value => {
    setSelectedState(value)
  }
//   const handleSelectedYearChange = async value => {
//     setSelectedYear(value)
//   }
  const handleSelectedMedicineChange = async value => {
    setSelectedMedicine(value)
  }

  return (
    <div class='container'>
      <Row span={10} justify='center'>
        <Col span={10}>
          <Select
            style={{ width: '75%' }}
            value={selectedState}
            onChange={handleSelectedStateChange}
          >
            {states.map(state => (
              <Option value={state}>{state}</Option>
            ))}
          </Select>
        </Col>
        <Col span={10}>
          <Select
            style={{ width: '75%' }}
            value={selectedMedicine}
            onChange={handleSelectedMedicineChange}
          >
            {medicines.map(medicine => (
              <Option value={medicine}>{medicine}</Option>
            ))}
          </Select>
        </Col>
      </Row>

      <Row>
        <Fusion chartConfigs={chartData} />
      </Row>
    </div>
  )
}

export default MedicineUnitSupply
