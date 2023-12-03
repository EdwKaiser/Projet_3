import { fetchApi } from './api.js';
import {  showWorkEdit, showWork } from "./gallery.js";

export function editBtn(elementSelector) {
    const selectedElement = document.querySelector(elementSelector);
    const edit = `
        <div id = "edit">
            <img src ="./assets/icons/Group.png">
            <p>Mode édition</p>
        </div>
    `
    selectedElement.insertAdjacentHTML("beforeend", edit);    
}

export function afterLoginModale() {
    const body = document.querySelector("body")
    const header = document.querySelector("header")
    const modalContent = `
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
    header.classList.add("header_edit");
    body.insertAdjacentHTML("afterbegin", modalContent)
}


export function loginLogout(){
    const loginButton = document.querySelector("header #login_logout")
    loginButton.textContent = "logout"
    loginButton.addEventListener("click", () => {
        window.localStorage.clear()
    })
}
function quitEditMode(btnQuit,divNone) {
    btnQuit = document.querySelector(btnQuit);
    divNone = document.querySelector(divNone);
    btnQuit.addEventListener("click", () => {
        divNone.style.display = "none";
    })
}
function backEditMode(backMark) {
    const btnBack = document.querySelector(backMark);
    const addPicturePage = document.querySelector("#add_picture")
    const divGalleryPage = document.querySelector("#div_gallery")
    btnBack.addEventListener("click", () => {
        btnBack.style.visibility= "hidden";
        divGalleryPage.style.display= "flex";
        addPicturePage.style.display = "none";
    })

}
export function editMode() {
    const overlay = document.querySelector("#overlay");
    const btnEdit = document.querySelector("#portfolio #edit");
    const divGallery = document.querySelector("#div_gallery");
    const addPicture = document.querySelector("#add_picture");
    btnEdit.addEventListener("click", async () => {
        overlay.style.display = "flex";
        divGallery.style.display = "flex";
        addPicture.style.display = "none";
    try{
        const apiWorks =  await fetchApi("works");
        showWorkEdit(apiWorks);
    }catch(error){
        throw error;
    }
    const galleryEdit = document.querySelector("#gallery_edit")
    galleryEdit.addEventListener("click", deleteWork)
    quitEditMode("#xmark", "#overlay")
    backEditMode("#back_mark")
    })
}


export async function deleteWork(event){
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
                showWorkEdit(await fetchApi("works"));
                showWork(await fetchApi("works"));
            }catch(error){
                throw error
            }    
        }
    }
}