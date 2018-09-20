import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchDeviationsQuery from '../queries/fetchDeviations';
import deleteDeviation from '../queries/deleteDeviation';

class DeviationList extends Component {
        //mutation expects to receive the id of the deviation to delete
    onDeleteDeviation(id) {
        this.props.mutate({
            // key:id value:id
            variables: { id }
            // refetchQueries:[{ query: fetchDeviationsQuery }]
        })
            //use this.props.data.refetch() because it is associated with this component
        .then(() => this.props.data.refetch());
    }

    renderDeviations() {
        //destructuring in es6 allows use of params from deviation like so...
        return this.props.data.deviations.map(({ id, title }) => {
            return (
                <ul key={id} className="collection-item">
                    <Link to={`/deviations/${id}`}>
                        {title}
                    </Link>
                    <i className="material-icons" onClick={() => this.onDeleteDeviation(id)}>delete</i>
                </ul>
            );
        })
    }
    
    render() {
        if(this.props.data.loading) { 
            return (
                <ul className="collection">
                ...Loading Deviation List
                </ul>
            );
        } return (
            <div>
            <h2>2018 Deviation Tracking Log</h2>
                <ul className="collection">
                    {this.renderDeviations()}
                </ul>
                <Link
                 to="/deviations/new"
                 className = "btn-floating btn-large waves-effect waves-light green right"
                >
                <i className="material-icons">add</i>
                </Link>
            </div>
            );
        }
    }


export default graphql(deleteDeviation)(
    graphql(fetchDeviationsQuery)(DeviationList)
);