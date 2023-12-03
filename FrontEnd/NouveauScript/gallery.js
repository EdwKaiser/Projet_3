

export function createElementWork(worksList) {
    
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

export function showWork(worksList) {
    document.querySelector(".gallery").innerHTML ="";
    for(let i = 0; i < worksList.length ; i++) {
        createElementWork(worksList[i]);
    };
};

export function createElementWorkEdit(worksList, idForDelet) {
    
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

export function showWorkEdit(worksList) {
    document.querySelector("#gallery_edit").innerHTML ="";
    let idForDelet;
    for(let i = 0; i < worksList.length ; i++) {
        idForDelet = worksList[i].id
        createElementWorkEdit(worksList[i], idForDelet);
    };
};
