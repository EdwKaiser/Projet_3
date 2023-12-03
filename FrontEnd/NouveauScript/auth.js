export function getToken() {
    let token = localStorage.getItem("token")
    return token;
}

export function isAuthenticated() {
    let token = localStorage.getItem("token");
    let authenticate = false;
    if(token !== "" && token !== null) {
        authenticate = true;
    }else{
        authenticate = false;
    }
    return authenticate
}