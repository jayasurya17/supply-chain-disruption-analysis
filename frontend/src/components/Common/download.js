import React, { Component } from 'react'
import CsvDownloader from 'react-csv-downloader'

class DownloadData extends Component {
  render () {
    return (
      <div>
        <CsvDownloader
          className='m-4'
          filename={this.props.filename}
          columns={this.props.columns}
          datas={this.props.datas}
          text='DOWNLOAD'
          suffix={true}
        >
          <button type='button' className='btn-secondary'>
            DOWNLOAD DATA AS .CSV
          </button>
        </CsvDownloader>
      </div>
    )
  }
}
//export DownloadData Component
export default DownloadData
