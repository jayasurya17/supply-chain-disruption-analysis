import React, { Component } from 'react';
import DownloadComponent from '../../Common/download';

class DownloadQuarterlyData extends Component {
    

    getQuantity = (year, quarter) => {
        if (year in this.props.data && quarter in this.props.data[year]) {
            let value = this.props.data[year][quarter].value
            value = parseInt(value, 10)
            // value /= 1000
            return value
        }
        return "-"
    }

    getRow = (year) => {
        return {
            'Year': year,
            'Q1': this.getQuantity(year.toString(), "Q1"),
            'Q2': this.getQuantity(year.toString(), "Q2"),
            'Q3': this.getQuantity(year.toString(), "Q3"),
            'Q4': this.getQuantity(year.toString(), "Q4"),
        }
    }
    
    render() {
        
        const columns = [{
            id: 'Year',
            displayName: 'Year'
        }, {
            id: 'Q1',
            displayName: `Production of ${this.props.commodity} in ${this.props.state} during Q1 (${this.props.unit})`
        }, {
            id: 'Q2',
            displayName: `Production of ${this.props.commodity} in ${this.props.state} during Q2 (${this.props.unit})`
        }, {
            id: 'Q3',
            displayName: `Production of ${this.props.commodity} in ${this.props.state} during Q3 (${this.props.unit})`
        }, {
            id: 'Q4',
            displayName: `Production of ${this.props.commodity} in ${this.props.state} during Q4 (${this.props.unit})`
        }];

        let datas = [
            this.getRow(this.props.year - 5),
            this.getRow(this.props.year - 4),
            this.getRow(this.props.year - 3),
            this.getRow(this.props.year - 2),
            this.getRow(this.props.year - 1),
            this.getRow(this.props.year),
        ]
        console.log(datas)
        
        return (
            <DownloadComponent columns={columns} datas={datas} filename="quarterly_food_production" />
        );
    }
}
//export DownloadQuarterlyData Component
export default DownloadQuarterlyData;