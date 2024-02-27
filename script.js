//https://api.themoviedb.org/3/movie?api_key=fcb3fe25e48e2b15111f028f05dde391
let apilink ="https://api.themoviedb.org/3"; 
let apikey = "api_key=fcb3fe25e48e2b15111f028f05dde391"
let option = "";
let type = "/movie";
let stat = "/top_rated";
let data ;
let i=0;
var img ;
let counter = 0;
var favorite_mov=[];
var favorite_shows=[];
if(localStorage.getItem("favorite_mov")){
favorite_mov = JSON.parse(localStorage.getItem("favorite_mov")) ;
favorite_mov = favorite_mov.map(str => parseInt(str));
console.log(favorite_mov);
}
if(localStorage.getItem("favorite_shows")){
    favorite_shows = JSON.parse(localStorage.getItem("favorite_shows")) ;
    favorite_shows = favorite_shows.map(str => parseInt(str));
    }
async function fetchApi(){
try{ data =await fetch(`${apilink}${option}${type}${stat}?${apikey}`) ;
     data =await data.json();
    update(i);
    console.log(data);
    counter = 0;
    showCards("/popular", type);
    showCards("/upcoming", type);
} catch{
console.log(Error("occured"));
}
}
fetchApi();
setInterval(function autoslider(){
    i=(i+1)% 20;
    update(i);
    
},5000);
function update(index){
    document.getElementById("background").src = `https://image.tmdb.org/t/p/original${data.results[index].backdrop_path}`;
    document.getElementById("date").innerHTML = `released on ${data.results[index].release_date}`;
    document.getElementById("rate").innerHTML = `${data.results[i].vote_average}`;
    document.getElementById("name").innerHTML = `${data.results[i].original_title}`;
    document.getElementById("description").innerHTML = `${data.results[i].overview}`;
    document.querySelector(".watch").id = data.results[i].id;
}
function showImg(n){
    i=(i + n ) % 20;
    update(i);
}
/*<div class="card">
<img src="sp.jpeg" alt="">
<h4 id="title">spider man</h4>
<p>top rated</p>
</div>*/
function enter(e){
    document.querySelector(`#${e.parentNode.id} .play`).style.display = "block";
}
function leave(e){
    document.querySelector(`#${e.parentNode.id} .play`).style.display = "none";
  }
function create(k, stat, dat){
    console.log(stat.slice(1));
if(k=== 0){
    document.getElementById(stat.slice(1)).innerHTML = "";
    console.log(dat);
}    
if(k < 18){
    document.getElementById(stat.slice(1)).innerHTML +=
    `<div class='card' id = '${stat.slice(1)}${k}'>
    <div class="img_cont ${dat.results[k].original_title} " id='${dat.results[k].id}' onmouseenter="enter(this)" onmouseleave="leave(this)">
    <img src='https://image.tmdb.org/t/p/original${dat.results[k].poster_path}' class="img" >
    </div>`
    if(type === "/tv"){
    document.getElementById(`${stat.slice(1)}${k}`).innerHTML += `<h4>${dat.results[k].original_name}</h4><div class="favorite"><img ${favorite_shows.includes(dat.results[k].id)? 'src="images/heart2.png" onclick="addFav(this.id, 2)";': 'src="images/heart1.png" onclick="addFav(this.id, 1)";'} class="heart" id="${dat.results[k].id} "> <p>Add to favorite</p></div></div>`;
    }
    else{
        document.getElementById(`${stat.slice(1)}${k}`).innerHTML += `<h4>${dat.results[k].original_title}</h4><div class="favorite"><img ${favorite_mov.includes(dat.results[k].id)? 'src="images/heart2.png" onclick="addFav(this.id, 2)";': 'src="images/heart1.png" onclick="addFav(this.id, 1)";'} class="heart" id="${dat.results[k].id} "> <p>Add to favorite</p></div></div>`;
    }
    if(stat === "/popular"){    
    document.querySelector(`#${stat.slice(1)}${k} .img_cont`).innerHTML +=`
    <img src="images/play-button.png" class="play">
    `;
    if(k>11 && k < 18){
        document.getElementById(`popular${k}`).style.display = "none";
    }}
    else if(stat === "/upcoming"){
        document.getElementById(`${stat.slice(1)}${k}`).innerHTML +=
        `<div class="rel">
        <img src='images/calendar.png'>
        <p>${dat.results[k].release_date}</p>
        </div>
        `
        if(k>5 && k<18){
        document.getElementById(`upcoming${k}`).style.display = "none";
        }
    }
}
    if(k === 18){
        if(stat === "/popular"){
            console.log("hello");
        document.getElementById("popular").innerHTML +=`
        <button id="more1">More...</button>
        <button id="less1">Less...</button>
        `
        document.getElementById('less1').style.display = "none";
    }
        else if(stat === "/upcoming"){
            document.getElementById(stat.slice(1)).innerHTML +=`
            <button id="more2">More...</button>
            <button id="less2">Less...</button>
            `
        document.getElementById('less2').style.display = "none";
    }  
}
}
async function showCards(stat, typ){ 
    try{
            let dat =await fetch(`${apilink}${option}${typ}${stat}?${apikey}`);
            dat =await dat.json(); 
            if(stat === "/popular"){
            showFav();}
            for(let j=0;j<19;j++){
                create(j,stat,dat);
            }
            }
 catch{
    console.log(Error("occured"));
    } 
}
document.addEventListener("click",(event)=>{
if(event.target.id === "more1"){      
for(let k =12;k<19 ; k++){
if(k<18){
    document.getElementById(`popular${k}`).style.display = "block";
}
else {
event.target.style.display ="none";
document.getElementById("less1").style.display = "block";
}
}}
else if(event.target.id === "more2"){
    for(let k =6;k<19 ; k++){
        if(k<18){
            document.getElementById(`upcoming${k}`).style.display = "block";
        }
        else {
        event.target.style.display ="none";
        document.getElementById("less2").style.display = "block";
        }
        }
}
else if(event.target.id === "less1"){
   less(12, "popular");
   event.target.style.display ="none";
   document.getElementById("more1").style.display = "block";
}
else if(event.target.id === "less2"){
    less(6 , "upcoming");
    event.target.style.display ="none";
    document.getElementById("more2").style.display = "block";
 }
else if(event.target.className === "play" || event.target.className === "img" || event.target.className==="text" || event.target.className==="sImg" || event.target.classList.contains("watch")){
   let overlay=document.getElementById("overlay");
   document.getElementById("other_videos").style.display = "flex";
    overlay.style.width="100%";
    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
    console.log(event.target.id);
    event.target.classList.contains("watch")?play(event.target.id):play(event.target.parentNode.id);
console.log( event.target.classList);}
else if(event.target.id === "menu"){
    let side_bar = document.getElementById("side_bar");
    side_bar.style.width= "40%";
    side_bar.style.right="0";
}
else if(event.target.id === "close"){
    let overlay=document.getElementById("overlay");
    overlay.style.width="0";
    document.getElementById("other_videos").innerHTML="";
    document.getElementById("overlay_des").innerHTML="";
}
});
async function play(id){
    console.log(type);
    let Sdata = await fetch(`${apilink}${type}/${id}?${apikey}`); 
    let data = await fetch(`${apilink}${type}/${id}/videos?${apikey}`); 
    Sdata =await Sdata.json() ;
    data= await data.json() ;
    console.log(Sdata);

   if(data.results.length > 0 && data.results[0].site === "YouTube"){
    document.getElementById("overlay_cont").innerHTML = `<iframe width="50%" height="350px" 
    src="https://www.youtube.com/embed/${data.results[0].key}?si=FsSzju7RaTZYwNgW" 
    title="${data.results[0].name}" frameborder="0" allow="accelerometer; 
    autoplay; clipboard-write; encrypted-media; 
    gyroscope; picture-in-picture; web-share" 
    allowfullscreen></iframe>
    <div id="overlay_des" style="display:flex; flex-direction:column; gap:10px;align-self:center;">
   <p id="release">${type === "/movie"?"released on " +Sdata.release_date:""}</p>
    <div style="display:flex; gap:10px">
    <img src="images/star.png">
    <p>${Sdata.vote_average}</p>
    </div>
    <h1 id="nam">${type === "/movie" ? Sdata.original_title: Sdata.original_name}</h1>
    <p>${Sdata.overview}</p>
    </div>
   `;
}
   else{
    document.getElementById("overlay_cont").innerHTML = `
    <img src="https://image.tmdb.org/t/p/original${Sdata.poster_path}" style="width:40%; height:450px;">
    <div id="overlay_des" style="display:flex; flex-direction:column; gap:10px; align-self:center;">
    <p>${type === "/movie"?"released on " +Sdata.release_date:""}</p>
    <div style="display:flex; gap:10px">
    <img src="images/star.png">
    <p>${Sdata.vote_average}</p>
    </div>
    <h1>${type === "/movie" ? Sdata.original_title: Sdata.original_name}</h1>
    <p>${Sdata.overview}</p>
    </div>
    `
   }
    if(data.results.length>1){
        document.getElementById("other_videos").innerHTML ="";
        for(let i =1 ;i<5;i++){
            if(data.results[i].site === "YouTube"){
                document.getElementById("other_videos").innerHTML += `<div class="other_video"><iframe width="100%"
                src="https://www.youtube.com/embed/${data.results[i].key}?si=FsSzju7RaTZYwNgW" 
                title="${data.results[i].name}" frameborder="0" allow="accelerometer; 
                autoplay; clipboard-write; encrypted-media; 
                gyroscope; picture-in-picture; web-share" 
                allowfullscreen></iframe>
                <p style="margin-left:20px;">${data.results[i].name}</p></div>`
        }
    }
   }
}
function less(s, e){
    //var result =await showCards();
    for(let k=s; k<18;k++){
    document.getElementById(`${e}${k}`).style.display = "none";
}
}
console.log(type);
function showMovies(){
    type = "/movie";
    showCards("/popular", type);
    document.getElementById("search").placeholder = "search for a movie";
    console.log(type);
}
function showTv(){
    type = "/tv";
    showCards("/popular", type);
    document.getElementById("search").placeholder = "search for a Tv show";
    console.log(type);
}
async function search_cards(){
    console.log("hello");
    try{
    let Sdata = await fetch(`${apilink}/search${type}?${apikey}&query=${search.value}`); 
    Sdata =await Sdata.json() ;
    console.log(Sdata);
    for(let k = 0;k<4;k++){
        create_sc(Sdata, k);}
   }
    catch{
    console.log("movie not found")
    }
}
function create_sc(Sdata, k){
    if(k==0){
        document.getElementById("desc_cont").innerHTML ="";  
    }
    if(type === "/movie"){
    document.getElementById("desc_cont").innerHTML += `
    <div class="search_desc ${Sdata.results[k].original_title}" id="${Sdata.results[k].id}" >
    <img class="sImg" src="https://image.tmdb.org/t/p/original${Sdata.results[k].poster_path}">
    <div class="text"><h6>${Sdata.results[k].original_title}</h6>
    <h5 style="color:gray">${Sdata.results[k].release_date}</h5></div>
    </div>
    `}
    else{
        document.getElementById("desc_cont").innerHTML += `
        <div class="search_desc ${Sdata.results[k].original_name}" id="${Sdata.results[k].id}" >
        <img class="sImg" src="https://image.tmdb.org/t/p/original${Sdata.results[k].poster_path}">
        <div class="text"><h6>${Sdata.results[k].original_name}</h6>
        </div>
        </div>`
    }
} 
function hide_menu(){
    let side_bar = document.getElementById("side_bar");
    side_bar.style.width= "0";
    side_bar.style.right="-200px";
}
function active(e){
    let par =document.getElementById("menu_links");
    for(let i = 0; i< 4; i++){
        let child =par.children[i];
        child.children[0].classList.remove("active");
    }
    e.classList.add("active");
}
window.onscroll = function(){
    if(window.scrollY > 0){
        document.querySelector("nav").style.background ="rgba(35, 35, 35, 0.97)";
    }
}
function addFav(id, z){

    if(z===1){
        console.log("hello");
        document.getElementById(id).onclick = function(){addFav(id, 2);};
        document.getElementById(id).src = "images/heart2.png";       
    } else{ 
        console.log("how are you");
        document.getElementById(id).onclick = function(){addFav(id, 1);};
        document.getElementById(id).src = "images/heart1.png";       
}
if(type === "/tv"){
    if(z===1)
      favorite_shows.push(id);
    else
      favorite_shows = favorite_shows.filter(element => element != id);
    localStorage.setItem('favorite_shows',JSON.stringify(favorite_shows));
}
else {
    if(z===1)
       favorite_mov.push(id);
    else
      favorite_mov = favorite_mov.filter(element => element != id);
    localStorage.setItem('favorite_mov', JSON.stringify(favorite_mov));
}  
    showFav();}
async function showFav(){
    var fav = document.getElementById("favorites");
    if(fav.innerHTML != "")
        fav.innerHTML = "";
    if(type === "/movie"){
        console.log("***");
        console.log(type);
        console.log("***");
    for(let k =0;k<favorite_mov.length;k++){
    if(favorite_mov.length>0){
        let dat = await fetch(`${apilink}${type}/${favorite_mov[k]}?${apikey}`); 
        dat = await dat.json();
        console.log(dat); 
        document.getElementById("favorites").innerHTML +=
        `<div class='card'>
        <div class="img_cont ${dat.original_title} " id='${dat.id}' onmouseenter="enter(this)" onmouseleave="leave(this)">
        <img src='https://image.tmdb.org/t/p/original${dat.poster_path}' class="img" >
        <h4>${dat.original_title}</h4><div class="favorite"><img src="images/heart2.png" onclick="addFav(this.id, 2)"; class="heart" id="${dat.id} "> <p>Add to favorite</p></div>
        <img src="images/play-button.png" class="play"></div>
        </div>`
        //if(k>11 && k < 18){
        //   document.getElementById(`fav${k}`).style.display = "none";
        //}
    }    }}
    else {
        console.log("***");
        console.log(type);
        console.log("***");
        for(let k =0;k<favorite_shows.length;k++){
        if(favorite_shows.length>0){
            let dat = await fetch(`${apilink}${type}/${favorite_shows[k]}?${apikey}`); 
            dat = await dat.json();
            console.log(dat);
            document.getElementById("favorites").innerHTML +=
            `<div class='card'>
            <div class="img_cont ${dat.original_name} " id='${dat.id}' onmouseenter="enter(this)" onmouseleave="leave(this)">
            <img src='https://image.tmdb.org/t/p/original${dat.poster_path}' class="img" >
            <h4>${dat.original_name}</h4><div class="favorite"><img src="images/heart2.png" onclick="addFav(this.id, 2)"; class="heart" id="${dat.id} "> <p>Add to favorite</p></div>
            <img src="images/play-button.png" class="play"></div>
            </div>`
    }
}
}}

    async function insertFav(){
            let dat = await fetch(`${apilink}${type}/${favorite[k]}?${apikey}`); 
            dat = await dat.json();
            console.log(dat);
            document.getElementById("favorites").innerHTML +=
            `<div class='card'>
            <div class="img_cont ${dat.original_title} " id='${dat.id}' onmouseenter="enter(this)" onmouseleave="leave(this)">
            <img src='https://image.tmdb.org/t/p/original${dat.poster_path}' class="img" >
            <h4>${type === "/tv"?dat.original_name:dat.original_title}</h4><div class="favorite"><img src="images/heart2.png" onclick="addFav(this.id, 2)"; class="heart" id="${dat.id} "> <p>Add to favorite</p></div>
            <img src="images/play-button.png" class="play"></div>
            </div>`
        }   