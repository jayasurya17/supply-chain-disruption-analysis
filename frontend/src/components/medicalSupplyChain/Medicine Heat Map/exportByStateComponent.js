import React, { Component } from 'react'
import USAMap from 'react-usa-map'
import stateName from '../../../constants/stateShortName'
import "./exportByStateComponent.css"

class ExportByStateComponent extends Component {

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
		return "#" + color + "ff" + color
	}

	statesCustomConfig = () => {

		let maxVal = 0
		for (let val in this.props.exportCount) {
			maxVal = Math.max(maxVal, this.props.exportCount[val])
		}

		let states = {}
		for (let val in this.props.exportCount) {
			states[stateName[val.toUpperCase()]] = { fill: this.getColor(this.props.exportCount[val], maxVal) }
		}
		return states
	};

	render() {

		return (
			<div>
				<div id="colorGradientDisasters" className="w-100">
					<span className="text-left">High</span>
					<span id="rightAlign">Low</span>
				</div>
				<div className="text-center bg-secondary">
					{/* Graph goes here */}
					<USAMap customize={this.statesCustomConfig()} defaultFill="#ffffff" />
				</div>
			</div>
		)
	}
}

export default ExportByStateComponent
