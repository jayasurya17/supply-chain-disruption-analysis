import React, { Component } from 'react';

class DisastersTable extends Component {

    render() {

        return (
            <div className="row p-5 m-5">
                <p id='year'>*Disaster classification (<a href="https://public.emdat.be/about" target="_blank" rel="noopener noreferrer">Source</a>)</p>
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Type</th>
                            <th scope="col">Cause</th>
                            <th scope="col">Category</th>
                            <th scope="col">Sub-Type included</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Earthquake</th>
                            <td>Natural</td>
                            <td>Geophysical</td>
                            <td>Ground movement, Tsunami</td>
                        </tr>
                        <tr>
                            <th scope="row">Volcanic activity</th>
                            <td>Natural</td>
                            <td>Geophysical</td>
                            <td>Ash fall, Lahar, Pyroclastic flow, Lava flow</td>
                        </tr>
                        <tr>
                            <th scope="row">Storm</th>
                            <td>Natural</td>
                            <td>Meteorological</td>
                            <td>Tropical storm, Extra-tropical storm, Convective storm</td>
                        </tr>
                        <tr>
                            <th scope="row">Extreme Temperature</th>
                            <td>Natural</td>
                            <td>Meteorological</td>
                            <td>Cold wave, Heat Wave, Severe winter conditions</td>
                        </tr>
                        <tr>
                            <th scope="row">Flood</th>
                            <td>Natural</td>
                            <td>Hydrological</td>
                            <td>Coastal flood, Riverine flood, Flash flood, Ice jam flood</td>
                        </tr>
                        <tr>
                            <th scope="row">Landslide</th>
                            <td>Natural</td>
                            <td>Hydrological</td>
                            <td>Avalanche (snow, debris, mudflow, rock fall)</td>
                        </tr>
                        <tr>
                            <th scope="row">Drought</th>
                            <td>Natural</td>
                            <td>Climatological</td>
                            <td>Drought</td>
                        </tr>
                        <tr>
                            <th scope="row">Wildfire</th>
                            <td>Natural</td>
                            <td>Hydrological</td>
                            <td>Forest fires, Land fire: Brush, bush, pasture</td>
                        </tr>
                        <tr>
                            <th scope="row">Epidemic</th>
                            <td>Natural</td>
                            <td>Biological</td>
                            <td>Viral diseases, Bacterial diseases, Parasitic diseases, Fungal diseases, Prion diseases</td>
                        </tr>
                        <tr>
                            <th scope="row">Industrial accident</th>
                            <td>Technological</td>
                            <td>Technological</td>
                            <td>Chemical spill, Gas leak, Poisoning, Radiation</td>
                        </tr>
                        <tr>
                            <th scope="row">Miscellaneous accident</th>
                            <td>Technological</td>
                            <td>Technological</td>
                            <td>Collapse, Explosion, Fire</td>
                        </tr>
                        <tr>
                            <th scope="row">Transport accident</th>
                            <td>Technological</td>
                            <td>Technological</td>
                            <td>Air, Rail, Road, Water</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
//export DisastersTable Component
export default DisastersTable;