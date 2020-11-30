import React, { Component } from 'react'
import axios from 'axios'
import 'react-input-range/lib/css/index.css'
import QuarterlyDifferenceTable from './quarterlyDifferenceTable'
import QuarterlyDifferenceDownloader from './downloadQuarterlyData'
import year from '../../../constants/year'

class QuarterlyDifference extends Component {
  constructor () {
    super()
    this.state = {
      allCategories: [],
      allCommodities: [],
      allUnits: [],
      allStates: [],
      selectedCategory: null,
      selectedCommodity: null,
      selectedUnit: null,
      selectedState: null,
      showTable: null,
      tableData: {}
    }
  }

  async componentDidMount () {
    let categoriesResponse = await axios.get(`/filters/categories`)
    categoriesResponse.data.sort()
    this.setState({
      allCategories: categoriesResponse.data,
      selectedCategory: categoriesResponse.data[0]
    })

    let commoditiesResponse = await axios.get(
      `/filters/commoditiesByCategory?category=${categoriesResponse.data[0]}`
    )
    this.setState({
      allCommodities: commoditiesResponse.data,
      selectedCommodity: commoditiesResponse.data[0]
    })

    let unitsResponse = await axios.get(
      `/filters/units?category=${categoriesResponse.data[0]}&commodity=${commoditiesResponse.data[0]}`
    )
    this.setState({
      allUnits: unitsResponse.data,
      selectedUnit: unitsResponse.data[0]
    })

    let stateResponse = await axios.get(
      `/filters/statesByCommodityAndUnit?commodityOne=${
        commoditiesResponse.data[0]
      }&unitOne=${unitsResponse.data[0]}&startYear=${year.year.endYear -
        5}&endYear=${year.year.endYear}`
    )
    this.setState({
      allStates: stateResponse.data,
      selectedState: stateResponse.data[0]
    })

    this.updateGraph(
      commoditiesResponse.data[0],
      unitsResponse.data[0],
      stateResponse.data[0]
    )
  }

  onSelectCategory = async e => {
    let value = e.target.value
    this.setState({
      selectedCategory: value
    })

    let commoditiesResponse = await axios.get(
      `/filters/commoditiesByCategory?category=${value}`
    )
    this.setState({
      allCommodities: commoditiesResponse.data,
      selectedCommodity: commoditiesResponse.data[0]
    })

    let unitsResponse = await axios.get(
      `/filters/units?category=${value}&commodity=${commoditiesResponse.data[0]}`
    )
    this.setState({
      allUnits: unitsResponse.data,
      selectedUnit: unitsResponse.data[0]
    })

    let stateResponse = await axios.get(
      `/filters/statesByCommodityAndUnit?commodityOne=${
        commoditiesResponse.data[0]
      }&unitOne=${unitsResponse.data[0]}&startYear=${year.year.endYear -
        5}&endYear=${year.year.endYear}`
    )
    this.setState({
      allStates: stateResponse.data,
      selectedState: stateResponse.data[0]
    })

    this.updateGraph(
      commoditiesResponse.data[0],
      unitsResponse.data[0],
      stateResponse.data[0]
    )
  }

  onSelectCommodity = async e => {
    let value = e.target.value
    this.setState({
      selectedCommodity: value
    })

    let unitsResponse = await axios.get(
      `/filters/units?category=${this.state.selectedCategory}&commodity=${value}`
    )
    this.setState({
      allUnits: unitsResponse.data,
      selectedUnit: unitsResponse.data[0]
    })

    let stateResponse = await axios.get(
      `/filters/statesByCommodityAndUnit?commodityOne=${value}&unitOne=${
        unitsResponse.data[0]
      }&startYear=${year.year.endYear - 5}&endYear=${year.year.endYear}`
    )
    this.setState({
      allStates: stateResponse.data,
      selectedState: stateResponse.data[0]
    })

    this.updateGraph(value, unitsResponse.data[0], stateResponse.data[0])
  }

  onSelectUnit = async e => {
    this.setState({
      selectedUnit: e.target.value
    })
    let value = e.target.value
    let stateResponse = await axios.get(
      `/filters/statesByCommodityAndUnit?commodityOne=${
        this.state.selectedCommodity
      }&unitOne=${e.target.value}&startYear=${year.year.endYear - 5}&endYear=${
        year.year.endYear
      }`
    )
    this.setState({
      allStates: stateResponse.data,
      selectedState: stateResponse.data[0]
    })

    this.updateGraph(this.state.selectedCommodity, value, stateResponse.data[0])
  }

  onSelectState = async e => {
    this.setState({
      selectedState: e.target.value
    })

    this.updateGraph(
      this.state.selectedCommodity,
      this.state.selectedUnit,
      e.target.value
    )
  }

  updateGraph = async (commodity, unit, state) => {
    let tableResponse = await axios.get(
      `/analysis/covidFoodProductionDisruptionByState?commodity=${commodity}&unit=${unit}&state=${state}`
    )
    this.setState({
      tableData: tableResponse.data,
      showTable: true
    })
  }

  render () {
    console.log(year)

    let allCategories = [],
      category
    for (let index in this.state.allCategories) {
      category = this.state.allCategories[index]
      allCategories.push(<option value={category}>{category}</option>)
    }
    let allCommodities = [],
      commodity
    for (let index in this.state.allCommodities) {
      commodity = this.state.allCommodities[index]
      allCommodities.push(<option value={commodity}>{commodity}</option>)
    }

    let allUnits = [],
      unit
    for (let index in this.state.allUnits) {
      unit = this.state.allUnits[index]
      allUnits.push(<option value={unit}>{unit}</option>)
    }

    let allStates = [],
      state
    for (let index in this.state.allStates) {
      state = this.state.allStates[index]
      allStates.push(<option value={state}>{state}</option>)
    }

    return (
      <div className='m-2'>
        <div className='row'>
          <div className='col-md-3'>
            Category
            <select
              onChange={this.onSelectCategory}
              className='form-control'
              name='category'
              value={this.state.selectedCategory}
              placeholder='Category'
            >
              {allCategories}
            </select>
          </div>
          <div className='col-md-3'>
            Commodity
            <select
              onChange={this.onSelectCommodity}
              className='form-control'
              name='commodity'
              value={this.state.selectedCommodity}
              placeholder='Commodity'
            >
              {allCommodities}
            </select>
          </div>
          <div className='col-md-3'>
            Unit
            <select
              onChange={this.onSelectUnit}
              className='form-control'
              name='unit'
              value={this.state.selectedUnit}
              placeholder='Unit'
            >
              {allUnits}
            </select>
          </div>
          <div className='col-md-3'>
            State
            <select
              onChange={this.onSelectState}
              className='form-control'
              name='state'
              value={this.state.selectedState}
              placeholder='State'
            >
              {allStates}
            </select>
          </div>
        </div>

        {this.state.showTable === null ? (
          <p className='display-4 text-center m-5'>Loading data...</p>
        ) : (
          <div className='m-5'>

            <QuarterlyDifferenceDownloader
                data={this.state.tableData}
                state={this.state.selectedState}
                commodity={this.state.selectedCommodity}
                unit={this.state.selectedUnit}
                year={year.year.endYear}
            />
            <QuarterlyDifferenceTable data={this.state.tableData} />
          </div>
        )}
      </div>
    )
  }
}

//export QuarterlyDifference Component
export default QuarterlyDifference
