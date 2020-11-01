import React, { Component } from 'react';
import Navbar from '../common/navbar';
import './foodSupplyDashboard.css';
import Select from 'react-select';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import ChartComponent from './chartComponent';

class FoodSupplyHoliday extends Component {

    constructor() {
        super()
        this.state = {
            allCategories: [],
            allCommodities: [],
            allStates: ["Alaska",
                "Alabama",
                "Arkansas",
                "American Samoa",
                "Arizona",
                "California",
                "Colorado",
                "Connecticut",
                "District of Columbia",
                "Delaware",
                "Florida",
                "Georgia",
                "Guam",
                "Hawaii",
                "Iowa",
                "Idaho",
                "Illinois",
                "Indiana",
                "Kansas",
                "Kentucky",
                "Louisiana",
                "Massachusetts",
                "Maryland",
                "Maine",
                "Michigan",
                "Minnesota",
                "Missouri",
                "Mississippi",
                "Montana",
                "North Carolina",
                " North Dakota",
                "Nebraska",
                "New Hampshire",
                "New Jersey",
                "New Mexico",
                "Nevada",
                "New York",
                "Ohio",
                "Oklahoma",
                "Oregon",
                "Pennsylvania",
                "Puerto Rico",
                "Rhode Island",
                "South Carolina",
                "South Dakota",
                "Tennessee",
                "Texas",
                "Utah",
                "Virginia",
                "Virgin Islands",
                "Vermont",
                "Washington",
                "Wisconsin",
                "West Virginia",
                "Wyoming"],
            selectedCategories: [],
            selectedCommodities: [],
            selectedStates: [],
            yearRange: { min: 1980, max: 2020 }
        }
    }

    onSelectCategory = (opt) => {
        this.setState({
            selectedCategories: opt
        });
    }

    onSelectCommodity = (opt) => {
        this.setState({
            selectedCommodities: opt
        });
    }

    onSelectState = (opt) => {
        this.setState({
            selectedStates: opt
        });
    }

    render() {

        let allStates = [],
            index,
            stateName
        for (index in this.state.allStates) {
            stateName = this.state.allStates[index]
            allStates.push({ label: stateName, value: stateName })
        }

        return (
            <div>
                <Navbar />
                <div className="row m-5">
                    <div className="col-md-2">
                        <p id="year">Year range</p>
                    </div>
                    <div className="col-md-10">
                        <InputRange
                            maxValue={2020}
                            minValue={1980}
                            value={this.state.yearRange}
                            onChange={yearRange => this.setState({ yearRange })} />

                    </div>
                </div>

                <div className="row m-5">
                    <div className="col-md-4">
                        <Select isMulti onChange={this.onChangeMultiSelect} options={[]} value={this.state.selectedDevices} placeholder="Category" />
                    </div>
                    <div className="col-md-4">
                        <Select isMulti onChange={this.onChangeMultiSelect} options={[]} value={this.state.selectedDevices} placeholder="Commodity" />
                    </div>
                    <div className="col-md-4">
                        <Select isMulti onChange={this.onSelectState} options={allStates} value={this.state.selectedStates} placeholder="State" />
                    </div>
                </div>

                <div className="m-5">
                    <ChartComponent yearRange={this.state.yearRange} />
                </div>

            </div>
        )
    }
}

//export FoodSupplyHoliday Component
export default FoodSupplyHoliday;