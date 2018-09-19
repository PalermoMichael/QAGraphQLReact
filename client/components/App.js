import React from 'react';
import Navbar from './Navbar';
// import Header from './Header';

const App = (props) => {
    //materialize assumes a root component with className of container
    return <div className="container"> 
        {/*<Header />*/}
            <Navbar />
                {props.children}
            
                
        </div>
}

export default App;
