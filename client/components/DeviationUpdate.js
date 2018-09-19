import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import fetchDeviationQuery from "../queries/fetchDeviation";
import updateDeviation from "../queries/updateDeviation";


class DeviationUpdate extends Component {
  constructor(props) {
    super(props);  
    this.state = { status: props.status }
         }
  
  onSubmit(event) {
    // debugger;
    event.preventDefault();
    
    this.props.mutate({
      variables: {
        status: this.state.status,
        id: this.props.params.id
      },
      refetchQueries: [{ query: fetchDeviationQuery,
                         variables: {
                            id: this.props.params.id
                          } }],
      awaitRefetchQueries: true
    }).then(() => hashHistory.push(`/deviations/${this.props.data.deviation.id}`))
  }
    
  render() {
    const deviation = this.props.data.deviation;
    
    
    if(this.props.data.loading) {
      return <p>...Loading...</p>
    }
    
    console.log(deviation);

    return (
     <div>
      <form className="row" onSubmit={ this.onSubmit.bind(this) }>
        <div>{ deviation.title }</div>
          <div className="row">status: { deviation.status }</div>
        <div className="col m4">
          <label>Status:</label>
            <select className="browser-default"
              onChange={event => this.setState({ status: event.target.value })}                         
              value={ this.state.status }>
              <option>Status</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
              <option value="Void">Void</option>
            </select>
        </div>
        <div className="button-submit col s12">
            <button className="btn-large green lighten-2 waves-effect waves-blue z-depth-5" type="submit">
                  Submit
            <i className="material-icons right">send</i>
            </button>
        </div>
      </form>
    </div>
    )
  }
}


export default compose(
  graphql(updateDeviation, {
  options: (props) => {
    return {
      variables: {
        id: props.params.id
      }
    }
  }
}),
  graphql(fetchDeviationQuery, {
    options: (props) => {
      return {
        variables: {
          id: props.params.id
        }
      }
    }
  }))(DeviationUpdate)
;
