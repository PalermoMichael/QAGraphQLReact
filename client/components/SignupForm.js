import React, { Component } from 'react'
import AuthForm from './AuthForm';
import { compose, graphql } from 'react-apollo';
import mutation from '../queries/User/Signup';
import query from '../queries/User/fetchCurrentUser';
import { hashHistory } from 'react-router';

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = { errors: [] };
    }

    componentWillUpdate(nextProps) {
        if (nextProps.data.user && !this.props.data.user) {
            hashHistory.push('/dashboard');
        }
    }

    onSubmit({ name, password }) {
        this.props.mutate({
            variables: { name, password },
            refetchQueries: [{ query }],
            awaitRefetchQueries: true
        }).catch(res => {
            const errors=res.graphQLErrors.map(error => error.message);
            this.setState({ errors });
        });
    }

    render() {
        return (
            <div>
            <h3>Sign Up</h3>
            <AuthForm
                errors={this.state.errors}
                onSubmit={this.onSubmit.bind(this)}
            />
            </div>
        );
    }
}

export default compose(
    graphql(query),
    graphql(mutation))(SignupForm)
;

