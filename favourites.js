let container = document.querySelector(".container");
let moreInfo = document.querySelector(".more-info");



    window.addEventListener('DOMContentLoaded', (e) => {
        let favourites;

        if (localStorage.getItem("favourites") === null ||localStorage.getItem("favourites") === "[]"){
            favourites = [];
            container.innerHTML = `<h1>There Are Currently No Movies Selected As Favourites</h1>`
        }
    
        else{
            container.style.display = "grid";
            container.style.height = "unset"
            container.style.justifyContent = "unset";
            container.style.alignItems = "unset"
            favourites = JSON.parse(localStorage.getItem
            ("favourites"))
    
            favourites.forEach((i)=>{
                console.log(i)
                fetch(`https://www.omdbapi.com/?t=${i}&apikey=thewdb`).then(res => res.json()).then(data => {
            console.log(data)
           
        
        
        
                
               if (data.Poster !== "N/A"){
                let div = document.createElement("a");
                let img = document.createElement("img");
                let p = document.createElement("p");
                p.textContent = data.Title;
                div.setAttribute("href", "#")
                img.src = data.Poster;
                div.classList.add("one")
                div.classList.add("yellow")
                div.setAttribute("href", "#")
                img.classList.add("img")
                container.appendChild(div)
                div.appendChild(img)
                div.appendChild(p)
                div.innerHTML+= `<i class="fas fa-star yellow"></i>`
                // console.log(div)
                // console.log(a.Poster)
           
        
            }});
            })
        }
    
    
        
    
    console.log(favourites)
       
    });

   





document.querySelector(".container")


container.addEventListener("click", (e)=>{
    // console.log(e.target)
    console.log(moreInfo)


    let favourites;

    if (localStorage.getItem("favourites") === null){
        favourites = [];
    }

    else{
        favourites = JSON.parse(localStorage.getItem("favourites"))
    }

    


    if(e.target.classList.contains("fa-star")){
        e.target.classList.toggle("yellow");
        e.target.parentElement.classList.toggle("yellow");
        if (e.target.classList.contains("yellow")){
            favourites.push(e.target.parentElement.children[1].textContent)
        }

        else{
            favourites.splice(favourites.indexOf(e.target.parentElement.children[1].textContent), 1)
            e.target.parentElement.remove()
            console.log(favourites.length)
            console.log(favourites)
        }

        if (favourites.length === 0){
            container.style.display = "flex";
            container.style.justifyContent = "center";
            container.style.alignItems = "center"
            container.innerHTML = `<h1>There Are Currently No Selected Favourite Movies</h1>`
            console.log("empty")
        }
    
        else{
            console.log("not empty")
            container.style.display = "grid";
            container.style.justifyContent = "unset";
            container.style.alignItems = "unset"

        }
    }



    // if (favourites.length === 0){
    //     container.innerHTML = `<h1>There Are Currently No Movies Selected As Favourites</h1>`
    // }

    localStorage.setItem("favourites", JSON.stringify(favourites))



    console.log(localStorage)



    if( e.target.classList.contains("img") || e.target.classList.contains("title")){
        let title = e.target.parentElement.children[1].textContent

        fetch(`https://www.omdbapi.com/?t=${title}&apikey=thewdb`).then(res => res.json()).then(data => {
            console.log(data)

            let timeline = gsap.timeline();
            timeline
            .from(moreInfo, {x:"-100%", duration: 0.5})
            .from(moreInfo.children, {opacity: "0", duration: 0.5})

            container.style.display = "none";
            moreInfo.style.display = "flex";

            let ratings = data.Ratings;
            console.log(ratings)

            moreInfo.innerHTML = `<div class="part1">
            <img src=${data.Poster}>

            <div class="buttons">
            <a class="view" href="https://imdb.com/title/${data.imdbID}" target="_blank">View IMDG</a>
            <a class="back" href="#">Go Back</a>
            </div>

        </div>
        <div class="part2">
            
            
            <ul>
                <h1>${data.Title}</h1>
                <li><h4>Released:</h4>${data.Released}</li>
                <li><h4>Genre:</h4>${data.Genre}</li>
                <li><h4>Rated:</h4>${data.Rated}</li>
                <li><h4>IMDG Rating:</h4>${data.imdbRating}</li>
                <li><h4>Director:</h4>${data.Director}</li>
                <li><h4>Actors:</h4>${data.Actors}</li>
                <li><h4>Plot:</h4>${data.Plot}</li>

            </ul>


        </div>`

        let backBtn = document.querySelector(".back");
        console.log(backBtn)


        backBtn.addEventListener("click", (e)=>{
 
            container.style.display = "grid";
            moreInfo.style.display = "none";
            console.log("hey")
        })
    })}
    
    else if(e.target.classList.contains("one")){
        let title = e.target.children[1].textContent

        fetch(`https://www.omdbapi.com/?t=${title}&apikey=thewdb`).then(res => res.json()).then(data => {
            console.log(data)

            let timeline = gsap.timeline();
            timeline
            .from(moreInfo, {x:"-100%", duration: 0.5})
            .from(moreInfo.children, {opacity: "0", duration: 0.5})

            container.style.display = "none";
            moreInfo.style.display = "flex";

            let ratings = data.Ratings;
            console.log(ratings)

            moreInfo.innerHTML = `<div class="part1">
            <img src=${data.Poster}>

            <div class="buttons">
            <a class="view" href="https://imdb.com/title/${data.imdbID}" target="_blank">View IMDG</a>
            <a class="back" href="#">Go Back</a>
            </div>

        </div>
        <div class="part2">
            
            
            <ul>
                <h1>${data.Title}</h1>
                <li><h4>Released:</h4>${data.Released}</li>
                <li><h4>Genre:</h4>${data.Genre}</li>
                <li><h4>Rated:</h4>${data.Rated}</li>
                <li><h4>IMDG Rating:</h4>${data.imdbRating}</li>
                <li><h4>Director:</h4>${data.Director}</li>
                <li><h4>Actors:</h4>${data.Actors}</li>
                <li><h4>Plot:</h4>${data.Plot}</li>

            </ul>


        </div>`

        let backBtn = document.querySelector(".back");
        console.log(backBtn)


        backBtn.addEventListener("click", (e)=>{
            e.preventDefault()
 
            container.style.display = "grid";
            moreInfo.style.display = "none";
            console.log("hey")
        })
    })}



})
// localStorage.clear()

let search = document.querySelector("#search")
search.addEventListener("keyup", (e)=>{
    e.preventDefault();
        let term = search.value.toLowerCase();
    document.querySelectorAll(".one").forEach((a)=>{
    // console.log(a.children)
    if(a.children[1].textContent.toLowerCase().indexOf(term) !== -1){
        a.style.display = "flex"
    }

    else{
        a.style.display = "none"
    }
})
})

// let header = document.querySelector("header")
// let timeline = gsap.timeline();
// timeline
// .from(header, {y:"-100%", duration: 0.5})
// .from(header.children, {opacity: "0", duration: 0.5})
