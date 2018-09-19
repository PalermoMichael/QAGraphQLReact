import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';


class Header extends Component {
    onLogoutClick() {
        this.props.mutate({
            refetchqueries: [{ query }]
        });
    }

    renderButtons() {
        const { loading, user } = this.props.data;

        if(loading) { return <div />; }

        if(user) {
            return (
                <li><a onClick={this.onLogoutClick.bind(this)}>Logout</a></li>
            );
        } else {
            return(
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
                    <Link to="/" className="brand-logo left">
                        Cognate QA
                    </Link>
                    <ul className="right">
                        {this.renderButtons()}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default compose(
    graphql(mutation),
    graphql(fetchCurrentUserQuery))(Header)
;