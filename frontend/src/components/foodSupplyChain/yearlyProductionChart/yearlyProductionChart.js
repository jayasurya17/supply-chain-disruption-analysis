import React, { Component } from 'react'
import CanvasJSReact from '../../Common/lib/canvasjs.react'
var CanvasJSChart = CanvasJSReact.CanvasJSChart

class ChartComponent extends Component {
  render () {
    let dataPoints1 = [],
      dataPoints2 = [],
      dataPoints3 = [],
      index = 0
    if (this.props.Commodity1.length > 0) {
      for (index in this.props.Commodity1) {
        dataPoints1.push({
          y: this.props.Commodity1[index].yearlyValue,
          x: this.props.Commodity1[index].year
        })
      }
    }
    if (this.props.Commodity2.length > 0) {
      for (index in this.props.Commodity2) {
        dataPoints2.push({
          y: this.props.Commodity2[index].yearlyValue,
          x: this.props.Commodity2[index].year
        })
      }
    }
    if (this.props.Commodity3.length > 0) {
      for (index in this.props.Commodity3) {
        dataPoints3.push({
          y: this.props.Commodity3[index].yearlyValue,
          x: this.props.Commodity3[index].year
        })
      }
    }
    const options = {
      animationEnabled: true,
      title: {
        text: 'Production per year'
      },
      axisY: {
        title: 'Quantity',
        gridThickness: 0
      },
      axisX: {
        title: 'Year',
        interval: 1,
        gridThickness: 0
      },
      toolTip: {
        shared: true
      },
      data: [
        {
          type: 'spline',
          name:
            this.props.Commodity1.length > 0
              ? this.props.Commodity1[0].commodity
              : '',
          showInLegend: true,
          dataPoints: dataPoints1
        },
        {
          type: 'spline',
          name:
            this.props.Commodity2.length > 0
              ? this.props.Commodity2[0].commodity
              : '',
          showInLegend: true,
          dataPoints: dataPoints2
        },
        {
          type: 'spline',
          name:
            this.props.Commodity3.length > 0
              ? this.props.Commodity3[0].category
              : '',
          showInLegend: true,
          dataPoints: dataPoints3
        }
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

export default ChartComponent
