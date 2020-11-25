import React, { Component } from 'react';
import CsvDownloader from 'react-csv-downloader';

class DownloadData extends Component {
    render() {

        return (
            <div>
                <CsvDownloader
                    filename={this.props.filename}
                    columns={this.props.columns}
                    datas={this.props.datas}
                    text="DOWNLOAD" 
                    suffix={true} />
            </div>
        );
    }
}
//export DownloadData Component
export default DownloadData;