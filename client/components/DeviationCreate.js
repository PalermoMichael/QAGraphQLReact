import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';
import fetchDeviationsQuery from '../queries/fetchDeviations';
import addDeviation from '../queries/addDeviation';


class DeviationCreate extends Component {
    constructor(props) {
        super(props);

        this.state = { title: '', client: '', owner: '', occurencedate: '' };
    }

    onSubmit(event) {
        event.preventDefault();

        this.props.mutate({
            variables: { 
                    title: this.state.title, 
                    client: this.state.client,
                    owner: this.state.owner,
                    classification: this.state.classification,
                    department: this.state.department,
                    status: this.state.status,
                    deviationtype: this.state.deviationtype,
                    occurencedate: this.state.occurencedate,
                    datediscovered: this.state.datediscovered,
                    dateassigned: this.state.dateassigned
                    },
            refetchQueries: [{ query: fetchDeviationsQuery }]
        }).then(() => hashHistory.push('/'));
        }

    render() {
        return(
            <div>
                <h3>Create New Deviation</h3>
                    <form className="row" onSubmit={this.onSubmit.bind(this)}>                    
                            <div className="col m4">
                            <label>Deviation Number:</label>
                                <input className="input-field focus active" 
                                    onChange={event => this.setState({ title: event.target.value })}
                                    value={this.state.title} required
                                />
                            </div>
                            <div className="col m4">    
                            <label>Client:</label>
                                <input className="input-field focus"
                                    onChange={event => this.setState({ client: event.target.value })}                         
                                    value={this.state.client}
                                />
                            </div>
                            <div className="col m4"> 
                            <label>Owner:</label>
                                <input className="input-field focus"
                                    onChange={event => this.setState({ owner: event.target.value })}                         
                                    value={this.state.owner}
                                />
                            </div>
                            <div className="col m4"> 
                            <label>Classification:</label>
                            <select className="browser-default"
                                onChange={event => this.setState({ classification: event.target.value })}                         
                                value={this.state.classification}>
                                <option>Classification</option>                                
                                <option value="Major">Major</option>
                                <option value="Minor">Minor</option>
                                <option value="Critical">Critical</option>    
                            </select>
                            </div>
                            <div className="col m4">
                            <label>Department:</label>
                            <select className="browser-default"
                                onChange={event => this.setState({ department: event.target.value })}                         
                                value={this.state.department}>
                                <option>Department</option>
                                <option value="QC Micro">QC Micro</option>
                                <option value="Manufacturing">Manufacturing</option>
                                <option value="QC Analytical">QC Analytical</option>
                                <option value="Materials Management">Materials Management</option>
                                <option value="Facilities">Facilities</option>
                                <option value="QC Operations">QC Operations</option>
                            </select>
                            </div>
                            <div className="col m4">
                            <label>Status:</label>
                            <select className="browser-default"
                                onChange={event => this.setState({ status: event.target.value })}                         
                                value={this.state.status}>
                                <option>Status</option>
                                <option value="Open">Open</option>
                                <option value="Closed" disabled>Closed</option>
                                <option value="Void" disabled>Void</option>
                            </select>
                            </div>
                            <div className="col m4">
                            <label>Deviation Type:</label>
                            <select className="browser-default"
                                onChange={event => this.setState({ deviationtype: event.target.value })}                         
                                value={this.state.deviationtype}>
                                <option>Deviation Type</option>
                                <option value="Unplanned">Unplanned</option>
                                <option value="Planned">Planned</option>
                            </select>
                            </div>
                            <div className="col m4">
                            <label>Occurence Date</label>
                            <input onChange={event => this.setState({ occurencedate: event.target.value })}
                                type="date"
                                className="datepicker"
                                value={this.state.occurencedate}
                            />
                            </div>
                             <div className="col m4">
                            <label>Discovery Date</label>
                            <input onChange={event => this.setState({ datediscovered: event.target.value })}
                                type="date"
                                className="datepicker"
                                value={this.state.datediscovered}
                            />
                            </div>
                            <div className="col m4">
                            <label>Date Assigned</label>
                            <input onChange={event => this.setState({ dateassigned: event.target.value })}
                                type="date"
                                className="datepicker"
                                value={this.state.dateassigned}
                            />
                            </div>
                            <div className="button-submit col s12">
                            <button className="btn-large green lighten-2 waves-effect waves-blue z-depth-5" type="submit">
                                Submit
                                <i className="material-icons right">send</i>
                            </button>
                            </div>                            
                </form>
            </div>
        );
    }
}


export default graphql(addDeviation)(DeviationCreate);