import React, { Component } from 'react';
import './team-settings.scss';
import {Link} from "react-router-dom";

class TeamSettings extends Component<any, any> {

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return (
            <div id="team-settings" className="d-flex px-3">
                <div className="row team-settings-header d-flex my-4">
                    <p className="title m-0">Team settings</p>
                    <button><Link to='/tasklists'>Back to tasklists</Link></button>
                </div>
                
                <div className="row team-settings-body d-flex my-4">
                    <div className="team-details-col">
                        <form id="team-details-form" className="form pt-0">
                            <input type="text" name="name" placeholder="Team name" />
                            <textarea name="description" placeholder="Team description"></textarea>

                            <button type="submit">Save</button>
                        </form>
                    </div>
                    <div className="team-members-col">
                        <div className="row">
                            <table className="members">
                                <tr>
                                    <th>Member</th>
                                    <th>Action</th>
                                </tr>
                                <tr>
                                    <td>John Doe</td>
                                    <td>Delete</td>
                                </tr>
                                <tr>
                                    <td>Rick Dalton</td>
                                    <td>Delete</td>
                                </tr>
                                <tr>
                                    <td>Vincent Vega</td>
                                    <td>Delete</td>
                                </tr>
                            </table>
                        </div>
                        <div className="row d-flex">
                            <select name="member" className="my-2">
                                <option value="" selected disabled>Member</option>
                                <option value="1">Vanessa Brickstone</option>
                                <option value="2">Francesca Burrito</option>
                                <option value="3">Monica Velucci</option>
                            </select>
                            <button className="ml-2">Add member</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TeamSettings;
