import React, { Component } from 'react';
import './quarterlyDifferenceTable.css';

class QuarterlyDifferenceTable extends Component {

    getQuantity = (year, quarter) => {
        if (year in this.props.data && quarter in this.props.data[year]) {
            let value = this.props.data[year][quarter].value
            value = parseInt(value, 10)
            value /= 1000
            return <span id="values">{value}</span>
        }
        return <span id="values" className="text-secondary text-center">-</span>
    }

    getPercent = (year, quarter) => {
        if (year in this.props.data && quarter in this.props.data[year]) {
            let percent = parseFloat(this.props.data[year][quarter].percent).toFixed(2)
            if (percent > 0) {
                return <span id="percent" className="text-success"><i class="fas fa-arrow-up"></i> {percent}%</span>
            } else if (percent < 0) {
                return <span id="percent" className="text-danger"><i class="fas fa-arrow-down"></i> {-percent}%</span>
            } else {
                return <span id="percent" className="text-secondary">0.00 %</span>
            }
        }
        return null
    }

    render() {

        return (
            <div className="mt-2">
                <p id="heading">* All the figures are in tons</p>
                <div className="row mt-2 p-2 text-white bg-secondary text-center" id="heading">
                    <div className="col-md-10 offset-md-2">
                        <div className="row">
                            <div className="col-md-3">Q1</div>
                            <div className="col-md-3">Q2</div>
                            <div className="col-md-3">Q3</div>
                            <div className="col-md-3">Q4</div>
                        </div>
                    </div>
                </div>
                <div className="row p-2 text-center">
                    <div className="col-md-2" id="heading">2015</div>
                    <div className="col-md-10">
                        <div className="row">
                            <div className="col-md-3">{this.getQuantity("2015", "Q1")}</div>
                            <div className="col-md-3">{this.getQuantity("2015", "Q2")}</div>
                            <div className="col-md-3">{this.getQuantity("2015", "Q3")}</div>
                            <div className="col-md-3">{this.getQuantity("2015", "Q4")}</div>
                        </div>
                    </div>
                </div>
                <div className="row p-2 text-center">
                <div className="col-md-2" id="heading">2016</div>
                <div className="col-md-10">
                    <div className="row">
                        <div className="col-md-3">{this.getQuantity("2016", "Q1")} {this.getPercent("2016", "Q1")}</div>
                        <div className="col-md-3">{this.getQuantity("2016", "Q2")} {this.getPercent("2016", "Q2")}</div>
                        <div className="col-md-3">{this.getQuantity("2016", "Q3")} {this.getPercent("2016", "Q3")}</div>
                        <div className="col-md-3">{this.getQuantity("2016", "Q4")} {this.getPercent("2016", "Q4")}</div>
                    </div>
                </div>
            </div>
                <div className="row p-2 text-center">
                <div className="col-md-2" id="heading">2017</div>
                <div className="col-md-10">
                    <div className="row">
                        <div className="col-md-3">{this.getQuantity("2017", "Q1")} {this.getPercent("2017", "Q1")}</div>
                        <div className="col-md-3">{this.getQuantity("2017", "Q2")} {this.getPercent("2017", "Q2")}</div>
                        <div className="col-md-3">{this.getQuantity("2017", "Q3")} {this.getPercent("2017", "Q3")}</div>
                        <div className="col-md-3">{this.getQuantity("2017", "Q4")} {this.getPercent("2017", "Q4")}</div>
                    </div>
                </div>
            </div>
                <div className="row p-2 text-center">
                <div className="col-md-2" id="heading">2018</div>
                <div className="col-md-10">
                    <div className="row">
                        <div className="col-md-3">{this.getQuantity("2018", "Q1")} {this.getPercent("2018", "Q1")}</div>
                        <div className="col-md-3">{this.getQuantity("2018", "Q2")} {this.getPercent("2018", "Q2")}</div>
                        <div className="col-md-3">{this.getQuantity("2018", "Q3")} {this.getPercent("2018", "Q3")}</div>
                        <div className="col-md-3">{this.getQuantity("2018", "Q4")} {this.getPercent("2018", "Q4")}</div>
                    </div>
                </div>
            </div>
            <div className="row p-2 text-center">
            <div className="col-md-2" id="heading">2019</div>
            <div className="col-md-10">
                <div className="row">
                    <div className="col-md-3">{this.getQuantity("2019", "Q1")} {this.getPercent("2019", "Q1")}</div>
                    <div className="col-md-3">{this.getQuantity("2019", "Q2")} {this.getPercent("2019", "Q2")}</div>
                    <div className="col-md-3">{this.getQuantity("2019", "Q3")} {this.getPercent("2019", "Q3")}</div>
                    <div className="col-md-3">{this.getQuantity("2019", "Q4")} {this.getPercent("2019", "Q4")}</div>
                </div>
            </div>
        </div>
            <div className="row p-2 text-center">
            <div className="col-md-2" id="heading">2020</div>
            <div className="col-md-10">
                <div className="row">
                    <div className="col-md-3">{this.getQuantity("2020", "Q1")} {this.getPercent("2020", "Q1")}</div>
                    <div className="col-md-3">{this.getQuantity("2020", "Q2")} {this.getPercent("2020", "Q2")}</div>
                    <div className="col-md-3">{this.getQuantity("2020", "Q3")} {this.getPercent("2020", "Q3")}</div>
                    <div className="col-md-3">{this.getQuantity("2020", "Q4")} {this.getPercent("2020", "Q4")}</div>
                </div>
            </div>
        </div>

            </div>
        )
    }
}
//export QuarterlyDifferenceTable Component
export default QuarterlyDifferenceTable;