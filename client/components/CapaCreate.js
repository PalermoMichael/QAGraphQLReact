import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
import fetchCapasQuery from '../queries/fetchCapas';
import addCapa from '../queries/addCapa';

class CapaCreate extends Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        return (            
              <div className="progress">
                <div className="indeterminate"></div>
             </div>
            );
    }
}

export default CapaCreate;