import React, { Component } from "react";
import AuthenticationService from "./AuthenticationService";

class LoginComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: 'in28minutes',
            password: '',
            hasLoginFailed: false,
            showSuccesMessage: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);

    }

    handleChange(event) {
        //console.log(this.state);
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    loginClicked() {
        AuthenticationService.executeJwtAuthenticationService(this.state.username, this.state.password)
            .then( (response) => {
                AuthenticationService.registerSuccessfulLoginJwt(this.state.username, response.data.token)
                this.props.history.push(`/welcome/${this.state.username}`)                
            }).catch( () => {
                this.setState({ showSuccesMessage: false })
                this.setState({ hasLoginFailed: true })
            })
    }

    render() {
        return (
            <div className="text-center">
                <h1 >Login</h1>
                <div >
                    {/* <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}></ShowInvalidCredentials>
                    <ShowLoginSuccesMessage showSuccesMessage={this.state.showSuccesMessage}></ShowLoginSuccesMessage> */}
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                    {this.state.showSuccesMessage && <div>Login Sucessful</div>}
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}></input>
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}></input>
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        )
    }
}

// function ShowInvalidCredentials(props) {    
//     if(props.hasLoginFailed) {        
//         return <div>Invalid Credentials</div>
//     }
//     return null        
// }

// function ShowLoginSuccesMessage(props) {    
//     if(props.showSuccesMessage) {        
//         return <div>Login Sucessful</div>
//     }
//     return null        
// }

export default LoginComponent