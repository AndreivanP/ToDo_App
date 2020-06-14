import axios from "axios"
import AuthenticationService from "../../components/todo/AuthenticationService";
import { API_URL, JPA_API_URL } from "../../Properties"

class TodoDataService {
    retrieveAllTodos(username, password) {        
        return axios.get(`${API_URL}/users/${username}/todos`, 
            {headers: {authorization: AuthenticationService.createBasicAuthToken(username, password)}});
    }

    deleteTodo(name, id) {
        return axios.delete(`${API_URL}/users/${name}/todos/${id}`);
    }

    retrieveTodo(name, id) {        
        return axios.get(`${API_URL}/users/${name}/todos/${id}`);
    }

    updateTodo(name, id, todo) {
        return axios.put(`${API_URL}/users/${name}/todos/${id}`, todo);
    }

    createTodo(name, todo) {
        return axios.post(`${API_URL}/users/${name}/todos`, todo);
    }
}

export default new TodoDataService();