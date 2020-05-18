import React, { Component } from "react";
import { Link } from 'react-router-dom'
import HelloWorldService from '../../api/todo/HelloWorldService.js'

class WelcomeComponent extends Component {
    constructor(props) {
        super(props)
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
        this.state = {
            welcomeMessage : ""
        }
    }

    render() {
        return (
            <div className="text-center">
                <h1>Welcome!</h1>
                <div>
                    Welcome {this.props.match.params.name}.
                    You can manage your todos <Link to="/todos">here</Link>
                </div>
                <div>
                   Click here to get a customized welcome message.
                   <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Get Welcome</button>
                </div>
                <div>
                   {this.state.welcomeMessage}
                </div>
            </div>
        )
    }

    retrieveWelcomeMessage() {
        HelloWorldService.executeHelloWorldService()
        .then(response => this.handleSuccessfulResponse(response))
        //.catch()
    }

    handleSuccessfulResponse(response) {
        this.setState({welcomeMessage: response.data});

    }
}

export default WelcomeComponent