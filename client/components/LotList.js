import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import fetchDeviationsQuery from '../queries/fetchDeviations';
import deleteLot from '../queries/deleteLot';



class LotList extends Component {
    //mutation expects to receive the id of the deviation to delete
    onDeleteLot(id) {
        this.props.mutate({
                // key:id value:id
                variables: { id }, 
            })
            //use this.props.data.refetch() because it is associated with this component b/c HOC wrapping
            .then(() => this.props.data.refetch());
    }
    renderLots() {
        // console.log(this.props.lots);
        return this.props.lots.map(({ id, contents }) => {
            return (
                <li key={id} className="collection-item">
                {contents}
                <i className="material-icons" onClick={() => this.onDeleteLot(id)}>delete</i>
                </li>
            );
        })
    }
    render() {

        return (
            <div>
            <h5>Impacted Lot Numbers</h5>
            <ul className="collection">{this.renderLots()}</ul>
            </div>
        );
    }
}



export default compose(
        graphql(deleteLot),
    graphql(fetchDeviationsQuery))(LotList)
;