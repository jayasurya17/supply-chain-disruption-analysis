import React, { Component } from 'react'
import axios from 'axios'
// import '../foodSupplyDashboard.css'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'
import DisasterStateComponent from './exportByStateComponent'
import year from '../../../../constants/year'
import DownloadExportData from './downloadExportData'

class ExportBasedAnalysis extends Component {
    constructor() {
        super()
        this.state = {
            allCommodities: [],
            yearRange: { min: year.year.startYear, max: year.year.endYear },
            selectedCommodity: null,
            exportCount: {},
            isFetched: false
        }
    }

    componentDidMount() {
        axios.get(`/filters/stateExport`).then(allCommoditiesResponse => {
            this.setState({
                allCommodities: allCommoditiesResponse.data.commodityOptions,
                selectedCommodity: allCommoditiesResponse.data.commodityOptions[0]
            })
            this.updateGraph(
                allCommoditiesResponse.data.commodityOptions[0],
                this.state.yearRange.min,
                this.state.yearRange.max
            )
        })
    }

    onChangeCommodity = e => {
        this.updateGraph(
            e.target.value,
            this.state.yearRange.min,
            this.state.yearRange.max
        )
        this.setState({
            selectedCommodity: e.target.value
        })
    }

    onChangeYear = e => {
        this.setState({
            yearRange: e
        })
    }

    confirmYear = e => {
        this.updateGraph(this.state.selectedCommodity, e.min, e.max)
    }

    updateGraph = (commodity, startYear, endYear) => {
        axios
            .get(
                `/analysis/foodExportByState?commodity=${commodity}&startYear=${startYear}&endYear=${endYear}`
            )
            .then(commoditiesByStateResponse => {
                this.setState({
                    exportCount: commoditiesByStateResponse.data,
                    isFetched: true
                })
            })
    }

    render() {
        if (this.state.isFetched === false) {
            return (
                <div>
                    <div className='row m-5'>
                        <div className='col-md-3'>
                            <p id='year'>Year range</p>
                        </div>
                        <div className='col-md-9'>
                            <InputRange
                                maxValue={this.state.yearRange.max}
                                minValue={this.state.yearRange.min}
                                value={this.state.yearRange}
                                onChangeComplete={this.confirmYear}
                                onChange={this.onChangeYear}
                            />
                        </div>
                    </div>
                    <div className='text-center'>
                        <img src='loading.gif' alt='loading' className='w-25' />
                    </div>
                </div>
            )
        }
        var allCommodities = []
        for (var commodity of this.state.allCommodities) {
            allCommodities.push(<option value={commodity}>{commodity}</option>)
        }

        return (
            <div>
                <div className='row m-5'>
                    <div className='col-md-3'>
                        <p id='year'>Year range</p>
                    </div>
                    <div className='col-md-9'>
                        <InputRange
                            maxValue={2020}
                            minValue={1980}
                            value={this.state.yearRange}
                            onChange={this.onChangeYear}
                            onChangeComplete={this.confirmYear}
                        />
                    </div>
                </div>

                <div className='row m-5'>
                    <div className='col-md-3'>
                        <p id='year'>Commodity</p>
                    </div>
                    <div className='col-md-3'>
                        <select
                            class='custom-select'
                            onChange={this.onChangeCommodity}
                            value={this.state.selectedCommodity}
                        >
                            {allCommodities}
                        </select>
                    </div>
                    {/* <div className='col-md-3 offset-md-1'>
						<button className="btn btn-success w-100" onClick={this.updateGraph}>Update Graph</button>
					</div> */}
                </div>

                <div className='m-5'>

                    <DownloadExportData
                        exportCount={this.state.exportCount}
                        commodity={this.state.selectedCommodity}
                        yearRange={this.state.yearRange}
                    />
                    <DisasterStateComponent
                        exportCount={this.state.exportCount}
                        yearRange={this.state.yearRange}
                        commodity={this.state.selectedCommodity}
                    />
                </div>

            </div>
        )
    }
}

//export FoodSupplyHoliday Component
export default ExportBasedAnalysis
