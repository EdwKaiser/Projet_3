import { fetchApi } from "./script.js";


function createElementWork(worksList, idForDelet) {
    
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
        createElementWork(worksList[i], idForDelet);
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


