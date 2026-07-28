function fakeFetchUser(){
    return new Promise((resolve, reject) => {
        const sucess = true;

        setTimeout(() => {
            if(sucess){
                resolve({
                    name: "Nishant",
                    role: "frontend devloper",
                    status: "Active"
                });
            }else{
                reject("Failed to load user");
            } 
        }, 2000);
    })
}

fakeFetchUser().then((user)=>{
    console.log(user);
}).catch((error) => {
    console.log(error)
})

async function loadUser() {
    try{
        const user = await fakeFetchUser();
        console.log(user);
    }catch(error){
        console.log(error);
    }
}

loadUser();