import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import fetchDeviationsQuery from '../queries/fetchDeviations';


class DescriptionList extends Component {
    renderDescription() {
        // console.log(this.props.description);
        return this.props.description.map(({ id, text }) => {
            return (
                <li key={id} className="collection-item">
                {text}
                </li>
            );
        })
    }
    render() {
        return (           
            <div className="center-align">
                <h5>Deviation Description</h5>
                    <ul className="collection">{this.renderDescription()}</ul>
            </div>
        );
    }
}



export default graphql(fetchDeviationsQuery)(DescriptionList);