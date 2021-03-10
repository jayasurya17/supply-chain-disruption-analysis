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
                        <h5>Selected supplies (PPE) needed every month by frontline healthcare workers worldwide to protect themselves and others from COVID-19 <span className="font-italic">(in million units)</span></h5>
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
                            According to the World Health Organization, healthcare workers at the 
                            forefront of the fight against COVID-19 every month need 89 million 
                            masks to stay protected and protect others from the coronavirus. The 
                            statistic illustrates the supplies (personal protective equipment - PPE) 
                            needed by frontline health responders around the world every month.
                        </div>

                        <div className="text-center">
                            <img className="graph" src="/articles/3.png" alt="Prescription Rate of Hydroxychloroquine Varies Widely" />
                        </div>

                        <div className="text-center font-weight-bold">
                            Worldwide, as of March 2020. <a href="https://www.statista.com/statistics/1119103/supplies-needed-by-health-responders-against-covid-19-worldwide/" target="_blank" rel="noopener noreferrer">Source</a>
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
