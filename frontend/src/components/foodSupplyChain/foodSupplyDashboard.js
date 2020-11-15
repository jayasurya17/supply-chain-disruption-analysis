import React, { Component } from "react";
import axios from "axios";
import Navbar from "../Common/navbar";
import "./foodSupplyDashboard.css";
import Select from "react-select";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import ChartComponent from "./chartComponent";
import listOfStates from "../../constants/stateNames";

class FoodSupplyHoliday extends Component {
  componentDidMount() {
    //populate categories
    axios.get(`http://localhost:9000/filters/categories`).then((res) => {
      const allCategories = res.data;
      this.setState({ allCategories });
    });
  }

  constructor() {
    super();
    this.state = {
      allCategories: [],
      allCommodities: [],
      allStates: listOfStates,
      selectedCategories: [],
      selectedCommodities: [],
      selectedStates: [],
      units: [],
      category0: [
        { a: "a", b: "b" },
        { a: "a", b: "b" },
      ],
      yearRange: { min: 1980, max: 2020 },
    };
  }

  onSelectCategory = (opt) => {
    if (opt) {
      console.log("opt" + opt);
      this.setState({
        selectedCategories: opt,
      });

      axios
        .get("http://localhost:9000/filters/commoditiesByCategory", {
          params: { category: opt.value },
        })
        .then((res) => {
          const selectedCommodities = res.data;
          console.log("selected" + selectedCommodities);
          let chosenCategories = [],
            chosenCategory,
            index;
          for (index in selectedCommodities) {
            chosenCategory = selectedCommodities[index];
            chosenCategories.push({
              label: chosenCategory,
              value: chosenCategory,
            });
            this.setState({ allCommodities: chosenCategories });
          }
        });
    }
  };
  onSelectCommodity = async (opt) => {
    await this.setState({
      selectedCommodities: opt,
    });
    // for (index in this.state.selectedCommodities) {
    // }
  };
  onSelectState = async (opt) => {
    await this.setState({
      selectedStates: opt,
    });

    this.getInfo();
  };
  getInfo = async () => {
    await axios
      .get("http://localhost:9000/analysis/historicalDataByState", {
        params: {
          category: this.state.selectedCategories.value,
          commodity: this.state.selectedCommodities.value,
          startYear: this.state.yearRange.min,
          endYear: this.state.yearRange.max,
          state: this.state.selectedStates.value,
        },
      })
      .then((res) => {
        const selectedCommodities = res.data;
        console.log("selected" + selectedCommodities);
        alert(res.data.length);
      });
  };

  render() {
    let allStates = [],
      index,
      stateName,
      category = [],
      categoryName;
    for (index in this.state.allStates) {
      stateName = this.state.allStates[index];
      allStates.push({ label: stateName, value: stateName });
    }
    for (index in this.state.allCategories) {
      categoryName = this.state.allCategories[index];
      category.push({ label: categoryName, value: categoryName });
    }
    let unitsDropdown = null;
    unitsDropdown = !this.state.selectedCommodities
      ? null
      : this.state.selectedCommodities.map((Commodity, index) => (
          <div className="col-md-4">
            <Select
              onChange={this.onSelectCategory}
              options={category + index.a}
              value={this.state.selectedDevices}
              placeholder={
                Commodity.value + " " + index + " " + category + index.a
              }
            ></Select>
          </div>
        ));

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
              onChange={(yearRange) => this.setState({ yearRange })}
            />
          </div>
        </div>
        <div className="row m-5">
          <div className="col-md-4">
            <Select
              //isMulti
              onChange={this.onSelectCategory}
              options={category}
              value={this.state.selectedDevices}
              placeholder="Category"
            ></Select>
          </div>
          <div className="col-md-4">
            <Select
              isMulti
              onChange={this.onSelectCommodity}
              options={this.state.allCommodities}
              value={this.state.selectedDevices}
              placeholder="Commodity"
            />
          </div>
          <div className="col-md-4">
            <Select
              onChange={this.onSelectState}
              options={allStates}
              value={this.state.selectedStates}
              placeholder="State"
            />
          </div>
        </div>
        <div className="row m-5">{unitsDropdown}</div>
        <div className="m-5">
          <ChartComponent yearRange={this.state.yearRange} />
        </div>
      </div>
    );
  }
}

//export FoodSupplyHoliday Component
export default FoodSupplyHoliday;
