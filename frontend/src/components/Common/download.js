import React from 'react'
// import React, { Component } from 'react'
import CsvDownloader from 'react-csv-downloader'
import { useSelector, shallowEqual } from 'react-redux'
import ProfileSelectors from '../../../src/store/features/profile/selectors'
import { Alert } from 'react-bootstrap'

// class DownloadData extends Component {
const DownloadData = (props) => {
    
    const { user } = useSelector(
        state => ({
            user: ProfileSelectors.user(state)
        }),
        shallowEqual
    )

    // render() {


        if (!user.jwtToken) {
            return (
                <Alert variant='dark'>
                    Please login to download the information presented in the chart
                </Alert>
            )
        }

        return (
            <div>
                <CsvDownloader
                    className='m-4'
                    filename={props.filename}
                    columns={props.columns}
                    datas={props.datas}
                    // filename={this.props.filename}
                    // columns={this.props.columns}
                    // datas={this.props.datas}
                    text='DOWNLOAD'
                    suffix={true}
                >
                    <button type='button' className='btn-secondary'>
                        DOWNLOAD DATA AS .CSV
          </button>
                </CsvDownloader>
            </div>
        )
    // }
}
//export DownloadData Component
export default DownloadData
