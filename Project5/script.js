const searchBox = document.querySelector(".search-box");

searchBox.addEventListener("input", function(){
    const searchText = searchBox.value.toLowerCase();
    const moviesSection = document.querySelectorAll(".movies-section");

    moviesSection.forEach(function(section){
        const movieCards = section.querySelectorAll(".movie-card");
        const noResult = section.querySelector(".no-results");
        let visibleCount = 0;
    

    movieCards.forEach(function(card){
        const movieTitle = card.querySelector("h3").textContent.toLowerCase();
    
    if(movieTitle.includes(searchText)){
        card.classList.remove("hidden");
        visibleCount++;
        console.log("Total number of movies for this search", visibleCount);
    }else {
        card.classList.add("hidden");
    }
  });
  if(visibleCount === 0){
    noResult.style.display = "block";
  } else{
    noResult.style.display = "none";
  }
});
});

/*Watchlist button*/

const watchlistBtn = document.querySelectorAll(".watchlist-btn");

watchlistBtn.forEach(function(button){
    button.addEventListener("click", function(){
        button.textContent = "✓ Added"
        button.classList.add("added");
    })
})