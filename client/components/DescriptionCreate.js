import React, { Component } from 'react';
import addDescriptionToDeviation from "../queries/addDescriptionToDeviation";
import { graphql } from 'react-apollo';

class DescriptionCreate extends Component {
    constructor(props){
        super(props);

        this.state = { text: '' };
    }

    onSubmit(event) {
        event.preventDefault();

        this.props.mutate({
            variables: {
            text: this.state.text,
            deviationId: this.props.deviationId
           }
        }).then(() => this.setState({ text: ''}));
    }

    render(){
        return(
            <div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Description</label>
                    <textarea
                    value={this.state.text}
                    onChange={event => this.setState({ text: event.target.value })}
                    />
                    <div>
                    <button className="btn-small blue lighten-2 waves-effect waves-blue z-depth-5" type="submit">
                                Add
                                <i className="material-icons right">send</i>
                    </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default graphql(addDescriptionToDeviation)(DescriptionCreate);