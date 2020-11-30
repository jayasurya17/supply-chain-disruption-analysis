import React, { Component } from 'react'
import axios from 'axios'
import './cropsPerStateMap.css'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'
import CropsPerStateMap from './cropsPerStateMap'
import year from '../../../constants/year'
import DownloadCropsData from './downloadCropsData'

class CropsPerState extends Component {
    constructor() {
        super()
        this.state = {
            year: { min: year.year.startYear, max: year.year.endYear },
            allCategories: [],
            allCommodities: [],
            allUnits: [],
            selectedCategory: null,
            selectedCommodity: null,
            selectedUnit: null,
            showMap: null,
            mapData: {}
        }
    }

    async componentDidMount() {
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

        this.updateGraph(
            commoditiesResponse.data[0],
            unitsResponse.data[0],
            1980,
            2020
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

        this.updateGraph(
            commoditiesResponse.data[0],
            unitsResponse.data[0],
            this.state.year.min,
            this.state.year.max
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

        this.updateGraph(
            value,
            unitsResponse.data[0],
            this.state.year.min,
            this.state.year.max
        )
    }

    onSelectUnit = e => {
        this.setState({
            selectedUnit: e.target.value
        })

        this.updateGraph(
            this.state.selectedCommodity,
            e.target.value,
            this.state.year.min,
            this.state.year.max
        )
    }

    updateGraph = async (commodity, unit, startYear, endYear) => {
        let mapResponse = await axios.get(
            `/analysis/foodProductionByState?commodity=${commodity}&unit=${unit}&startYear=${startYear}&endYear=${endYear}`
        )
        this.setState({
            mapData: mapResponse.data,
            showMap: true
        })
    }

    onChangeYear = async year => {
        this.setState({
            year: year
        })
    }

    confirmYear = e => {
        this.updateGraph(
            this.state.selectedCommodity,
            this.state.selectedUnit,
            e.min,
            e.max
        )
    }

    render() {
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

        return (
            <div>
                <div className='row mt-5 ml-5 mr-5'>
                    <div className='col-md-2'>
                        <p id='year'>Year</p>
                    </div>
                    <div className='col-md-10'>
                        <InputRange
                            maxValue={2020}
                            minValue={1980}
                            value={this.state.year}
                            onChange={this.onChangeYear}
                            onChangeComplete={this.confirmYear}
                        />
                    </div>
                </div>

                <div className='row mt-3 ml-5 mr-5'>
                    <div className='col-md-4'>
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
                    <div className='col-md-4'>
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
                    <div className='col-md-4'>
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
                </div>

                {this.state.showMap === null ? (
                    <div className='text-center m-5'>
                        <img src='loading.gif' alt='loading' className='w-25' />
                    </div>
                ) : (
                        <div className='m-5'>
                            <DownloadCropsData
                                productionCount={this.state.mapData}
                                crop={this.state.selectedCommodity}
                                unit={this.state.selectedUnit}
                                yearRange={this.state.year}
                            />
                            <CropsPerStateMap productionCount={this.state.mapData} />
                        </div>
                    )}
            </div>
        )
    }
}

//export CropsPerState Component
export default CropsPerState
