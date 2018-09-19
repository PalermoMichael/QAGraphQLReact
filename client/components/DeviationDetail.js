import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchDeviationQuery from "../queries/fetchDeviation"

import LotCreate from './LotCreate';
import LotList from './LotList';
import moment from 'moment';
import DescriptionCreate from './DescriptionCreate';
import DescriptionList from './DescriptionList';


class DeviationDetail extends Component {
    constructor(props){
        super(props); 
    }
    
    render() {
        const { deviation } = this.props.data;
        // console.log(this.props.data);
       

    if(!deviation) {
        // console.log(this.props);
        return <div>...Loading...</div>
    }
        console.log(this.props);
        const duedate = moment(deviation.dateassigned).add(30, 'days');
        const now = moment();
        return (
            
            <div className="row">
            <Link to="/deviations/new"><i className="material-icons left">arrow_back</i></Link>
            
            <h3 className="center-align"><Link to={`/deviations/${deviation.id}/update`}>
                        {deviation.title}
                    </Link></h3>
            <div className="center-align">
                <h4>Due date is {duedate.diff(now, 'days')} days from now</h4>
            </div>
            <div className="col s12">
            <table className="centered">
                <thead>
                    <tr>
                        <th>Deviation Number</th>
                        <th>Client ID</th>
                        <th>Type</th>
                        <th>Classification</th>
                        <th>Status</th>
                        <th>Department</th>
                        <th>Owner</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{deviation.title}</td>
                        <td>{deviation.client}</td>
                        <td>{deviation.deviationtype}</td>
                        <td>{deviation.classification}</td>
                        <td>{deviation.status}</td>
                        <td>{deviation.department}</td>
                        <td>{deviation.owner}</td>
                    </tr>
                </tbody>
            </table>
            <br></br>
            <table className="centered">    
                <thead>
                    <tr>
                        <th>Date Occurred</th>
                        <th>Date Discovered</th>
                        <th>Date Assigned</th>
                        <th className="duedate">Assigned Due Date</th>
                    </tr>
                </thead>        
                <tbody>
                    <tr>
                        <td>{moment(deviation.occurencedate).format('DD MMM YY')}</td>
                        <td>{moment(deviation.datediscovered).format('DD MMM YY')}</td>
                        <td>{moment(deviation.dateassigned).format('DD MMM YY')}</td>
                        <td>{moment(deviation.dateassigned).add(30, 'days').format('DD MMM YY')}</td>
                    </tr>
                </tbody>
            </table>
            <br></br>
            <table className="centered">
                <thead>
                    <tr> 
                        <th>1st Gate</th>
                        <th>2nd Gate</th>
                        <th>3rd Gate</th>
                        <th>QA Initial Review</th>
                        <th>Send to Client</th>
                        <th>Client Approval</th>
                        <th>QA Manager Approval</th>
                        <th>QA Closure</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{moment(deviation.dateassigned).add(1, 'days').format('DD MMM YY')}</td>
                        <td>{moment(deviation.dateassigned).add(3, 'days').format('DD MMM YY')}</td>
                        <td>{moment(deviation.dateassigned).add(11, 'days').format('DD MMM YY')}</td>
                        <td>{moment(deviation.dateassigned).add(17, 'days').format('DD MMM YY')}</td>
                        <td>{moment(deviation.dateassigned).add(20, 'days').format('DD MMM YY')}</td>
                        <td>{moment(deviation.dateassigned).add(24, 'days').format('DD MMM YY')}</td>
                        <td>{moment(deviation.dateassigned).add(27, 'days').format('DD MMM YY')}</td>
                        <td>{moment(deviation.dateassigned).add(28, 'days').format('DD MMM YY')}</td>
                    </tr>
                </tbody>
            </table>
            <br></br>
            <DescriptionList description={deviation.description} />
            <LotList lots={deviation.lots} />
            </div>
            <LotCreate deviationId={this.props.params.id} />
            <DescriptionCreate deviationId={this.props.params.id} />
            </div>
        );
    }
}

export default graphql(fetchDeviationQuery, {
    options: (props) => { return { variables: { 
        id: props.params.id
     } } }
})(DeviationDetail);
