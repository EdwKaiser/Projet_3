import { fetchWorks, fetchCategories } from './api.js';
import { getToken, isAuthenticated } from './auth.js';
import { showWork } from './gallery.js';
import { filterCategory, addOptionCategory} from './filter.js';
import { editBtn, afterLoginModale, loginLogout, editMode, deleteWork } from './editMode.js';
import { addFile, addPhoto, addElement } from './addProject.js';


try{
    const apiWorks =  await fetchWorks("works");
    const apiCategories = await fetchCategories("categories");
    const token = getToken()
    if(isAuthenticated()){
        afterLoginModale();
        editBtn("#introduction figure");
        editBtn("#titleProjet");
        loginLogout();
        editMode(apiWorks);
        addPhoto()
        addFile() 
        addElement(token)
    }
    addOptionCategory(apiCategories);
    showWork(apiWorks);
    filterCategory(apiWorks,apiCategories, showWork);
}catch(error){
    console.log(error);
}
