import React, { Component } from 'react';
import { Router, Route, Link } from "react-router-dom";
// import LogIn from '../Screen/login'
import history from '../History/History'


class Routers extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <Router history={history}>
                <div>
                    <div>
                        {/* <Route exact path="/" component={LogIn} /> */}
                    </div>
                </div>
            </Router>
        )
    }

}
export default Routers;