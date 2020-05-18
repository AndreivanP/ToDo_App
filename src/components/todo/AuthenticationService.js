
const authProperty = 'authenticatedUser'; 

class AuthenticationService {   


    registerSuccessfulLogin(username, password) {           
        sessionStorage.setItem(authProperty, username);
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

}

export default new AuthenticationService();