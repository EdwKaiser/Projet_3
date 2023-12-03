
function errorLogin(inputEmail, inputPassword, parentBalise) {
    const msgError = document.createElement("p")
    msgError.setAttribute("style","color:red;")
    msgError.innerText = "Erreur dans l'identifiant ou le mot de passe" 
    parentBalise.appendChild(msgError)
    inputEmail.setAttribute("style", "box-shadow: 0px 0px 10px red")
    inputPassword.setAttribute("style", "box-shadow: 0px 0px 10px red")
}
function login() {
    const btnSubmit = document.querySelector("form");
    btnSubmit.addEventListener("submit", async (event) => {
        const divError = document.querySelector("#error");
        divError.innerHTML=""
        event.preventDefault();

        const url = 'http://localhost:5678/api/users/login';

        let login = {
            email: btnSubmit.email.value,
            password: btnSubmit.password.value,
            };

        login = JSON.stringify(login)


        try{
            const reponse = await fetch(url, {
                method: "POST",
                headers: { 
                    'accept': 'application/json',
                    'Content-Type': 'application/json' },
                body: login
            });

            if (reponse.ok){
                const data = await reponse.json()
                window.localStorage.setItem("token", data.token)
                window.location.href="index.html"
                btnSubmit.email.value = "";
                btnSubmit.password.value = "";

            }else{
                errorLogin(btnSubmit.email,btnSubmit.password, divError)
                throw new Error("Erreur dans l'identifiant ou le mot de passe")
            }
        } catch(error) {
            throw new Error("Erreur dans l'identifiant ou le mot de passe")
        }
    })
}
//sophie.bluel@test.tld S0phie