import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col, Select, Button, Timeline, Collapse } from 'antd'
import { Line } from 'react-chartjs-2';

import { addCommas } from '../../../Utilities/utils'

const { Option } = Select
const { Panel } = Collapse

const StatewiseImportExportComparision = () => {

  const [commodities, setCommodities] = useState([]);
  const [selectedCommodity, setSelectedCommodity] = useState(null);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [chartData, setChartData] = useState({});

  const getAllCommodities = () => {
    axios.get(
      `/filters/importCommodities`
    )
    .then(commoditiesResponse => {
      setCommodities(commoditiesResponse.data);
    });
  }

  const handleSelectedCommodityChange = (value) => {
    setSelectedCommodity(value);
  }

  const handleSelectedStateChange = (value) => {
    setSelectedState(value);
  }

  /* Clears all the data except available commodities */
  const onClearClick = () => {
    setSelectedCommodity(null);
    setStates([]);
    setSelectedState(null);
    setChartData({});
  }

  useEffect(() => {
    getAllCommodities();
  }, []);

  /* We clear all the data in the lower hierarchy when an item in higher hierarchy is changed */
  useEffect(() => {
    if(selectedCommodity) {
      axios.get(
        `/filters/statesByImportCommodities?commodity=${selectedCommodity}`
      )
      .then(statesResponse => {
        setStates(statesResponse.data);
        setSelectedState(null);
        setChartData({});
      });
    }
  }, [selectedCommodity])

  useEffect(() => {
    if(selectedState) {
      axios.get(
        `analysis/foodShareByYear?commodity=${selectedCommodity}&state=${selectedState}`
      )
      .then(importExportResponse => {
        /* 
          Structure for this data: https://www.chartjs.org/docs/latest/charts/line.html
          Reference: https://www.educative.io/edpresso/how-to-use-chartjs-to-create-charts-in-react
          dataset array contains two object, one for import and one for export. Label is common.
        */
        let data = {
          labels: [],
          datasets: [{
            label: 'Import',
            data: [],
            fill: false,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
          }, {
            label: 'Export',
            data: [],
            fill: false,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(255,0,0,0.3)',
          }]
        };
        for (let [key, value] of Object.entries(importExportResponse.data.import)) {
          data.labels.push(key)
          data.datasets[0].data.push(value)
        }
        for (let [key, value] of Object.entries(importExportResponse.data.export)) {
          data.datasets[1].data.push(value)
        }
        setChartData(data);
      });
    }
  }, [selectedState])

  return (
    <div className='StatewiseImportDependacyContainer'>
      <Row>
        <Col span={8}>
          <Select 
            style = {{ width: '75%' }}
            value = { selectedCommodity }
            onChange = {handleSelectedCommodityChange}
            placeholder='Select commodity'
          >
            {
              commodities && commodities.map((commodity) => (
                <Option value={commodity}>
                  {commodity}
                </Option>
              ))
            }
          </Select>
        </Col>
        <Col span={8}>
          <Select 
            style = {{ width: '75%' }}
            value = { selectedState }
            onChange = {handleSelectedStateChange}
            placeholder='Select state'
          >
            {
              commodities && states && 
              states.map((state) => (
                <Option value={state}>
                  {state}
                </Option>
              ))
            }
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
                <Timeline.Item>Multi-line chart gives a compartitaive view of import/export of a selected commodity by a state over years</Timeline.Item>
              </Timeline>
            </Panel>
          </Collapse>
        </Col>
      </Row>
      <div style = {{ margin: '2% 5% 2% 5%', border: '1px dashed black', maxHeight: '60vh' }}>
        <Line 
          data={chartData}
          height='100%'
          options = {{
            title:{
              display:true,
              text:'Statewise import export in $(USD)',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            },
            scales: {
              yAxes: [{
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        return '$' + addCommas(value);
                    }
                }
              }]
            }
          }}
        />
      </div>
    </div>
  )
}

export default StatewiseImportExportComparision