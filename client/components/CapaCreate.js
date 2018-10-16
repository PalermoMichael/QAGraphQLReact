import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
import fetchCapasQuery from '../queries/fetchCapas';
import addCapa from '../queries/addCapa';

class CapaCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {title: ''}
    }

    onSubmit(event) {
        event.preventDefault();

        this.props.mutate({
            variables: {
                title: this.state.title
            }
        })

    }

    render() {
        return (
            <div>
                <h3>Create New CAPA</h3>
                <form className="row" onSubmit={this.onSubmit.bind(this)}>
                    <div className="col m4">
                        <label>CAPA No.:</label>
                        <input
                            className="input-field focus active"
                            onChange={event => this.setState({ title: event.target.value })}
                            value={this.state.title}
                            required />
                    </div>
                    <div className="col m4">
                        <label>Client:</label>
                        <input
                            className="input-field focus"
                            onChange={event => this.setState({ client: event.target.value })}
                            value={this.state.client} />
                    </div>
                    <div className="col m4">
                        <label>Capa Owner:</label>
                        <input
                            className="input-field focus"
                            onChange={event =>
                                this.setState({ capaOwner: event.target.value })
                            }
                            value={this.state.capaOwner} />
                    </div>
                    <div className="col m4">
                        <label>Assigned By:</label>
                        <input
                            className="input-field focus"
                            onChange={event =>
                                this.setState({ assignedBy: event.target.value })
                            }
                            value={this.state.assignedBy} />
                    </div>
                    <div className="col m4">
                        <label>Department:</label>
                        <select
                            className="browser-default"
                            onChange={event =>
                                this.setState({ department: event.target.value })
                            }
                            value={this.state.department}>
                            <option>Department</option>
                            <option value="QC Micro">QC Micro</option>
                            <option value="Manufacturing">Manufacturing</option>
                            <option value="QC Analytical">QC Analytical</option>
                            <option value="Materials Management">Materials Management</option>
                            <option value="Facilities">Facilities</option>
                            <option value="QC Operations">QC Operations</option>
                            <option value="QA">QA</option>
                            <option value="Doc Control">Doc Control</option>
                        </select>
                    </div>
                    <div className="col m4">
                        <label>CAPA Plan Status:</label>
                        <select
                            className="browser-default"
                            onChange={event =>
                                this.setState({ capaPlanStatus: event.target.value })
                            }
                            value={this.state.capaPlanStatus}>
                            <option>Status</option>
                            <option value="Open" default>Open</option>
                            <option value="Completed">
                                Completed
							</option>
                            <option value="Void">
                                Void
							</option>
                            <option value="Extended">
                                Extended
							</option>
                            <option value="Overdue">
                                Overdue
							</option>
                        </select>
                        <div className="col m4">
                            <label>Risk Level:</label>
                            <select
                                className="browser-default"
                                onChange={event =>
                                    this.setState({ riskLevel: event.target.value })
                                }
                                value={this.state.riskLevel}>
                                <option>Risk Level</option>
                                <option value="Major">
                                    Major
                            </option>
                                <option value="Minor">
                                    Minor
                            </option>
                                <option value="Critical">
                                    Critical
                            </option>
                            </select>
                        </div>
                        <div className="col m4">
                            <label>Investigation Status:</label>
                            <select
                                className="browser-default"
                                onChange={event =>
                                    this.setState({ investigationStatus: event.target.value })}
                                value={this.state.investigationStatus}>
                                <option>Status</option>
                                <option value="Open">Open</option>
                                <option value="Completed">
                                    Completed
                        </option>
                                <option value="Void">
                                    Void
                        </option>
                                <option value="Extended">
                                    Extended
                        </option>
                                <option value="Overdue">
                                    Overdue
                        </option>
                            </select>
                        </div>
                        <div className="col m4">
                            <label>Risk Level:</label>
                            <select
                                className="browser-default"
                                onChange={event =>
                                    this.setState({ riskLevel: event.target.value })
                                }
                                value={this.state.riskLevel}>
                                <option>Risk Level</option>
                                <option value="Major">
                                    Major
                        </option>
                                <option value="Minor">
                                    Minor
                        </option>
                                <option value="Critical">
                                    Critical
                        </option>
                            </select>
                        </div>
                        <div className="col m4">
                            <label>Date Assigned:</label>
                            <input onChange={event => this.setState({ dateAssigned: event.target.value })}
                                type="date"
                                className="datepicker"
                                value={this.state.dateAssigned} />
                        </div>
                    <div className="button-submit col s12">
                    <button className="btn-large green lighten-2 waves-effect waves-blue z-depth-5" type="submit">
                        Submit<i className="material-icons right">send</i>
                    </button>
                    </div> 
                        </div>
                </form>
            </div>
        );
    }
}

export default CapaCreate;
