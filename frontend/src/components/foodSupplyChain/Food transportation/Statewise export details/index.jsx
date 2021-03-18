import React, { useState, useEffect } from 'react'
import axios from 'axios'
import _ from 'lodash'
import { Row, Col, Select, Button, message, Collapse, Timeline } from 'antd'
import { Line } from 'react-chartjs-2'
import { addCommas } from '../../../Utilities/utils'

const { Option } = Select
const { Panel } = Collapse

const StatewiseExportDetails = () => {
  const [commodities, setCommodities] = useState([])
  const [selectedCommodity, setSelectedCommodity] = useState([])
  const [states, setStates] = useState([])
  const [selectedState, setSelectedState] = useState(null)
  const [years, setYears] = useState([])
  const [chartData, setChartData] = useState({})

  const getAllData = () => {
    axios.get(`/filters/stateExport`).then(response => {
      setCommodities(response.data.commodityOptions)
      setStates(response.data.stateOptions)
      setYears(_.range(2000, 2020, 1))
    })
  }

  const handleSelectedCommodityChange = value => {
    if (value.length > 3) {
      message.info('Maximum three commodities can be selected')
    } else {
      setSelectedCommodity(value)
    }
  }

  const handleSelectedStateChange = value => {
    setSelectedState(value)
  }

  /* Clears all the data except available commodities */
  const onClearClick = () => {
    setSelectedCommodity([])
    setSelectedState('')
    setChartData({})
  }

  useEffect(() => {
    getAllData()
  }, [])

  useEffect(() => {
    if (selectedState && selectedCommodity && selectedCommodity.length > 0) {

      let request = `analysis/historicalExportData?state=${selectedState}&startYear=2000&endYear=2019`;
      for (let i = 0; i < 3; i++) {
        if(i >= selectedCommodity.length) {
          
        } else {
          switch(i) {
            case 0:
              request = request.concat(`&commodityOne=${selectedCommodity[0]}`);
              break;
            case 1:
              request = request.concat(`&commodityTwo=${selectedCommodity[1]}`);
              break;
            case 2:
              request = request.concat(`&commodityThree=${selectedCommodity[2]}`);
              break;
            default:
                break;
          }
        }
      }
      axios
        .get(request)
        .then(exportResponse => {
          /* 
          Structure for this data: https://www.chartjs.org/docs/latest/charts/doughnut.html
          Reference: https://www.educative.io/edpresso/how-to-use-chartjs-to-create-charts-in-react
          API: localhost:9000/analysis/historicalExportData?commodityOne=Vegetables,%20fresh&state=California&startYear=2000&endYear=2019&commodityTwo=Corn&commodityThree=Rice
        */

          let data = {
            labels: years,  /* Years is fixed from 2000 - 2019 */
            datasets: [{
              label: selectedCommodity[0] || 'First Commodity',
              data: [],
              fill: false,
              backgroundColor: 'rgba(75,192,192,1)',
              borderColor: 'rgba(0,0,0,1)',
            }, {
              label: selectedCommodity[1] || 'Second commodity',
              data: [],
              fill: false,
              backgroundColor: 'rgba(75,192,192,1)',
              borderColor: 'rgba(255,0,0,0.3)',
            }, {
              label: selectedCommodity[2]  || 'Third commodity',
              data: [],
              fill: false,
              backgroundColor: 'rgba(75,192,192,1)',
              borderColor: 'rgba(255,0,0,0.6)',
            }]
          };

          for (let i = 0; i < 3; i++) {
            if(i >= selectedCommodity.length) {
              data.datasets.pop();
            } else {
              switch(i) {
                case 0:
                  for (let j = 0; j < exportResponse.data[i].length; j++) {
                    data.datasets[i].data.push(exportResponse.data[i][j].value)
                  }
                  break;
                case 1:
                  for (let j = 0; j < exportResponse.data[i].length; j++) {
                    data.datasets[i].data.push(exportResponse.data[i][j].value)
                  }
                  break;
                case 2:
                  for (let j = 0; j < exportResponse.data[i].length; j++) {
                    data.datasets[i].data.push(exportResponse.data[i][j].value)
                  }
                  break;
                default:
                    break;
              }
            }
          }
          setChartData(data);
        })
    } else {
      setChartData({});
    }
  }, [selectedCommodity, selectedState])
  return (
    <div className='StatewiseImportDependacyContainer'>
      <Row>
        <Col span={8}>
          <Select
            style={{ width: '75%' }}
            value={selectedCommodity}
            onChange={handleSelectedCommodityChange}
            mode="multiple"
            placeholder="Commodities - Select a maximum of 3"
          >
            {commodities &&
              commodities.map(commodity => (
                <Option value={commodity}>{commodity}</Option>
              ))}
          </Select>
        </Col>
        <Col span={8}>
          <Select
            style={{ width: '75%' }}
            value={selectedState}
            onChange={handleSelectedStateChange}
            placeholder="Select state"
          >
            {commodities &&
              states &&
              states.map(state => <Option value={state}>{state}</Option>)}
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
                <Timeline.Item>Select a maximum of 3 commodities</Timeline.Item>
                <Timeline.Item>Select State</Timeline.Item>
                <Timeline.Item>Multi line chart shows a comparision of the selected commodities year over year</Timeline.Item>
              </Timeline>
            </Panel>
          </Collapse>
        </Col>
      </Row>
      <div style = {{ margin: '2% 5% 2% 5%', border: '1px dashed black', maxHeight: '60vh' }}>
        <Line
          height='100%'
          data={chartData}
          options = {{
            title:{
              display:true,
              text:'Statewise Exports in million $(USD)',
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

export default StatewiseExportDetails