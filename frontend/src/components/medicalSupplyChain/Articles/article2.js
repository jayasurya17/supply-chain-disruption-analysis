import React, { Component } from 'react'
import './style.css'

class Articles extends Component {

    constructor() {
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

    render() {
        return (
            <div className="m-3 p-2 border rounded">
                <div className="row">
                    <div className="col-md-11">
                        <h5>Production volume of N95 masks in the United States in January 2020 and winter 2020 <span className="font-italic">(in millions)</span></h5>
                    </div>
                    <div className="col-md-1">
                        {
                            this.state.showContents?
                            <h5 onClick={this.toggleShowContent}><i class="fas fa-chevron-up"></i></h5>:
                            <h5 onClick={this.toggleShowContent}><i class="fas fa-chevron-down"></i></h5>
                        }
                    </div>
                </div>

                {
                    this.state.showContents?
                    <div>
                        <div>
                        In January 2020, the monthly production capacity of N95 masks in the United States was 45 million units. 
                        As the global demand for N95 masks has skyrocketed due to the coronavirus (COVID-19) pandemic in 
                        2020, producers have scrambled to increase production to meet that demand. It is estimated that 
                        U.S. production of the highly protective N95 face masks will increase to 180 million units per 
                        month by the end/winter months of 2020.
                        </div>

                        <div className="text-center">
                            <img className="graph" src="/articles/2.png" alt="Prescription Rate of Hydroxychloroquine Varies Widely" />
                        </div>

                        <div className="text-center font-weight-bold">
                            As of January 2020. <a href="https://www.statista.com/statistics/1135072/us-n95-mask-production/" target="_blank" rel="noopener noreferrer">Source</a>
                        </div>
                    </div>
                :null   
                }

            </div>
        )
    }
}

//export Articles Component
export default Articles
