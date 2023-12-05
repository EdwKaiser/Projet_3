export async function fetchWorks() {
    try {
        const response = await fetch("http://localhost:5678/api/works");
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function fetchCategories() {
    try {
        const response = await fetch("http://localhost:5678/api/categories");
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

export async function fetchApi(list) {
    try{
        const response = await fetch("http://localhost:5678/api/" + list);
        const data = await response.json();
        return data
    }catch(error) {
        console.log(error)
    }
}
export async function addWork(token, formData) {
    try{
        await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`   
            },
            body: formData
            })
                .then((res) => {
                    if(res.ok) {
                        console.log('succes ', res.status)
                    }else{
                        throw new Error ('Error', res.status)
                    }
                })
                .catch((error) =>{
                    console.log(error)
                })

    } catch(error) {
        console.log(error);
    }
}