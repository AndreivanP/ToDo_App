import React, { Component } from "react";

class ListTodosCompoment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos:
                [
                    { id: 1, description: 'Learn React', done: false, targetDate: new Date() },
                    { id: 2, description: 'Learn Xablau', done: false, targetDate: new Date() },
                    { id: 3, description: 'Learn everything', done: false, targetDate: new Date() }
                ]
        }
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


export default ListTodosCompoment