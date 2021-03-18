import React, { Component } from 'react'
import axios from 'axios'
import './yearlyProduction.css'
import Select from 'react-select'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'
import ChartComponent from './yearlyProductionChart'
import listOfStates from '../../../constants/stateNames'
import year from '../../../constants/year'
import DownloadYearlyProduction from './downloadYearlyProduction'

class FoodSupplyHoliday extends Component {
  async componentDidMount () {
    //populate categories
    let selectedCategories
    await axios.get(`http://localhost:9000/filters/categories`).then(res => {
      const allCategories = res.data
      this.setState({ allCategories })
      selectedCategories = { label: res.data[0], value: res.data[0] }
      this.setState({ selectedCategories })
    })
    axios
      .get('http://localhost:9000/filters/commoditiesByCategory', {
        params: { category: selectedCategories.value }
      })
      .then(res => {
        const selectedCommodities = res.data
        this.setState({ selectedDevices: res.data[0] })
        let chosenCategories = [],
          chosenCategory,
          index
        for (index in selectedCommodities) {
          chosenCategory = selectedCommodities[index]
          chosenCategories.push({
            label: chosenCategory,
            value: chosenCategory
          })
          this.setState({ allCommodities: chosenCategories })
        }
      })
  }

  constructor (props) {
    super(props)
    this.state = {
      allCategories: [],
      allCommodities: [],
      allStates: listOfStates,
      selectedCategories: [],
      chosenCategory: [],
      selectedCommodities: [],
      selectedStates: [],
      units: [],
      selectedUnits: ['', '', ''],
      selected: {},
      yearRange: { min: year.year.startYear, max: year.year.endYear },
      Commodity1: [],
      Commodity2: [],
      Commodity3: []
    }
  }
  onSelectUnit = async opt => {
    let selectedUnits = this.state.selectedUnits
    selectedUnits[opt.index] = opt
    this.setState({ selectedUnits })
    await this.setState({
      selected: Object.assign({}, this.state.selected, {
        [opt.commodity]: opt.value
      })
    })
  }
  onSelectCategory = opt => {
    if (opt) {
      this.setState({
        selectedCategories: opt
      })
      this.setState({ selectedCommodities: [] })
      axios
        .get('http://localhost:9000/filters/commoditiesByCategory', {
          params: { category: opt.value }
        })
        .then(res => {
          const selectedCommodities = res.data
          this.setState({ selectedDevices: res.data[0] })
          let chosenCategories = [],
            chosenCategory,
            index
          for (index in selectedCommodities) {
            chosenCategory = selectedCommodities[index]
            chosenCategories.push({
              label: chosenCategory,
              value: chosenCategory
            })
            this.setState({ allCommodities: chosenCategories })
          }
        })
    }
  }
  onSelectCommodity = async opt => {
    if (!opt) {
      this.setState({ selectedCommodities: [] })
      return
    }
    if (opt.length > 3) {
      return
    }
    await this.setState({
      selectedCommodities: opt
    })
    let index,
      units = []

    for (index in this.state.selectedCommodities) {
      let res = await axios.get(`http://localhost:9000/filters/units`, {
        params: {
          category: this.state.selectedCategories.value,
          commodity: this.state.selectedCommodities[index].value
        }
      })
      // .then(res => {
      let local = []
      for (let each in res.data) {
        local.push({
          label: res.data[each],
          value: res.data[each],
          commodity: this.state.selectedCommodities[index].value,
          index: index
        })
      }
      units[index] = local
      this.setState({
        selected: Object.assign({}, this.state.selected, {
          [this.state.selectedCommodities[index].value]: res.data[0]
        })
      })
      // })
      let temp = this.state.selected
      let queryParams = this.getQueryParams(opt, temp)
      let response = await axios.get(
        `/filters/statesByCommodityAndUnit?${queryParams}`
      )
      this.setState({
        allStates: response.data,
        selectedStates: { label: response.data[0], value: response.data[0] },
        // selectedCommodities: opt,
        units: units,
        selected: temp
      })
    }

    this.setState({ units })
  }
  onSelectState = async opt => {
    await this.setState({
      selectedStates: opt
    })

    this.getInfo()
  }
  getQueryParams = (selectedCommodities, selectedUnit) => {
    // let categoryParams = ["categoryOne", "categoryTwo", "categoryThree"]
    let commodityParams = ['commodityOne', 'commodityTwo', 'commodityThree']
    let unitParams = ['unitOne', 'unitTwo', 'unitThree']
    let commodity, unit
    let query = ''
    for (var index in selectedCommodities) {
      commodity = selectedCommodities[index].value
      unit = selectedUnit[commodity]
      // query = query + categoryParams[index] + "=" + this.state.selectedCategories.value + "&" + commodityParams[index] + "=" + commodity + "&" + unitParams[index] + "=" + unit + "&"
      query =
        query +
        commodityParams[index] +
        '=' +
        commodity +
        '&' +
        unitParams[index] +
        '=' +
        unit +
        '&'
    }
    return query
  }

  onSelect = async opt => {}
  onGenerateGraph = async () => {
    if (
      this.state.selectedCategories.length === 0 ||
      this.state.selectedCommodities.length === 0 ||
      this.state.selectedStates === 0
    ) {
      alert('Select all required values')
    } else {
      let queryParams = this.getQueryParams(
        this.state.selectedCommodities,
        this.state.selected
      )
      queryParams =
        queryParams +
        'state=' +
        this.state.selectedStates.value +
        '&startYear=' +
        this.state.yearRange.min +
        '&endYear=' +
        this.state.yearRange.max
      let response = await axios.get(`/analysis/historicalData?${queryParams}`)
      await this.setState({
        Commodity1: response.data.filterOneData,
        Commodity2: response.data.filterTwoData,
        Commodity3: response.data.filterThreeData
      })
    }
  }
  getInfo = async () => {
    await axios.get('http://localhost:9000/analysis/historicalDataByState', {
      params: {
        category: this.state.selectedCategories.value,
        commodity: this.state.selectedCommodities.value,
        startYear: this.state.yearRange.min,
        endYear: this.state.yearRange.max,
        state: this.state.selectedStates.value
      }
    })
    //   .then(res => {
    //     const selectedCommodities = res.data
    //   })
  }

  render () {
    let allStates = [],
      index,
      stateName,
      category = [],
      categoryName
    //   units = [],
    //   unitName
    for (index in this.state.allStates) {
      stateName = this.state.allStates[index]
      allStates.push({ label: stateName, value: stateName })
    }
    for (index in this.state.allCategories) {
      categoryName = this.state.allCategories[index]
      category.push({ label: categoryName, value: categoryName })
    }
    let statesDropdown = null
    statesDropdown =
      this.state.selectedCommodities.length === 0 ? null : (
        <Select
          onChange={this.onSelectState}
          options={allStates}
          value={this.state.selectedStates}
          placeholder='State'
        />
      )
    let unitsDropdown = null
    unitsDropdown = !this.state.selectedCommodities
      ? null
      : this.state.selectedCommodities.map((Commodity, index) => (
          <div className='col-md-4'>
            <span>Units for {Commodity.value}:</span>
            <Select
              onChange={this.onSelectUnit}
              options={this.state.units[index]}
              value={this.state.selected[Commodity.value]}
              placeholder={this.state.selected[Commodity.value]}
            ></Select>
          </div>
        ))

    return (
      <div>
        <div className='row m-5'>
          <div className='col-md-2'>
            <p id='year'>Year range</p>
          </div>
          <div className='col-md-10'>
            <InputRange
              maxValue={2020}
              minValue={1980}
              value={this.state.yearRange}
              onChange={yearRange => this.setState({ yearRange })}
            />
          </div>
        </div>
        <div className='row m-5'>
          <div className='col-md-4'>
            <Select
              //isMulti
              onChange={this.onSelectCategory}
              options={category}
              value={this.state.selectedCategories}
              placeholder='Category'
            ></Select>
          </div>
          <div className='col-md-4'>
            <Select
              isMulti
              onChange={this.onSelectCommodity}
              options={this.state.allCommodities}
              value={this.state.selectedCommodities}
              placeholder='Commodity'
            />
          </div>
          <div className='col-md-4'>{statesDropdown}</div>
        </div>
        <div className='row m-5'>{unitsDropdown}</div>
        <div align='center'>
          <button
            type='button'
            class='btn btn-warning'
            onClick={this.onGenerateGraph}
          >
            Generate Graph
          </button>
        </div>
        {this.state.Commodity1 && this.state.Commodity1.length === 0 ? (
          <p className='display-4 text-center m-5'>
            Apply filters to show graph
          </p>
        ) : (
          <div className='m-5'>
            <DownloadYearlyProduction
              Commodity1={this.state.Commodity1}
              Commodity2={this.state.Commodity2}
              Commodity3={this.state.Commodity3}
              yearRange={this.state.yearRange}
            />
            <ChartComponent
              Commodity1={this.state.Commodity1}
              Commodity2={this.state.Commodity2}
              Commodity3={this.state.Commodity3}
              yearRange={this.state.yearRange}
            />
          </div>
        )}
      </div>
    )
  }
}

//export FoodSupplyHoliday Component
export default FoodSupplyHoliday
