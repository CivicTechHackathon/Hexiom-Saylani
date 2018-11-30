import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LogIn from '../Authentication/LogIn'
import Info from '../Screen/Information/Info'
import User from '../Component/Swipe'
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
                        <Route exact path="/" component={LogIn} />
                        <Route  path="/info" component={Info} />
                        <Route  path='/user' component={User} />
                    </div>
                    {/* <hr /> */}

                    {/* <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/topics" component={Topics} /> */}
                </div>
            </Router>
        )
    }

}
export default Routers;