import React, { Component } from 'react';
import DownloadComponent from '../../Common/download';

class DownloadCropsData extends Component {
    render() {
        const columns = [{
            id: 'State',
            displayName: 'State'
        }, {
            id: 'Quantity',
            displayName: `Production of ${this.props.crop} between ${this.props.yearRange.min} and ${this.props.yearRange.max} (in ${this.props.unit})`
        }];

        let datas = [];
		for (let val in this.props.productionCount) {
            datas.push({
                'State': val,
                'Quantity': this.props.productionCount[val]
            })
        }
        
        return (
            <DownloadComponent columns={columns} datas={datas} filename="crops_production_per_state" />
        );
    }
}
//export DownloadCropsData Component
export default DownloadCropsData;