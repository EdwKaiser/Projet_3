


function isAuthenticated() {
    let token = localStorage.getItem("token");
    let authenticate = false;
    if(token !== "" && token !== null) {
        authenticate = true;
    }else{
        authenticate = false;
    }
    return authenticate
}

function editBtn(balise) {
    const baliseSelect = document.querySelector(balise);
    const edit = `
        <div id = "edit">
            <img src ="./assets/icons/Group.png">
            <p>Mode édition</p>
        </div>
    `
    baliseSelect.insertAdjacentHTML("beforeend", edit);    
}

function afterLoginModale() {
    const body = document.querySelector("body")
    const header = document.querySelector("header")
    const divModale = `
        <div id = "div_modale">
            <div id = "modale">
                <img src ="./assets/icons/Vector.png">
                <p>Mode édition</p>
            </div>
            <div>
                <button id = "publish_changes">Publier les changements</button>
            </div> 
        </div>        
        `
    header.setAttribute("style", "margin-top: 90px;")
    body.insertAdjacentHTML("afterbegin", divModale)
}

function loginLogout(){
    const btnLogin = document.querySelector("header #login_logout")
    btnLogin.textContent = "logout"
    btnLogin.addEventListener("click", () => {
        window.localStorage.clear()
    })
    
}
if(isAuthenticated()) {
    afterLoginModale();
    editBtn("#introduction figure");
    editBtn("#titleProjet");
    loginLogout();
}

