import React, { Component } from 'react'
import DownloadComponent from '../../Common/download'

class DownloadYearlyProduction extends Component {
  componentDidMount () {}
  render () {
    const columns = [
      {
        id: 'Year',
        displayName: 'Year'
      }
    ]
    let index = 0
    if (this.props.Commodity1.length > 0) {
      columns.push({
        id: this.props.Commodity1[0].commodity,
        displayName: 'Production of ' + this.props.Commodity1[0].commodity
      })
    }
    if (this.props.Commodity2.length > 0) {
      columns.push({
        id: this.props.Commodity2[0].commodity,
        displayName: 'Production of ' + this.props.Commodity2[0].commodity
      })
    }
    if (this.props.Commodity3.length > 0) {
      columns.push({
        id: this.props.Commodity3[0].commodity,
        displayName: 'Production of ' + this.props.Commodity3[0].commodity
      })
    }

    let temp = []

    for (index in this.props.Commodity1) {
      for (index in this.props.Commodity1) {
        temp[this.props.Commodity1[index].year] = {}
      }
    }
    let datas = []
    for (index in this.props.Commodity1) {
      temp[this.props.Commodity1[index].year][
        this.props.Commodity1[0].commodity
      ] = this.props.Commodity1[index].yearlyValue
    }

    for (index in this.props.Commodity2) {
      let year = this.props.Commodity2[index].year
      if (!(year in temp)) {
        temp[year] = {}
      }
      temp[year][this.props.Commodity2[0].commodity] = this.props.Commodity2[
        index
      ].yearlyValue
    }
    for (index in this.props.Commodity3) {
      let year = this.props.Commodity3[index].year
      if (!(year in temp)) {
        temp[year] = {}
      }
      temp[year][this.props.Commodity3[0].commodity] = this.props.Commodity3[
        index
      ].yearlyValue
    }

    for (let each in temp) {
      let data = {
        Year: each
      }
      for (let every in temp[each]) {
        data[every] = temp[each][every]
      }
      datas.push(data)
    }

    return (
      <DownloadComponent
        columns={columns}
        datas={datas}
        filename='Year_Food_Production'
      />
    )
  }
}
//export DownloadDisasterPerYear Component
export default DownloadYearlyProduction
