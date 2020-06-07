import axios from "axios"
import AuthenticationService from "../../components/todo/AuthenticationService";

class TodoDataService {
    retrieveAllTodos(username, password) {
        return axios.get(`http://localhost:8080/users/${username}/todos`, 
            {headers: {authorization: AuthenticationService.createBasicAuthToken(username, password)}});
    }

    deleteTodo(name, id) {
        return axios.delete(`http://localhost:8080/users/${name}/todos/${id}`);
    }

    retrieveTodo(name, id) {
        return axios.get(`http://localhost:8080/users/${name}/todos/${id}`);
    }

    updateTodo(name, id, todo) {
        return axios.put(`http://localhost:8080/users/${name}/todos/${id}`, todo);
    }

    createTodo(name, todo) {
        return axios.post(`http://localhost:8080/users/${name}/todos`, todo);
    }
}

export default new TodoDataService();