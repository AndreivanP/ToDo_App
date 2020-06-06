import axios from "axios";

const authProperty = 'authenticatedUser'; 

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
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));
    }

    logout() {
        sessionStorage.removeItem(authProperty);
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