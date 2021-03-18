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
                        <h5>Health Care Supply Chains: COVID-19 Challenges and Pressing Actions</h5>
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
                            <p>
                                The supply chain for U.S. health care is really 5 different supply chains, and each one has its own problems and opportunities for improvement.
                            </p>
                            <h6>Pharmaceuticals</h6>
                            <p>
                                The immediate action plan should be to actively monitor drug 
                                supplies—not only within the United States but also back to tier 
                                2 and 3 suppliers. End-to-end transparency will give us advance 
                                warning when upstream disruptions occur. A longer-term solution is 
                                to reshore drug manufacturing for critical drugs, or at least to 
                                develop a dual supply chain in which three fourths of the domestic 
                                demand is met by domestic production. This will improve the 
                                traceability, resiliency, and responsiveness of our pharmaceutical 
                                supply chain.
                            </p>
                            <h6>Personal Protective Equipment</h6>
                            <p>
                                States, hospital systems, and the federal government are all 
                                competing for the same resources and paying a significant premium 
                                over list price—which can be prevented if these entities coordinate 
                                their plans. In the long run, a judiciously maintained emergency 
                                stockpile, rotated to keep inventory fresh, will prevent this 
                                situation from recurring.
                            </p>
                            <h6>Medical Devices</h6>
                            <p>
                                Locations with various ventilator types will require a wider array 
                                of replacement parts, increasing the likelihood of mismatches 
                                between part availability and need. Therefore, coordinated 
                                procurement across the entire U.S. health care system is essential 
                                so that homogeneity of ventilators is maintained at each location. 
                                Looking ahead, we must create a more agile supply chain for 
                                ventilators and other critical medical devices by improving product 
                                design and judiciously relaxing underlying regulations.
                            </p>
                            <h6>Medical Supplies</h6>
                            <p>
                                Newer tests and alternate testing protocols are helping in developing 
                                contingency plans for medical supplies which will help prepare us better 
                                for the next lethal virus.
                            </p>
                            <h6>Blood</h6>
                            <p>
                                The implications of COVID-19 for the health care supply chains are powerful and 
                                far-reaching. Urgent action must be taken to ensure that our supply chains support 
                                our health care providers at this critical time and in the future.
                            </p>
                        </div>

                        <div className="text-center font-weight-bold">
                            <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7219430/" target="_blank" rel="noopener noreferrer">Source</a>
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
