import React, { Component } from 'react'
import axios from 'axios'
import Select from 'react-select'
import 'react-input-range/lib/css/index.css'
import DisasterChartComponent from './disasterPerYearChart'
import DownloadDisasterChart from './downloadDisasterPerYear'
import year from '../../../constants/year'

class DisasterBasedAnalysis extends Component {
  constructor (props) {
    super(props)
    this.state = {
      allCategories: [],
      allCommodities: [],
      allStates: [],
      selectedCategories: [],
      selectedCommodities: [],
      selectedStates: {},
      units: [],
      selectedUnit: {},
      year: year.year.endYear,
      production: null,
      disasters: null
    }
  }

  componentDidMount () {
    axios.get(`/filters/categories`).then(categoriesResponse => {
      categoriesResponse.data.sort()
      this.setState({
        allCategories: categoriesResponse.data,
        selectedCategories: {
          label: categoriesResponse.data[0],
          value: categoriesResponse.data[0]
        }
      })
      axios
        .get(
          `/filters/commoditiesByCategory?category=${categoriesResponse.data[0]}`
        )
        .then(commoditiesResponse => {
          this.setState({
            allCommodities: commoditiesResponse.data
          })
        })
    })
  }

  onSelectCategory = opt => {
    this.setState({
      selectedCategories: opt
    })
    axios
      .get(`/filters/commoditiesByCategory?category=${opt.value}`)
      .then(commoditiesResponse => {
        this.setState({
          allCommodities: commoditiesResponse.data,
          selectedCommodities: [],
          allStates: [],
          selectedStates: {},
          units: []
        })
      })
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

  onSelectCommodity = async opt => {
    if (!opt) {
      this.setState({
        allStates: [],
        selectedStates: {},
        selectedCommodities: [],
        units: []
      })
      return
    }
    if (opt.length > 3) {
      return
    }
    let units = []
    let temp = this.state.selectedUnit
    for (let index in opt) {
      let commodity = opt[index]
      let response = await axios.get(
        `/filters/units?category=${this.state.selectedCategories.value}&commodity=${commodity.value}`
      )
      units.push(response.data)
      if (!(commodity.value in temp)) {
        temp[commodity.value] = response.data[0]
      }
    }
    let queryParams = this.getQueryParams(opt, temp)
    queryParams =
      queryParams +
      '&startYear=' +
      this.state.year +
      '&endYear=' +
      this.state.year
    let response = await axios.get(
      `/filters/statesByCommodityAndUnit?${queryParams}`
    )
    this.setState({
      allStates: response.data,
      selectedStates: { label: response.data[0], value: response.data[0] },
      selectedCommodities: opt,
      units: units,
      selectedUnit: temp
    })
  }

  onSelectState = opt => {
    this.setState({
      selectedStates: opt
    })
  }

  onSelectUnit = e => {
    this.setState({
      selectedUnit: Object.assign({}, this.state.selectedUnit, {
        [e.target.name]: e.target.value
      })
    })
  }

  updateGraph = async () => {
    if (this.state.selectedStates.value === undefined) {
      return
    }
    let queryParams = this.getQueryParams(
      this.state.selectedCommodities,
      this.state.selectedUnit
    )
    queryParams =
      queryParams +
      'state=' +
      this.state.selectedStates.value +
      '&year=' +
      this.state.year
    let response = await axios.get(
      `/analysis/yearlyDisasterData?${queryParams}`
    )
    this.setState({
      production: response.data.production,
      disasters: response.data.disasters
    })
  }

  onChangeYear = async e => {
    this.setState({
      year: e.target.value
    })
    let queryParams = this.getQueryParams(
      this.state.selectedCommodities,
      this.state.selectedUnit
    )
    queryParams =
      queryParams +
      '&startYear=' +
      e.target.value +
      '&endYear=' +
      e.target.value
    let response = await axios.get(
      `/filters/statesByCommodityAndUnit?${queryParams}`
    )
    this.setState({
      allStates: response.data,
      selectedStates: { label: response.data[0], value: response.data[0] }
    })
  }

  render () {
    let allStates = [],
      stateName
    for (let index in this.state.allStates) {
      stateName = this.state.allStates[index]
      allStates.push({ label: stateName, value: stateName })
    }
    let allCategories = [],
      category
    for (let index in this.state.allCategories) {
      category = this.state.allCategories[index]
      allCategories.push({ label: category, value: category })
    }
    let allCommodities = [],
      commodity
    for (let index in this.state.allCommodities) {
      commodity = this.state.allCommodities[index]
      allCommodities.push({ label: commodity, value: commodity })
    }
    let allYears = [],
      year
    for (year = 1980; year <= 2020; year++) {
      allYears.push(<option value={year}>{year}</option>)
    }

    let allUnits = []
    for (let index in this.state.units) {
      let currentUnits = []
      for (var unit of this.state.units[index]) {
        currentUnits.push(<option value={unit}>{unit}</option>)
      }
      commodity = this.state.selectedCommodities[index].value

      allUnits.push(
        <div className='col-md-3'>
          Unit for {commodity}
          <select
            onChange={this.onSelectUnit}
            class='form-control'
            name={commodity}
            options={currentUnits}
            value={this.state.selectedUnit[commodity]}
            placeholder='State'
          >
            {currentUnits}
          </select>
        </div>
      )
    }

    if (allUnits.length > 0) {
      allUnits.push(
        <div className='col-md-3'>
          <span className='text-white'>.</span>
          <button
            className='btn btn-success w-100 updateGraphButton'
            onClick={this.updateGraph}
          >
            Generate graph
          </button>
        </div>
      )
    }

    return (
      <div>
        <div className='row mt-3 ml-5 mr-5'>
          <div className='col-md-3'>
            Year
            <select
              className='form-control'
              onChange={this.onChangeYear}
              value={this.state.year}
              placeholder='Year'
            >
              {allYears}
            </select>
          </div>
          <div className='col-md-3'>
            Category
            <Select
              onChange={this.onSelectCategory}
              options={allCategories}
              value={this.state.selectedCategories}
              placeholder='Category'
            />
          </div>
          <div className='col-md-3'>
            Commodity (Limit: 3)
            <Select
              isMulti
              onChange={this.onSelectCommodity}
              options={allCommodities}
              value={this.state.selectedCommodities}
              placeholder='Commodity'
            />
          </div>
          <div className='col-md-3'>
            State
            <Select
              onChange={this.onSelectState}
              options={allStates}
              value={this.state.selectedStates}
              placeholder='State'
            />
          </div>
        </div>

        <div className='row mt-3 ml-5 mr-5'>{allUnits}</div>
        {this.state.production === null ? (
          <p className='display-4 text-center m-5'>
            Apply filters to show graph
          </p>
        ) : (
          <div className='m-5'>
            <DownloadDisasterChart
              year={this.state.year}
              production={this.state.production}
              unit={this.state.selectedUnit}
              commodities={this.state.selectedCommodities}
              disasters={this.state.disasters}
              state={this.state.selectedStates.value}
            />
            <DisasterChartComponent
              production={this.state.production}
              disasters={this.state.disasters}
            />
          </div>
        )}
      </div>
    )
  }
}

//export FoodSupplyHoliday Component
export default DisasterBasedAnalysis
