import React, { Component } from 'react'
import CanvasJSReact from '../../Common/lib/canvasjs.react'
import DisastersTable from '../disastersTable'
var CanvasJSChart = CanvasJSReact.CanvasJSChart

class DisasterChartComponent extends Component {
    render() {

        let graphData = [],
            dataPoints = [],
            dataPoint,
            monthIndex = { 'JAN': 1, 'FEB': 2, 'MAR': 3, 'APR': 4, 'MAY': 5, 'JUN': 6, 'JUL': 7, 'AUG': 8, 'SEP': 9, 'OCT': 10, 'NOV': 11, 'DEC': 12 },
            isDisasterMarked = false

        for (var commodity in this.props.production) {
            dataPoints = []
            for (var month in this.props.production[commodity]) {
                dataPoint = { y: Math.floor(this.props.production[commodity][month]), x: monthIndex[month] }
                if (month in this.props.disasters) {
                    if (isDisasterMarked === false) {
                        dataPoint.indexLabel = this.props.disasters[month].join(",")
                    }
                    dataPoint.markerType = "cross"
                    dataPoint.markerColor = "red"
                    dataPoint.markerSize = 12
                }
                dataPoints.push(dataPoint)
            }
            dataPoints.sort((a, b) => (a.x > b.x) ? 1 : -1)
            // console.log(dataPoints)
            isDisasterMarked = true
            graphData.push(
                {
                    type: 'spline',
                    name: commodity,
                    showInLegend: true,
                    dataPoints: dataPoints
                }
            )
        }
        if (graphData.length === 0) {
            return (
                <div className="text-center display-4">
                    No data is available for this input
                </div>
            )
        }
        const options = {
            animationEnabled: true,
            axisY: {
                title: 'Quantity',
                gridThickness: 0
            },
            axisX: {
                title: 'Month of year',
                gridThickness: 0,
                interval: 1,
                minimum: 0,
                // maximum: 12
            },
            toolTip: {
                shared: true
            },
            data: graphData
        }

        return (
            <div>
                <CanvasJSChart
                    options={options}
                /* onRef={ref => this.chart = ref} */
                className="m-5" />
                <DisastersTable />
            </div>
        )
    }
}

export default DisasterChartComponent
