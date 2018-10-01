import React, { Component } from 'react';
import { gql, withApollo } from 'react-apollo';

class searchComponent extends Component {
    constructor(props) {
        super(props);
        state = {
            search: ""
        }
    }

    handleChange = e => {
        this.setState({
            search: e.target.value
        })
    }


    render() {
    return (
      <div>
        <form>
            <div>
                <div>
                    <input
                        type="text"
                        value="this.state.search"
                        onChange="this.handleChange"
                    />
                <div>
                    <button className="btn-large blue">Search</button>
                </div>
                </div>
            </div>
        </form>
      </div>
    )
  }
}

export default searchComponent;