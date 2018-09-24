import React, { Component } from 'react';
import addLotToDeviation from "../queries/addLotToDeviation";
import { graphql } from 'react-apollo';

class LotCreate extends Component {
    constructor(props){
        super(props);

        this.state = { contents: '' };
    }

    onSubmit(event) {
        event.preventDefault();

        this.props.mutate({
            variables: {
            contents: this.state.contents,
            deviationId: this.props.deviationId
           }
        }).then(() => this.setState({ contents: '' }));
        console.log(this.data);
    }

    render(){
        return(
            <div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Add Impacted Lot Number to Deviation</label>
                    <input
                    value={this.state.contents}
                    onChange={event => this.setState({ contents: event.target.value })}
                    />
                </form>
            </div>

        );
    }
}

export default graphql(addLotToDeviation)(LotCreate);