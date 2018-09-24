import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from "graphql-tag";
import Deviation from './DeviationList';

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deviations: [],
			searchText: ''
		}
	}

	render() {
		return (
			<div>
				<div>
					Search Deviations
					<input
						type="text"
						onChange={e => this.setState({ searchText: e.target.value })}
					/>
					<button onClick={() => this.executeSearch()}>OK</button>
				</div>
				{this.state.deviations.map((deviation, index) => (
					<Deviation key={deviation.id} index={index} />
				))}
			</div>
		);
	}
}

let _executeSearch = async () => {
    const { searchText } = this.state;
    const result = await this.props.client.query({
        query: OPEN_DEVIATION_SEARCH_QUERY,
        variables: { searchText }
    });
    const deviations = result.data.deviations;
    this.setState({ deviations });
}
const OPEN_DEVIATION_SEARCH_QUERY = gql`
	query OpenDeviationSearchQuery($searchText: String!) {
		deviations(
			filter: { OR: [{ status: $searchText }, { department: $searchText }] }
		) {
			id
			title
			status
			department
			lots {
				id
				contents
			}
			description {
				id
				text
			}
		}
	}
`;

export default withApollo(Search);
