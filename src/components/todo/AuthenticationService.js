import axios from "axios";
import { API_URL } from "../../Properties"

const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'; 
const passProperty = 'passwordUser';

class AuthenticationService {   

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password);
    }
    
    executeBasicAuthenticationService(username, password) {
        return axios.get(`${API_URL}/basicauth`, 
            {headers: {authorization: this.createBasicAuthToken(username, password)}});
    }

    executeJwtAuthenticationService(username, password) {
        return axios.post(`${API_URL}/authenticate`, {
            username,
            password
        })            
    }

    registerSuccessfulLoginJwt(username, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createJwtToken(token));
    }

    createJwtToken(token) {
        return 'Bearer ' + token
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        sessionStorage.removeItem(passProperty);
    }

    isUserLoggedIn() {        
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);        
        if(user === null) {
            return false
        } else {
            return true
        }        
    }

    getLoggedInUserName() {        
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);        
        if(user === null) {
            return ""
        } else {
            return user
        }        
    }

    getLoggedInPassword() {        
        let password = sessionStorage.getItem(passProperty);        
        if(password === null) {
            return ""
        } else {
            return password
        }        
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
}

export default new AuthenticationService();