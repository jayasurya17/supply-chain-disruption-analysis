import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col, Select, Button } from 'antd'
import { Doughnut } from 'react-chartjs-2';

const { Option } = Select

const StatewiseImportDependacy = () => {

  const [commodities, setCommodities] = useState([]);
  const [selectedCommodity, setSelectedCommodity] = useState('');
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
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

  const handleSelectedYearChange = (value) => {
    setSelectedYear(value);
  }

  /* Clears all the data except available commodities */
  const onClearClick = () => {
    setSelectedCommodity('');
    setStates([]);
    setSelectedState('');
    setYears([]);
    setSelectedYear('');
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
        setSelectedState('');
        setYears([]);
        setSelectedYear('');
        setChartData({});
      });
    }
  }, [selectedCommodity])

  useEffect(() => {
    if(selectedState) {
      axios.get(
        `/filters/yearByStatesAndImportCommodities?commodity=${selectedCommodity}&state=${selectedState}`
      )
      .then(yearsResponse => {
        setYears(yearsResponse.data);
        setSelectedYear('');

        setChartData({});
      });
    }
  }, [selectedState])

  useEffect(() => {
    if(selectedYear) {
      axios.get(
        `analysis/foodShareByContinent?commodity=${selectedCommodity}&state=${selectedState}&startYear=${selectedYear}&endYear=${selectedYear}&type=import`
      )
      .then(importResponse => {
        /* 
          Structure for this data: https://www.chartjs.org/docs/latest/charts/doughnut.html
          Reference: https://www.educative.io/edpresso/how-to-use-chartjs-to-create-charts-in-react
        */
  
        let data = {
          labels: [],
          datasets: [{
            backgroundColor: [
              '#B21F00',
              '#C9DE00',
              '#2FDE00',
              '#00A6B4',
              '#6800B4',
              '#F9DE00'
            ],
            data: []
          }, 
        ]
        }
        for (let [key, value] of Object.entries(importResponse.data)) {
          data.labels.push(key)
          data.datasets[0].data.push(value)
        }
        setChartData(data);
      });
    }
  }, [selectedYear])

  return (
    <div className='StatewiseImportDependacyContainer'>
      <Row>
        <Col span={8}>
          <Select 
            style = {{ width: '75%' }}
            value = { selectedCommodity }
            onChange = {handleSelectedCommodityChange}
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
        <Col span={8}>
          <Select 
            style = {{ width: '75%' }}
            value = { selectedYear }
            onChange = {handleSelectedYearChange}
          >
            {
              commodities && states && years &&
              years.map((year) => (
                <Option value={year}>
                  {year}
                </Option>
              ))
            }
          </Select>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Button danger onClick={onClearClick}>Clear filters</Button>
        </Col>
      </Row>  
      <div style = {{ margin: '10% 25% 10% 25%' }}>
        <Doughnut 
          data={chartData}
          options = {{
            title:{
              display:true,
              text:'Statewise import dependency in $(USD)',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    </div>
  )
}

export default StatewiseImportDependacy