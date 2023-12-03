import { fetchApi, fetchWorks, addWork } from "./api.js";
import { showWork } from './gallery.js';

export function addFile() {
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
        imgUpload.src = src;
        imgUpload.style.display = "none";

      });  
}

export function addPhoto() {
    const addPhotoBtn = document.querySelector("#add_work");
    const modaleEdit = document.querySelector("#div_gallery");
    const addPicture = document.querySelector("#add_picture");
    const btnBack = document.querySelector("#back_mark")
    addPhotoBtn.addEventListener("click", () => {
        modaleEdit.style.display = "none";
        addPicture.style.display = "flex";
        btnBack.style.visibility = "visible"
    });
}


export function addElement(token){
    const confirmButton = document.querySelector("#confirm_add_pic");
    const imgUpload = document.querySelector("#select_pic img");
    const titleUpload = document.querySelector("#title_add_pic");
    const categoryUpload = document.querySelector("#categorie_select");
    const fileInput = document.querySelector("#file_input");
    let selectedFile; 
    let src;
    fileInput.addEventListener("change", (event) => {
        selectedFile = event.target.files[0];
        src =  URL.createObjectURL(selectedFile)
        imgUpload.src = src
        imgUpload.style.display = "flex";

      });

    confirmButton.addEventListener("click",  async () => {
        let title = titleUpload.value;
        let categorie = categoryUpload.value;
        const formData = new FormData();
            formData.append('title', title);
            formData.append('category',categorie);
            formData.append('image', fileInput.files[0]);
        try {
            await addWork(token, formData);
            const apiWorks = await fetchWorks();
            showWork(apiWorks);
        } catch (error) {
            console.error("erreur", error);
        }
        src = "";
        imgUpload.name = "";
        selectedFile = null;
        imgUpload.src = "./assets/icons/picture-svgrepo-com 1.png";
        titleUpload.value = "";
        categoryUpload.value = "";
        fileInput.value = "";

    });
}