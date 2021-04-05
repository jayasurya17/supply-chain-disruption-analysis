import React, { useState, useEffect } from 'react'
import axios from 'axios'
import _ from 'lodash'
import { Row, Col, Select, Button, notification, Timeline, Collapse } from 'antd'
import BubbleChart from '@weknow/react-bubble-chart-d3';

const { Option } = Select
const { Panel } = Collapse

const StatewiseExportBubbleChart = () => {
  const [states, setStates] = useState([])
  const [selectedState, setSelectedState] = useState(null)
  const [chartData, setChartData] = useState({})

  const bubbleClick = (lbl) =>{
    notification.open({
      message: lbl,
      description: chartData.find( ({ label }) => label === lbl ).value,
    });
  }

  const legendClick = (label) =>{
    console.log("Customer legend click func");
  }

  const getAllData = () => {
    axios.get(`/filters/stateExport`).then(response => {
      setStates(response.data.stateOptions)
    })
  }

  const handleSelectedStateChange = value => {
    setSelectedState(value)
  }

  /* Clears all the data except available commodities */
  const onClearClick = () => {
    setSelectedState(null)
    setChartData({})
  }

  useEffect(() => {
    getAllData()
  }, [])

  useEffect(() => {
    if (selectedState) {

      let request = `/analysis/foodExportByCommodity?startYear=2001&endYear=2020&state=${selectedState}`;
      
      axios
        .get(request)
        .then(exportResponse => {
          /* 
          Structure for this data: https://www.chartjs.org/docs/latest/charts/doughnut.html
          Reference: https://www.educative.io/edpresso/how-to-use-chartjs-to-create-charts-in-react
          API: http://localhost:9000/analysis/foodExportByCommodity?startYear=2001&endYear=2020&state=California
        */

          let data = exportResponse.data;
          
          setChartData(data);
        })
    } else {
      setChartData({});
    }
  }, [selectedState])
  return (
    <div className='StatewiseImportDependacyContainer'>
      <Row>
        <Col span={8}>
          <Select
            style={{ width: '75%' }}
            value={selectedState}
            onChange={handleSelectedStateChange}
            placeholder="Select state"
          >
            { states &&
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
                <Timeline.Item>Select State</Timeline.Item>
                <Timeline.Item>Clustered bubble chart gives a visual representation of comparision of different type of commodities exported by the state from the year 2000 - 2020. </Timeline.Item>
              </Timeline>
            </Panel>
          </Collapse>
        </Col>
      </Row>
      <Row>
        <Col span={8}></Col>
        <Col span={8}>
          <h5>Bubble chart of state exports from 2000 - 2020.</h5>
        </Col>
      </Row>
      <div style = {{ margin: '1% 5% 1% 5%', border: '1px dashed black', maxHeight: '90vh' }}>
        <BubbleChart
          graph= {{
            zoom: 0.6,
            offsetX: 0.05,
            offsetY: 0.05,
          }}
          width={1300}
          height={800}
          padding={0} // optional value, number that set the padding between bubbles
          showLegend={true} // optional value, pass false to disable the legend.
          legendPercentage={20} // number that represent the % of with that legend going to use.
          legendFont={{
                family: 'Arial',
                size: 12,
                color: '#000',
                weight: 'bold',
              }}
          valueFont={{
                family: 'Arial',
                size: 12,
                color: '#fff',
                weight: 'bold',
              }}
          labelFont={{
                family: 'Arial',
                size: 16,
                color: '#fff',
                weight: 'bold',
              }}
          //Custom bubble/legend click functions such as searching using the label, redirecting to other page
          bubbleClickFun={bubbleClick}
          legendClickFun={legendClick}
          data={chartData}
        />
      </div>
    </div>
  )
}

export default StatewiseExportBubbleChart