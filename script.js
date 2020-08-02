let search = document.querySelector("#search")
let btn = document.querySelector("#btn")
let container = document.querySelector(".container")
let moreInfo = document.querySelector(".more-info")
let aTags = document.querySelectorAll(".one");

search.addEventListener("keyup", (e)=>{
    e.preventDefault();
    // console.log(1)
    while (container.childNodes[0] !== undefined){
        container.removeChild(container.childNodes[0])}

    fetch(`https://www.omdbapi.com/?s=${search.value}&apikey=thewdb`).then(res => res.json()).then(data => {
    console.log(data.Search)

    if(data.Response === "False"){
       container.innerHTML +="<h1 class='not-found'>Movie Not Found</h1>"
       container.style.display = "flex";
       container.style.height = "60vh"
       container.style.justifyContent = "center";
       container.style.alignItems = "center"
    }

    else{
        // document.querySelector(".not-found")
        container.style.display = "grid";
        container.style.height = "unset"
        container.style.justifyContent = "unset";
        container.style.alignItems = "unset"
        
        data.Search.forEach(a => {
        
            if (a.Poster !== "N/A"){
             let div = document.createElement("a");
             let img = document.createElement("img");
             let p = document.createElement("p");
             p.textContent = a.Title;
             p.classList.add("title")
             div.setAttribute("href", "#")
             img.src = a.Poster;
             div.classList.add("one")
             div.setAttribute("href", "#")
             img.classList.add("img")
             container.appendChild(div)
             div.appendChild(img)
             div.appendChild(p)
             div.innerHTML+= `<i class="fas fa-star"></i>`
             // console.log(div)
             // console.log(a.Poster)
            }
     
         });
    }
   



  

    let term = search.value.toLowerCase();
    aTags.forEach((a)=>{
    // console.log(a.children)
    if(a.children[1].textContent.toLowerCase().indexOf(term) !== -1){
        a.style.display = "flex"
    }

    else{
        a.style.display = "none"
    }

})


// console.log(container.children)
// console.log(container)
// container.filter((a, index)=>{
//     if (a.indexOf(aTags) !== index){
//         a.style.display = "flex"
//     }

//     else{
//         a.style.display = "none"
//     }
// })


    
})
})






document.querySelector(".container")

container.addEventListener("click", (e)=>{
    // console.log(e.target)

    let favourites;

    if (localStorage.getItem("favourites") === null){
        favourites = [];
    }

    else{
        favourites = JSON.parse(localStorage.getItem("favourites"))
    }

    


    if(e.target.classList.contains("fa-star")){
        e.target.classList.toggle("yellow")
        e.target.parentElement.classList.toggle("yellow")
        if (e.target.classList.contains("yellow")){
            favourites.push(e.target.parentElement.children[1].textContent)
        }

        else{
            favourites.splice(favourites.indexOf(e.target.parentElement.children[1].textContent), 1)
        }
    }

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
 
            container.style.display = "grid";
            moreInfo.style.display = "none";
            console.log("hey")
        })
    })}



})







setInterval(()=>{
    let favourites;
    let child = container.children

    if (localStorage.getItem("favourites") === null){
        favourites = [];
    }

    else{
        favourites = JSON.parse(localStorage.getItem("favourites"))
    }

    for (let i=0; i< child.length; i++){
        if (favourites.indexOf(child[i].children[1].textContent) !== -1){
            child[i].style.color = "yellow"
        }

        else{
            child[i].style.color = "white"
        }

        // console.log(child[i].children[1].textContent)
    }
})
// console.log("bruh")
// let ar = [];

console.log(localStorage)
// localStorage.clear()

let header = document.querySelector("header")
let timeline = gsap.timeline();
timeline
.from(header, {y:"-100%", duration: 0.5})
.from(header.children, {opacity: "0", duration: 0.5})

