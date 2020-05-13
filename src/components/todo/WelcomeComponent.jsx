import React, { Component } from "react";
import { Link } from 'react-router-dom'

class WelcomeComponent extends Component {
    render() {
        return (
            <div className="text-center">
                <h1>Welcome!</h1>
                <div>
                    Welcome {this.props.match.params.name}. You can manage your todos <Link to="/todos">here</Link>
                </div>
            </div>
        )
    }
}

export default WelcomeComponent