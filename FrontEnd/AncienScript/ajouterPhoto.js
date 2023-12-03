import { getToken } from "./script.js";

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

