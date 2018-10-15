import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import query from '../queries/User/fetchCurrentUser';
import mutation from '../queries/User/Logout';

class Header extends Component {
	onLogout({ user }) {       
		this.props.mutate({
            variables: { user }, 
            refetchQueries: [{ query }]
        }).then(this.props.data.reftch());       
	}

	renderButtons() {
		const { loading, user } = this.props.data;

		if (loading) {
			return <div />;
		}

		if (user) {
			return (
				<li>
					<a onClick={this.onLogout.bind(this)}>Logout</a>
				</li>
			);
		} else {
			return (
				<div>
					<li>
						<Link to="/signup">Signup</Link>
					</li>
					<li>
						<Link to="/login">Login</Link>
					</li>
				</div>
			);
		}
	}

	render() {
		return (
			<nav>
				<div className="nav-wrapper">
					<Link to="/dashboard" className="brand-logo left">
						Cognate
					</Link>
					<ul className="right">{this.renderButtons()}</ul>
				</div>
			</nav>
		);
	}
}

export default graphql(mutation)(graphql(query)(Header));
