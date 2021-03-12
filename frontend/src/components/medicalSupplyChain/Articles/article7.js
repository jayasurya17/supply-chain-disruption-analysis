import React, { Component } from 'react'
import './style.css'

class Articles extends Component {
  constructor () {
    super()
    this.state = {
      showContents: false
    }
  }

  toggleShowContent = () => {
    this.setState({
      showContents: !this.state.showContents
    })
  }

  render () {
    return (
      <div className='m-3 p-2 border rounded'>
        <div className='row'>
          <div className='col-md-11'>
            <h5>Innovation during the COVID-19</h5>
          </div>
          <div className='col-md-1'>
            {this.state.showContents ? (
              <h3 onClick={this.toggleShowContent}>
                <i class='fas fa-chevron-up'></i>
              </h3>
            ) : (
              <h5 onClick={this.toggleShowContent}>
                <i class='fas fa-chevron-down'></i>
              </h5>
            )}
          </div>
        </div>

        {this.state.showContents ? (
          <div>
            <div>
              In 2021, we expect to triple the number of healthcare provider
              innovation submissions. Every IDN I talk to is solving problems in
              the “response phase” of the COVID-19 pandemic with innovation.
              Some innovations have common themes but there are nuances as well
              in how collaboration, speed and impact collided in these diverse
              areas:
              <ol>
                <li>
                  Improving demand planning and inventory management
                  capabilities
                </li>
                <li>Launching donation management programs</li>
                <li>Re-processing critical PPE items</li>
                <li>Developing self-manufacturing capabilities for PPE</li>
                <li>
                  Leveraging local manufacturers for supplies and equipment
                </li>
                <li>Collaborating with global manufacturers</li>
                <li>Building streamlined global sourcing capabilities</li>
                <li>
                  Funding data and analytics functions to digitize the supply
                  chain
                </li>
                <li>Managing patient care space and equipment in new ways</li>
                <li>
                  Optimizing physical supply chain assets like CSCs and
                  laundries
                </li>
                <li>Utilizing telemedicine and home-care more strategically</li>
              </ol>
            </div>

            <div className='text-center font-weight-bold'>
              For more information on the exciting innovations happening{' '}
              <a
                href='https://blogs.gartner.com/eric-odaffer/innovation-during-the-covid-19-healthcare-supply-chain-response-failure-is-not-an-option/?_ga=2.12026548.1042530090.1614916745-762522796.1614916745'
                target='_blank'
                rel='noopener noreferrer'
              >
                Source
              </a>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

//export Articles Component
export default Articles
