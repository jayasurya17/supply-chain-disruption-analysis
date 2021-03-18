import React, { Component } from 'react'
import './style.css'
import Table1 from './article/Table1.png'
import Table2 from './article/Table2.png'

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
            <h5>
              Vulnerability of the medical product supply chain: the wake-up
              call of COVID-19
            </h5>
          </div>
          <div className='col-md-1'>
            {this.state.showContents ? (
              <h5 onClick={this.toggleShowContent}>
                <i class='fas fa-chevron-up'></i>
              </h5>
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
              <p>
                The vulnerability of medical product supply—and its converse,
                resilience—has historically attracted little interest from
                clinicians, healthcare executives or those engaged in improving
                healthcare quality. Yet, as the COVID-19 pandemic has made
                obvious to even the casual observer, product shortages affect
                clinical practice, organisational performance and patient
                outcomes.
              </p>
              <p>
                We can broadly categorize the medical supply chain vulnerability
                two two categories
              </p>
              <h6>Category 1 - Manufacturing</h6>

              <div className='text-center'>
                <img
                  className='photo'
                  src={Table1}
                  alt='Manufacturing problems as causes of supply chain disruptions'
                />
              </div>

              <h6>Category 2 -Transport and Regulation</h6>
              <div className='text-center'>
                <img
                  className='photo'
                  src={Table2}
                  alt='Transport and Regulation as causes of supply chain disruptions'
                />
              </div>
            </div>

            <div className='text-center font-weight-bold'>
              <a
                href='https://qualitysafety.bmj.com/content/early/2020/11/02/bmjqs-2020-012133#T2'
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
