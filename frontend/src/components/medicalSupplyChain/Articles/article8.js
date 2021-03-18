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
            <h5>How to Manage Healthcare Supply Chain Disruptions</h5>
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
              The healthcare supply chain has undergone Herculean disruptions
              from COVID-19 — and not just for frontline hospitals. Temporarily
              shuttered by state governments, many providers like massage
              therapists and chiropractors are now confronting the challenge of
              reopening their business amid supply shortages. Getting personal
              protective equipment (PPE) has been a priority to protect
              patients, clients, and staff. Dentists, for example, need N95
              masks and disposable gowns, and both national and local dental
              societies have requested federal support to restock those critical
              supplies. In a survey among dental offices, most said they had
              fewer than two weeks before they’d run out. But shortages for
              small practices go well beyond PPE. Disinfectants and hand
              sanitizer are also hard to come by. And as upstream manufacturers
              pivot to produce essentials like swabs and ventilators, everyday
              equipment and supplies could become scarce, too.
            </div>
            <h6> Factors to be considered to manage the COVID-19 crisis</h6>
            <ul>
              <li>Exacerbating a preexisting problem</li>
              <li>How to safeguard against shortages</li>
              <li>Check with your local health department</li>
              <li>Optimize existing supply</li>
              <li>Explore local initiatives</li>
              <li>Get more strategic about purchasing decisions</li>
              <li>Take caution when buying from foreign suppliers</li>
            </ul>
            <div className='text-center font-weight-bold'>
              <a
                href='https://squareup.com/us/en/townsquare/healthcare-practice-supply-chain-disruptions'
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
