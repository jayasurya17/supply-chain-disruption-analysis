import React, { Component } from 'react';
import DownloadComponent from '../../Common/download';

class DownloadCropsData extends Component {
    render() {
        const columns = [{
            id: 'State',
            displayName: 'State'
        }, {
            id: 'Quantity',
            displayName: `${this.props.commodity} produced between ${this.props.yearRange.min} and ${this.props.yearRange.max}`
        }];

        let datas = [];
		for (let val in this.props.exportCount) {
            datas.push({
                'State': val,
                'Quantity': this.props.exportCount[val]
            })
        }
        
        return (
            <DownloadComponent columns={columns} datas={datas} filename="medicine_produced_per_state" />
        );
    }
}
//export DownloadCropsData Component
export default DownloadCropsData;