import axios from "axios";

const authProperty = 'authenticatedUser'; 
const passProperty = 'passwordUser';

class AuthenticationService {   

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password);
    }
    
    executeBasicAuthenticationService(username, password) {
        return axios.get('http://localhost:8080/basicauth', 
            {headers: {authorization: this.createBasicAuthToken(username, password)}});
    }

    registerSuccessfulLogin(username, password) {           
        sessionStorage.setItem(authProperty, username);
        sessionStorage.setItem(passProperty, password); 
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));
    }

    logout() {
        sessionStorage.removeItem(authProperty);
        sessionStorage.removeItem(passProperty);
    }

    isUserLoggedIn() {        
        let user = sessionStorage.getItem(authProperty);        
        if(user === null) {
            return false
        } else {
            return true
        }        
    }

    getLoggedInUserName() {        
        let user = sessionStorage.getItem(authProperty);        
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

    setupAxiosInterceptors(basicAuthHeader) {
        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()) {
                    config.headers.authorization = basicAuthHeader
                }
                return config
            }
        )
    }


}

export default new AuthenticationService();