/* Fonction qui gère la partie des filtres */
export function filterCategory(apiWorks,apiCategories,showWork){
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


export function addOptionCategory(listCategories){
    const selectCategories = document.querySelector("#categorie_select");
    console.log(selectCategories)
    for(let i = 0; i < listCategories.length; i++) {
        let optionSelect = document.createElement("option");
        let id = listCategories[i].id;
        let name = listCategories[i].name;

        optionSelect.value = id 
        optionSelect.innerText = id + " - " + name
        selectCategories.appendChild(optionSelect)
    }
} 