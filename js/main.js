// select element for slider
let boxContainer = document.getElementById("boxContainer");
let innerBox = document.getElementById("innerBox");
let close = document.getElementById("close");
let sliderImg = document.getElementById("sliderImg")
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let titleDiscraption = document.getElementById("titleDiscraption");
let textDiscriptaion = document.getElementById("textDiscriptaion");
let searchInput = document.getElementById("searchInput");
let searchRecipeInput = document.getElementById("searchRecipeInput")
let imgInnerBox = document.getElementById("imgNnerbox")


let currentIndex = 0;
// select nav-link to get catogery data
let navLink = Array.from(document.querySelectorAll(".dropdown-item"))
// loop on catogary drob dowen
navLink.forEach(element => {
  element.addEventListener("click",function(event){
    // get data from innerhtml
    let recipeInnerHtml = event.target.innerHTML
    getData(recipeInnerHtml)
  })
});
// this is array for save data from api 
let recipes=[]

// get Api Recipes 
async function getData(recipeHtml ="pizza"){
  let responseveData = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${recipeHtml}`)
  let dataJason = await responseveData.json()
  recipes = dataJason.recipes
disPlayData()


// get elemant <a></a> to get deteiles
let imageData = Array.from(document.querySelectorAll(".item img"));
imgDataCopy = imageData
// loop to get data form atteibute
imageData.forEach(element => {
  element.addEventListener("click",function(event){
  let imgSrc = event.target.getAttribute("src");
  let titleSrc = event.target.getAttribute("title");  
  let idSrc = event.target.getAttribute("number");
  
  getPlayID(idSrc)
  disPlayImageData(titleSrc)

// start slider
boxContainer.style.display="flex"
innerBox.style.backgroundImage = `url(${imgSrc})`


currentIndex = imageData.indexOf(event.target);
})
});
}





// search input
searchInput.addEventListener("keyup",function(){
  searchValue = searchInput.value
  getData(searchValue)
 
})

// search in array recipe
searchRecipeInput.addEventListener("keyup",function(){
  
  let temp = ""
  
  let tirm = searchRecipeInput.value

    for(let i =0;i < recipes.length;i++){
    if(recipes[i].title.toLowerCase().includes(tirm.toLowerCase())){
    temp +=` <div class="col-md-3">
    <div class="item text-center">
    <img src="${recipes[i].image_url}" title="${recipes[i].title}" number="${recipes[i].recipe_id}"  class="card-img-top alt="...">
    <h6>${recipes[i].title}</h6>
   </div>
  </div>`
    }
    document.getElementById("MyRow").innerHTML = temp
    }
   // get elemant <a></a> to get deteiles
let imageData = Array.from(document.querySelectorAll(".item img"));
imgDataCopy = imageData
// loop to get data form atteibute
imageData.forEach(element => {
  element.addEventListener("click",function(event){
  let imgSrc = event.target.getAttribute("src");
  let titleSrc = event.target.getAttribute("title");  
  let idSrc = event.target.getAttribute("number");
  
  getPlayID(idSrc)
  disPlayImageData(titleSrc)

// start slider
boxContainer.style.display="flex"
innerBox.style.backgroundImage = `url(${imgSrc})`


currentIndex = imageData.indexOf(event.target);
})
});
    
})
  






// press to close slider
close.addEventListener("click",closeSlider)
boxContainer.addEventListener("click",function(event){
 if(event.target.getAttribute("id") =="boxContainer" ){
   closeSlider()
 }
})
// press to next image
next.addEventListener("click",nextSlider)
// press ro prev image
prev.addEventListener("click",prevSlider)
// keybord events
document.addEventListener("keyup",function(event){
  if(event.code =="ArrowRight"){
    nextSlider()
  }
  else if(event.code ==  "ArrowLeft"){
    prevSlider()
  }
  else if(event.code =="Escape"){
    closeSlider()
  }
})

// event to close slider
function closeSlider(){
  boxContainer.style.display="none"
}
let imgDataCopy =[]
// event next slider
function nextSlider(){
  currentIndex++
  let cartona = " "
  
  if(currentIndex == imgDataCopy.length){
    currentIndex =0  
  }
  innerBox.style.backgroundImage =`url(${imgDataCopy[currentIndex].getAttribute("src")})`
  titleDiscraption.innerHTML = imgDataCopy[currentIndex].getAttribute("title");
  let imgID=imgDataCopy[currentIndex].getAttribute("number")
  // console.log(imgID);
  getPlayID(imgID)
    for(let i=0; i < recipeId.length;i++){
      cartona +=` <ul class="text-black text-center">
    
      <li>${recipeId[i]}</li>
      
    </ul>`
    }
    textDiscriptaion.innerHTML = cartona
   
}



// event prev slider
function prevSlider(){
  currentIndex--
  let cartona = ""
  if(currentIndex < 0){
    currentIndex = imgDataCopy.length -1
  }
  
  innerBox.style.backgroundImage =`url(${imgDataCopy[currentIndex].getAttribute("src")})` 
  titleDiscraption.innerHTML = imgDataCopy[currentIndex].getAttribute("title")
  let imgID=imgDataCopy[currentIndex].getAttribute("number")
  console.log(imgID);
  getPlayID(imgID)
  for(let i=0; i < recipeId.length;i++){
    cartona +=` <ul>
  
    <li>${recipeId[i]}</li>
    
  </ul>`
  }
  textDiscriptaion.innerHTML =cartona
}






getData()
// this is array to save id 
let recipeId =[]

// this function to get id 
async function getPlayID(idCpoy="47746"){
  let responseveId = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${idCpoy}`)
  let dataJason = await responseveId.json()
  
  recipeId = dataJason.recipe.ingredients

  
 console.log(recipeId);
 

}


// display data from api recipe
function disPlayData(){
  let temp = ""
  recipes.forEach(element => {
    temp +=` <div class="col-md-3">
    <div class="item text-center">
    <img src="${element.image_url}" title="${element.title}" number="${element.recipe_id}"  class="card-img-top alt="...">
    <h6>${element.title}</h6>
   </div>
  </div>`
  });
  document.getElementById("MyRow").innerHTML = temp
}



// display discraption
function disPlayImageData(titleSrc){
  let cartona = ""
  titleDiscraption.innerHTML = titleSrc
  for(let i =0 ;i<recipeId.length;i++){

    cartona +=` <ul>
  
    <li>${recipeId[i]}</li>
    
  </ul>`
  }
  textDiscriptaion.innerHTML =cartona
}


