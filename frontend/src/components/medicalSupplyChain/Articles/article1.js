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
                        <h5>Prescription Rate of Hydroxychloroquine Varies Widely</h5>
                    </div>
                    <div className="col-md-1">
                        {
                            this.state.showContents?
                            <h3 onClick={this.toggleShowContent}><i class="fas fa-chevron-up"></i></h3>:
                            <h5 onClick={this.toggleShowContent}><i class="fas fa-chevron-down"></i></h5>
                        }
                    </div>
                </div>

                {
                    this.state.showContents?
                    <div>
                        <div>
                            Hydroxychloroquine, a malaria drug that has been touted for its benefits in treating COVID-19 patients by President Donald Trump. 
                            In the U.S., almost 40 percent of doctors said they had used the medication. Globally, half of doctors said they had used hydroxychloroquine for COVID-19.
                            In countries hit hard by coronavirus in Europe – Italy and Spain – doctors prescribed the medication most often. It was the most commonly used drug to treat 
                            COVID-19 together with antibiotics (used by 83 and 89 percent of doctors, respectively) in these countries, while in Germany and the UK, doctors relied more 
                            heavily on antibiotics and bronchial dilators.
                        </div>

                        <div className="text-center">
                            <img className="graph" src="/articles/1.jpeg" alt="Prescription Rate of Hydroxychloroquine Varies Widely" />
                        </div>

                        <div className="text-center font-weight-bold">
                            Share of doctors prescribing Hydroxychloroquine to COVID-19 patients. According to survey of 6200 doctors in 30 countires carried out 6-9 
                            April. <a href="https://www.statista.com/chart/21411/share-of-doctors-using-hydroxychloroquine-for-covid-19/" target="_blank" rel="noopener noreferrer">Source</a>
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
