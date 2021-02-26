//Including react
// eslint-disable-next-line
import React, { Component } from 'react'

//Including the react-fusioncharts component
// eslint-disable-next-line
import ReactDOM from 'react-dom'

//Including the fusioncharts library
import FusionCharts from 'fusioncharts/core'

//Including the chart type
import Column2D from 'fusioncharts/viz/column2d'

//Import ReactFC
import ReactFC from 'react-fusioncharts'

//Including the theme as fusion
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'

//Adding the chart as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme)

//Creating the JSON object to store the chart configurations

// const chartConfigs = {
//   type: 'column2d', // The chart type
//   width: '700', // Width of the chart
//   height: '400', // Height of the chart
//   dataFormat: 'json', // Data type
//   dataSource: {
//     // Chart Configuration
//     chart: {
//       caption: 'Top 3 Juice Flavors',
//       subcaption: 'Last year',
//       xaxisname: 'Flavor',
//       yaxisname: 'Amount (In USD)',
//       numberprefix: '$',
//       theme: 'fusion',
//       rotateValues: '0'
//     },
//     data: [
//       {
//         label: 'Apple',
//         value: '810000',
//         link: 'newchart-xml-apple'
//       },
//       {
//         label: 'Cranberry',
//         value: '620000',
//         link: 'newchart-xml-cranberry'
//       },
//       {
//         label: 'Grapes',
//         value: '350000',
//         link: 'newchart-xml-grapes'
//       }
//     ],
//     linkeddata: [
//       {
//         id: 'apple',
//         linkedchart: {
//           chart: {
//             caption: 'Apple Juice - Quarterly Sales',
//             subcaption: 'Last year',
//             numberprefix: '$',
//             theme: 'fusion',
//             rotateValues: '0',
//             plottooltext: '$label, $dataValue,  $percentValue'
//           },
//           data: [
//             {
//               label: 'Q1',
//               value: '157000'
//             },
//             {
//               label: 'Q2',
//               value: '172000'
//             },
//             {
//               label: 'Q3',
//               value: '206000'
//             },
//             {
//               label: 'Q4',
//               value: '275000'
//             }
//           ]
//         }
//       },
//       {
//         id: 'cranberry',
//         linkedchart: {
//           chart: {
//             caption: 'Cranberry Juice - Quarterly Sales',
//             subcaption: 'Last year',
//             numberprefix: '$',
//             theme: 'fusion',
//             plottooltext: '$label, $dataValue,  $percentValue'
//           },
//           data: [
//             {
//               label: 'Q1',
//               value: '102000'
//             },
//             {
//               label: 'Q2',
//               value: '142000'
//             },
//             {
//               label: 'Q3',
//               value: '187000'
//             },
//             {
//               label: 'Q4',
//               value: '189000'
//             }
//           ]
//         }
//       },
//       {
//         id: 'grapes',
//         linkedchart: {
//           chart: {
//             caption: 'Grapes Juice - Quarterly Sales',
//             subcaption: 'Last year',
//             numberprefix: '$',
//             theme: 'fusion',
//             rotateValues: '0',
//             plottooltext: '$label, $dataValue,  $percentValue'
//           },
//           data: [
//             {
//               label: 'Q1',
//               value: '45000'
//             },
//             {
//               label: 'Q2',
//               value: '72000'
//             },
//             {
//               label: 'Q3',
//               value: '95000'
//             },
//             {
//               label: 'Q4',
//               value: '108000'
//             }
//           ]
//         }
//       }
//     ]
//   }
// }

// Trigerred when chart is rendered.
// Configures the linked charts.
// eslint-disable-next-line
const alterChart = chart => {
  chart.configureLink({
    type: 'pie2d',
    overlayButton: {
      message: 'Back',
      fontColor: '880000',
      bgColor: 'FFEEEE',
      borderColor: '660000'
    }
  })
}

// Step 9 - Creating the DOM element to pass the react-fusioncharts component
export default class Fusion extends React.Component {
  render () {
    return <ReactFC {...this.props.chartConfigs} />
  }
}
