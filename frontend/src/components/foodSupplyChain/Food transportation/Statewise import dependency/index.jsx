import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col, Select, Button, Collapse, Timeline } from 'antd'
import { Doughnut } from 'react-chartjs-2'

const { Option } = Select
const { Panel } = Collapse

const StatewiseImportDependacy = () => {
  const [commodities, setCommodities] = useState([])
  const [selectedCommodity, setSelectedCommodity] = useState(null)
  const [states, setStates] = useState([])
  const [selectedState, setSelectedState] = useState(null)
  const [years, setYears] = useState([])
  const [selectedYear, setSelectedYear] = useState(null)
  const [chartData, setChartData] = useState({})

  const getAllCommodities = () => {
    axios.get(`/filters/importCommodities`).then(commoditiesResponse => {
      setCommodities(commoditiesResponse.data)
    })
  }

  const handleSelectedCommodityChange = value => {
    setSelectedCommodity(value)
  }

  const handleSelectedStateChange = value => {
    setSelectedState(value)
  }

  const handleSelectedYearChange = value => {
    setSelectedYear(value)
  }

  /* Clears all the data except available commodities */
  const onClearClick = () => {
    setSelectedCommodity(null)
    setStates([])
    setSelectedState(null)
    setYears([])
    setSelectedYear(null)
    setChartData({})
  }

  useEffect(() => {
    getAllCommodities()
  }, [])

  /* We clear all the data in the lower hierarchy when an item in higher hierarchy is changed */
  useEffect(() => {
    if (selectedCommodity) {
      axios
        .get(
          `/filters/statesByImportCommodities?commodity=${selectedCommodity}`
        )
        .then(statesResponse => {
          setStates(statesResponse.data)
          setSelectedState(null)
          setYears([])
          setSelectedYear(null)
          setChartData({})
        })
    }
  }, [selectedCommodity])

  useEffect(() => {
    if (selectedState) {
      axios
        .get(
          `/filters/yearByStatesAndImportCommodities?commodity=${selectedCommodity}&state=${selectedState}`
        )
        .then(yearsResponse => {
          setYears(yearsResponse.data)
          setSelectedYear(null)

          setChartData({})
        })
    }
  }, [selectedState])

  useEffect(() => {
    if (selectedYear) {
      axios
        .get(
          `analysis/foodShareByContinent?commodity=${selectedCommodity}&state=${selectedState}&startYear=${selectedYear}&endYear=${selectedYear}&type=import`
        )
        .then(importResponse => {
          /* 
          Structure for this data: https://www.chartjs.org/docs/latest/charts/doughnut.html
          Reference: https://www.educative.io/edpresso/how-to-use-chartjs-to-create-charts-in-react
        */

          let data = {
            labels: [],
            datasets: [
              {
                backgroundColor: [
                  '#B21F00',
                  '#C9DE00',
                  '#2FDE00',
                  '#00A6B4',
                  '#6800B4',
                  '#F9DE00'
                ],
                data: []
              }
            ]
          }
          for (let [key, value] of Object.entries(importResponse.data)) {
            data.labels.push(key)
            data.datasets[0].data.push(value)
          }
          setChartData(data)
        })
    }
  }, [selectedYear])

  return (
    <div className='StatewiseImportDependacyContainer'>
      <Row>
        <Col span={8}>
          <Select
            placeholder='Select commodity'
            style={{ width: '75%' }}
            value={selectedCommodity}
            onChange={handleSelectedCommodityChange}
          >
            {commodities &&
              commodities.map(commodity => (
                <Option value={commodity}>{commodity}</Option>
              ))}
          </Select>
        </Col>
        <Col span={8}>
          <Select
            placeholder='Select state'
            style={{ width: '75%' }}
            value={selectedState}
            onChange={handleSelectedStateChange}
          >
            {commodities &&
              states &&
              states.map(state => <Option value={state}>{state}</Option>)}
          </Select>
        </Col>
        <Col span={8}>
          <Select
            placeholder='Select year'
            style={{ width: '75%' }}
            value={selectedYear}
            onChange={handleSelectedYearChange}
          >
            {commodities &&
              states &&
              years &&
              years.map(year => <Option value={year}>{year}</Option>)}
          </Select>
        </Col>
      </Row>
      <Row style={{paddingTop: '5px'}}>
        <Col span={8}>
          <Button danger onClick={onClearClick}>
            Clear filters
          </Button>
        </Col>
        <Col span={8}>
          <Collapse accordion>
            <Panel header="Help" key="1">
              <Timeline>
                <Timeline.Item>Select Commodity</Timeline.Item>
                <Timeline.Item>Select State</Timeline.Item>
                <Timeline.Item>Selected year</Timeline.Item>
                <Timeline.Item>Pie-chart gives import dependency of each state per commodity on a given year</Timeline.Item>
              </Timeline>
            </Panel>
          </Collapse>
        </Col>
      </Row>
      <div style={{ margin: '2% 5% 2% 5%', border: '1px dashed black', maxHeight: '60vh' }}>
        <Doughnut
          data={chartData}
          options={{
            title: {
              display: true,
              text: 'Statewise import dependency in $(USD)',
              fontSize: 20,
            },
            legend: {
              display: true,
              position: 'right'
            },
          }}
        />
      </div>
    </div>
  )
}

export default StatewiseImportDependacy
