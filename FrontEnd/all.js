

export async function fetchApi(liste) {
    try{
        const reponse = await fetch("http://localhost:5678/api/" + liste);
        const data =  await reponse.json()
        return data
    } catch (error) {
        throw error
    }
}


export function getToken() {
    let token = localStorage.getItem("token")
    return token;
}
function createElementWork(worksList) {
    
    //récupération de la balise qui va contenir le projet (image + titre)

    const gallery = document.querySelector(".gallery");
    
    // création des balises html pour ajouter le projet 

    const figureElement = document.createElement("figure");
    const imgElement = document.createElement("img");
    imgElement.src = worksList.imageUrl;
    imgElement.alt = worksList.title;
    const figcaptionElement = document.createElement("figcaption");
    figcaptionElement.innerText = worksList.title;

    //on ajoute l'élément sur la page html
    gallery.appendChild(figureElement);
    figureElement.appendChild(imgElement);
    figureElement.appendChild(figcaptionElement);

}


function showWork(worksList) {
    document.querySelector(".gallery").innerHTML =""
    for(let i = 0; i < worksList.length ; i++) {
        createElementWork(worksList[i]);
    };
};


/* Fonction qui gère la partie des filtres */
function filterCategorie(apiWorks,apiCategories){
    /* On récupère les balises button qui corresponde aux filtres et on ajoute un évènement click pour chaque button*/
    const allBtnFilter = document.querySelectorAll("#portfolio button");
    for(let i = 0; i < allBtnFilter.length; i++){
        allBtnFilter[i].addEventListener("click", () => {
            let btnClick = allBtnFilter[i];
            /* On gère le changement de couleur quand on click sur un button (coloré pour ceux qui sont séléctionnés)*/
            for( let x = 0; allBtnFilter.length; x++){
                if(btnClick === allBtnFilter[x]){
                    btnClick.style.backgroundColor = "rgba(29, 97, 84, 1)";
                    btnClick.style.color = "white";
                }else if(allBtnFilter[x] === undefined){
                    break
                }else{
                    /*(Et blanc pour ceux qui ne sont pas séléctionnés)*/
                    allBtnFilter[x].style.backgroundColor = "white";
                    allBtnFilter[x].style.color = "rgba(29, 97, 84, 1)";
                }
            }
            /* Déclaration de la variable "id" qui va nous permettre de travailler sur les id de catégories pour les filtres*/
            let id;
            /* Partie de la fonction qui va afficher les projets en fonction de leur id*/
            if(allBtnFilter[i].innerText === "Tous"){
                showWork(apiWorks);
            }else{
                /* On récupère l'id des projets qui est associé au bouton filtre qui à été click */
                for(let y = 0; y < apiCategories.length ; y++) {
                    if(apiCategories[y].name === allBtnFilter[i].innerText || apiCategories[y].name === 'Hotels & restaurants') {
                        id = apiCategories[y].id;
                        break
                    }
                };
                /* Avec l'id récupéré on créer une nouvelle liste en appelant la fonction filter qui retournera les projets avec l'id correspondant récupéré juste avant */
                let workFilter = apiWorks.filter(function (work){
                    return work.categoryId === id;
                });
                /* On affiche la nouvelle liste */
                showWork(workFilter);
            };
        });
    }
}

function addOptionCategories(listeCategories){
    const selectCategories = document.querySelector("#categorie_select");
    for(let i = 0; i < listeCategories.length; i++) {
        let optionSelect = document.createElement("option");
        let id = listeCategories[i].id;
        let name = listeCategories[i].name;

        optionSelect.value = id 
        optionSelect.innerText = id + " - " + name
        selectCategories.appendChild(optionSelect)
        console.log(optionSelect)
    }
} 


try{
    const apiWorks =  await fetchApi("works");
    const apiCategories = await fetchApi("categories");
    filterCategorie(apiWorks,apiCategories)
    showWork(apiWorks);
    addOptionCategories(apiCategories)
}catch(error){
    throw error;
}





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




function createElementWorkbis(worksList, idForDelet) {
    
    //récupération de la balise qui va contenir le projet (image + titre)

    const gallery = document.querySelector("#gallery_edit");
    
    // création des balises html pour ajouter le projet 

    const figureElement = document.createElement("figure");
    const trashElement = document.createElement("img");
    const divTrash = document.createElement("div");
    const imgElement = document.createElement("img");
    imgElement.src = worksList.imageUrl;
    divTrash.id = idForDelet
    divTrash.classList.add("trash")
    trashElement.classList.add("trash")
    trashElement.id = idForDelet
    trashElement.src="./assets/icons/trash-can-solid.png";
    imgElement.alt = worksList.title;

    const figcaptionElement = document.createElement("figcaption");
    figcaptionElement.innerText = "éditer";

    //on ajoute l'élément sur la page html
    gallery.appendChild(figureElement);
    figureElement.appendChild(imgElement);
    figureElement.appendChild(divTrash)
    divTrash.appendChild(trashElement)
    figureElement.appendChild(figcaptionElement);

}

function showWork(worksList) {
    document.querySelector("#gallery_edit").innerHTML ="";
    let idForDelet;
    for(let i = 0; i < worksList.length ; i++) {
        idForDelet = worksList[i].id
        createElementWorkbis(worksList[i], idForDelet);
    };
};



function editMode() {
    const overlay = document.querySelector("#overlay");
    const btnEdit = document.querySelector("#portfolio #edit");
    const divGallery = document.querySelector("#div_gallery");
    const addPicture =document.querySelector("#add_picture");
    btnEdit.addEventListener("click", async () => {
        overlay.setAttribute("style", "display:flex;")
        divGallery.setAttribute("style", "display:flex;")
        addPicture.setAttribute("style", "display:none;")
    try{
        const apiWorks =  await fetchApi("works");
        showWork(apiWorks)
    }catch(error){
        throw error;
    }
    const galleryEdit = document.querySelector("#gallery_edit")
    galleryEdit.addEventListener("click", deleteWork)
    quitEditMode("#xmark img", "#overlay")
    })
}
function quitEditMode(btnQuit,divNone) {
    btnQuit = document.querySelector(btnQuit);
    divNone = document.querySelector(divNone);
    btnQuit.addEventListener("click", () => {
        divNone.setAttribute("style", "display:none;")
    })
}
async function deleteWork(event){
    if(event.target.classList.contains("trash")) {
        const projectId = event.target.id;
        const token = window.localStorage.getItem("token");

        const url = `http://localhost:5678/api/works/${projectId}`
        const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer le projet ' + projectId + ' ?');
        if(confirmation){
            try{

                await fetch(url, {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}`} 
                })
                showWork(await fetchApi("works"))


            }catch(error){
                throw error
            }    
        }
    }
}

editMode()


function quitEditMode(btnQuit,divNone) {
    const btn = document.querySelector(btnQuit);
    const div = document.querySelector(divNone);
    btn.addEventListener("click", () => {
        div.setAttribute("style", "display:none;")
    })
}

function addFile() {
    const fileInput = document.querySelector("#file_input");
    const btnUpload = document.querySelector("#select_pic button");
    const imgUpload = document.querySelector("#select_pic img");
    btnUpload.addEventListener("click", () => {
        fileInput.click();
      });
    fileInput.addEventListener("change", (event) => {
        const selectedFile = event.target.files[0];
        console.log(selectedFile)
        const src =  URL.createObjectURL(selectedFile)
        const name = selectedFile.name;
        const type = selectedFile.type;
        imgUpload.name = name;
        imgUpload.type = type;
        imgUpload.src = src
        imgUpload.setAttribute("style", "display:flex;")

      });  
}

function ajouterPhoto() {
    const btnAjouterPhoto = document.querySelector("#add_work");
    const modaleEdit = document.querySelector("#div_gallery");
    const addPicture = document.querySelector("#add_picture")
    btnAjouterPhoto.addEventListener("click", () => {
        modaleEdit.setAttribute("style", "display:none;")
        addPicture.setAttribute("style", "display:flex;")
    })
}


function addElement(){
    const btnValider = document.querySelector("#confirm_add_pic");
    const imgUpload = document.querySelector("#select_pic img");
    const titleUpload = document.querySelector("#title_add_pic");
    const categorieUpload = document.querySelector("#categorie_select");
    const fileInput = document.querySelector("#file_input");
    const btnUpload = document.querySelector("#select_pic button");
    let selectedFile; 
    fileInput.addEventListener("change", (event) => {
        selectedFile = event.target.files[0];
        const src =  URL.createObjectURL(selectedFile)

        imgUpload.src = src
        imgUpload.setAttribute("style", "display:flex;")
      });

    btnValider.addEventListener("click",  async () => {
        let token = getToken();
        let title = titleUpload.value;
        let categorie = categorieUpload.value;
        const formData = new FormData();
            formData.append('title', title);
            formData.append('category',categorie);
            formData.append('image', fileInput.files[0]);
        for (const value of formData.values()) {
                console.log(value);
              }

        try {
            const response = await fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`   
                },
                body: formData
            });
        } catch (error) {
            console.error("erreur", error);
        }

        imgUpload.src = "";
        titleUpload.value = "";
        categorieUpload.value = "";
    });
}



ajouterPhoto()
addFile() 
addElement()
quitEditMode("#xmark img", "#add_picture")


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