import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import AuthenticatedRoute from './AuthenticateRoute.jsx'
import LoginComponent from './LoginComponent'
import ListTodosCompoment from './ListToDoComponent'
import HeaderComponent from './HeaderComponent'
import WelcomeComponent from './WelcomeComponent'
import FooterComponent from './FooterComponent'
import LogoutComponent from './LogoutComponent'
import ErrorComponent from './ErrorComponent'
// import AuthenticationService from "./AuthenticationService";

class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <>
                        <HeaderComponent/>
                            <Switch>
                                <Route path="/" exact component={LoginComponent}/>
                                <Route path="/login" component={LoginComponent}/>
                                <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                                <AuthenticatedRoute path="/todos/" component={ListTodosCompoment}/>
                                <AuthenticatedRoute path="/logout/" component={LogoutComponent}/>
                                <Route component={ErrorComponent}/>
                            </Switch>
                        <FooterComponent/>
                    </>
                </Router>
                {/* <LogingComponent/>
                 <WelcomeComponent/> */}
            </div>
        )
    }
}

// class HeaderComponent extends Component {    
//     render() {
//         let isUserLoggedIn = AuthenticationService.isUserLoggedIn();
//         console.log("HeaderComponent");
//         console.log(isUserLoggedIn);
//         return (
//             <header>
//                 <nav className="navbar navbar-expand-md navbar-dark bg-dark">
//                     <div><a href="http://www.in28minutes.com" className="navbar-brand">in28Minutes</a></div>
//                     <ul className="navbar-nav">
//                         {isUserLoggedIn && <li ><Link className="nav-link" to="/welcome/in28Minutes">Home</Link></li>}
//                         {isUserLoggedIn && <li ><Link className="nav-link" to="/todos">Todos</Link></li>}
//                     </ul>
//                     <ul className="navbar-nav navbar-collapse justify-content-end">
//                         {!isUserLoggedIn && <li ><Link className="nav-link" to="/login">Login</Link></li>}
//                         {isUserLoggedIn && <li ><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
//                     </ul>
//                 </nav>
//             </header>
//         );
//     }
// }

export default TodoApp