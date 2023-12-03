export function errorLogin(inputEmail, inputPassword, parentElement) {
    const msgError = document.createElement("p")
    msgError.classList.add("error")
    msgError.innerText = "Error in the username or password" 
    parentElement.appendChild(msgError)
    inputEmail.classList.add("input_error")
    inputPassword.classList.add("input_error")
}
export function login() {
    const submitForm = document.querySelector("form");
    submitForm.addEventListener("submit", async (event) => {
        const divError = document.querySelector("#error");
        divError.innerHTML=""
        event.preventDefault();

        const url = 'http://localhost:5678/api/users/login';

        let login = {
            email: submitForm.email.value,
            password: submitForm.password.value,
            };

        login = JSON.stringify(login)
              
        try{
            const response = await fetch(url, {
                method: "POST",
                headers: { 
                    'accept': 'application/json',
                    'Content-Type': 'application/json' },
                body: login
            });

            if (response.ok){
                const data = await response.json()
                window.localStorage.setItem("token", data.token)
                window.location.href="index.html"
                submitForm.email.value = "";
                submitForm.password.value = "";

            }else{
                errorLogin(submitForm.email,submitForm.password, divError)
                throw new Error("Error in the username or password")
            }
        } catch(error) {
            throw new Error("Error in the username or password")
        }
    })
}