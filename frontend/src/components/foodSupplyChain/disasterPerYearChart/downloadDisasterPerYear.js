import React, { Component } from 'react';
import DownloadComponent from '../../Common/download';

class DownloadDisasterPerYear extends Component {
    
    render() {
        
        let columns = [{
            id: 'Month',
            displayName: `Month in year ${this.props.year}`
        }, {
            id: 'disaster',
            displayName: `Disaster(s) occurred`
        }];

        for (let commodity of this.props.commodities) {
            columns.push({
                id: commodity.value,
                displayName: `Production of ${commodity.value} in ${this.props.state} (${this.props.unit[commodity.value]})`
            })
        }

        let temp = []

        for (let commodity in this.props.production) {
            let commodityData = this.props.production[commodity]
            for (let month in commodityData) {
                if (!(month in temp)) {
                    temp[month] = {}
                }
                temp[month][commodity] = commodityData[month]
            }
        }

        let datas = []

        for (let month in temp) {
            let data = {
                'Month': month,
            }
            if (month in this.props.disasters) {
                data['disaster'] = this.props.disasters[month].join(",")
            }
            for (let commodity in temp[month]) {
                data[commodity] = temp[month][commodity]
            }
            datas.push(data)
        }

        return (
            <DownloadComponent columns={columns} datas={datas} filename="monthly_food_production_with_disasters" />
        );
    }
}
//export DownloadDisasterPerYear Component
export default DownloadDisasterPerYear;