import React, { Component } from 'react'
import CanvasJSReact from '../Common/lib/canvasjs.react'
var CanvasJSChart = CanvasJSReact.CanvasJSChart

class DisasterChartComponent extends Component {
  render () {
    let dataPoints1 = [],
      dataPoints2 = []
    for (
      var year = this.props.yearRange.min;
      year <= this.props.yearRange.max;
      year++
    ) {
      dataPoints1.push({ y: Math.floor(Math.random() * 50) + 150, x: year })
      //dataPoints2.push({y: Math.floor(Math.random() * 50) + 150, x: year})
    }
    const options = {
      animationEnabled: true,
      // title:{
      // 	text: "Number of New Customers"
      // },
      axisY: {
        title: 'Quantity',
        gridThickness: 0
      },
      toolTip: {
        shared: true
      },
      data: [
        {
          type: 'bar',
          name: 'Commodity 1',
          showInLegend: true,
          dataPoints: dataPoints1
        }
        // {
        // 	type: "spline",
        // 	name: "Commodity 2",
        // 	showInLegend: true,
        // 	dataPoints: dataPoints2
        // }
      ]
    }

    return (
      <div>
        <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
        />
      </div>
    )
  }
}

export default DisasterChartComponent
