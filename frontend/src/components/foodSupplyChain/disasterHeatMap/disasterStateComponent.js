import React, { Component } from 'react'
import USAMap from 'react-usa-map'
import stateName from '../../../constants/stateShortName'
import "./disasterStateComponent.css"

class DisasterStateComponent extends Component {

	componentToHex = (c) => {
		var hex = c.toString(16);
		return hex.length === 1 ? "0" + hex : hex;
	}

	getColor = (value, total) => {
		if (total === 0) {
			return "#ffffff"
		}
		let percent = value / total
		// percent *= 0.7
		let r = Math.floor(percent * 255)
		r = 255 - r
		let color = this.componentToHex(r)
		return "#ff" + color + color
	}

	statesCustomConfig = () => {

		let maxVal = 0
		for (let val in this.props.disasterCount) {
			maxVal = Math.max(maxVal, this.props.disasterCount[val])
		}

		let states = {}
		for (let val in this.props.disasterCount) {
			states[stateName[val]] = { fill: this.getColor(this.props.disasterCount[val], maxVal) }
		}
		return states
	};

	render() {

		return (
			<div>
				<div className="w-100 colorGradientDisasters">
					<span className="text-left">Least likely</span>
					<span id="rightAlign">Most likely</span>
				</div>
				<div className="text-center bg-secondary">
					{/* Graph goes here */}
					<USAMap customize={this.statesCustomConfig()} defaultFill="#ffffff" />
				</div>
			</div>
		)
	}
}

export default DisasterStateComponent
