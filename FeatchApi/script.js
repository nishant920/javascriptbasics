const factBtn = document.getElementById("fact-btn"); 
const factContainer = document.getElementById("fact-container");
const BASE_URL= "https://api.api-ninjas.com/v1/";

async function fetchFactOfTheDay(){
    try{
        const response = await fetch(`${BASE_URL}factoftheday`, {
           method: "GET",
           headers: {
           "X-API-Key" :"xXepy7W2d9oPIwFQ6u6z8J5d1SCfJptTdkGLcU1Y"
          }
         });
        if(!response.ok){
            // response.ok is true only for status codes 200-299
            // this block runs for 401, 404, 500, etc.
            throw new Error(`Request Failed: ${response.status}`);

        } 
        const data = await response.json();
        console.log(data);
        const fact = data[0].fact;
        console.log(fact);
        factContainer.innerHTML = `<p>${fact}</p>`;
    }catch(error){
        console.log(error);
        factContainer.innerText="fail to load"
    }
    
}

factBtn.addEventListener("click", fetchFactOfTheDay);

/*
textContent vs innerHTML vs innerText
textContent — plain text, no HTML parsing, no rendering awareness. Safest default for API-returned text.
innerHTML — parses the string as HTML. Risky if the content isn't trusted (injection risk).
innerText — like textContent but rendering-aware (slower, respects CSS visibility). Pick one and use it consistently across success/failure paths.
*/