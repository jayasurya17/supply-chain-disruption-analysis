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
                        <h5>Hand Sanitizer Market Size, Share & Trends Analysis Report By Product (Gel, Foam, Liquid), By Distribution Channel (Hypermarket & Supermarket, Drug Store, Specialty Store, Online), By Region, And Segment Forecasts, 2020 - 2027</h5>
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
                            The global hand sanitizer market size valued at USD 2.7 billion in 2019 
                            and is expected to grow at a compound annual growth rate (CAGR) of 22.6% 
                            from 2020 to 2027. Shifting consumer preference towards convenient hygiene 
                            products is expected to drive the market. In addition, the recent COVID-19 
                            pandemic at the beginning of 2020 has spurred the market for hand sanitizer. 
                            The demand for hand hygiene products has been exceeding the supply in both 
                            online as well as brick and mortar sale channels worldwide owing to the 
                            global outbreak of the virus in a short time span. The outbreak has 
                            reinforced the significance of regular hand sanitizing and cleaning practices 
                            among consumers and is among the prominent factor driving the market.
                        </div>

                        <div className="text-center">
                            <img className="graph" src="/articles/4.png" alt="Prescription Rate of Hydroxychloroquine Varies Widely" />
                        </div>

                        <div className="text-center font-weight-bold">
                            U.S. hand sanitizer market size, by product, 2016-2027 
                            (USD million) <a href="https://www.grandviewresearch.com/industry-analysis/hand-sanitizer-market" target="_blank" rel="noopener noreferrer">Source</a>
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
