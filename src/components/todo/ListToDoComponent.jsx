import React, { Component } from "react";
import TodoDataService from "../../api/todo/TodoDataService";
import AuthenticationService from "./AuthenticationService.js"

class ListTodosCompoment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos:
                [
                    // { id: 1, description: 'Learn React', done: false, targetDate: new Date() },
                    // { id: 2, description: 'Learn Xablau', done: false, targetDate: new Date() },
                    // { id: 3, description: 'Learn everything', done: false, targetDate: new Date() }
                ]
        }
    }

    componentDidMount() {
        let username = AuthenticationService.getLoggedInUserName();
        TodoDataService.retrieveAllTodos(username)
        .then(
            response => {
                this.setState({todos : response.data})
            }
        )
    }

    render() {
        return (        
            <div className="text-center">
                <h1>List Todos</h1>
                <div >
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Description</th>
                                <th>Is Completed?</th>
                                <th>Target Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                    todo =>
                                        <tr key={todo.id}>
                                            <td>{todo.id}</td>
                                            <td>{todo.description}</td>
                                            <td>{todo.done.toString()}</td>
                                            <td>{todo.targetDate.toString()}</td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
        
}

export default ListTodosCompoment