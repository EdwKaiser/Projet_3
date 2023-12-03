

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
