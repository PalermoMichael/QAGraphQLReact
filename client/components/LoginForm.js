import React, { Component } from 'react'
import AuthForm from './AuthForm';
import { graphql } from 'react-apollo';
import mutation from '../queries/User/Login';
import query from '../queries/User/fetchCurrentUser';
import { hashHistory } from 'react-router';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = { errors: [] };
    }
    // componentDidMount(){
    //     _isMounted: true;
    // }
    componentWillUpdate(nextProps) {
        // this.props // the old, current set of props
        // nextProps // the next set of props that will be in place
        // when the component rerenders
        if(!this.props.data.user && nextProps.data.user) {
            // redirect to dashboard
            hashHistory.push('/dashboard');
        }
    }

    onSubmit({ name, password }) {
        // debugger;
        this.props.mutate({
            variables: { name, password },
            refetchqueries: [{ query }],
            // awaitRefetchQueries: true
        }).catch(res => {
            const errors = res.graphQLErrors.map(error => error.message);
            this.setState({ errors });
            // this.refs.test_ref ? this.setState({ errors }) : null;
        });    
    }

    render() {
        return (
            <div>
                <h3>Login</h3>
                <AuthForm
                    // ref="test_ref"
                    errors={this.state.errors}
                    onSubmit={this.onSubmit.bind(this)}
                />
            </div>
        );
    }
}

export default graphql(query)(
    graphql(mutation)(LoginForm))
;