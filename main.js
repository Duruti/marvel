let keyPublic = 'd3b97d40b5ed5059a984df36093c63c4'
let keyPrivate = '2b2537515cda562ecdcf3f7c93bf44ffe6bacea8'

let logo = document.querySelector(".logo")
let containerCards = document.querySelector(".cards")
//console.dir(logo)

fetch('https://gateway.marvel.com:443/v1/public/characters?apikey=d3b97d40b5ed5059a984df36093c63c4&hash=8ca546ed33714770ccae7e432abb3c92&ts=1')
.then(r => r.json())
.then(d => {
   console.log(d.data.results.length)
   d.data.results.forEach(e => {
      getInfoCharacter(e)
   });
  
})

function getInfoCharacter(data){
   let obj = {
      name : data.name,
      pathImg : data.thumbnail.path+'/portrait_xlarge.'+data.thumbnail.extension
   }
   console.log(obj.name)
 //  logo.src = p
 createCard(obj)
}
function createCard(object){
   let card = document.createElement('div')
   card.classList.add('card')
   
   // name
   let name = document.createElement('h1')
   name.classList.add('name')
   name.innerText = object.name
   card.appendChild(name)
   
   //img
   let img = document.createElement('img');
   img.classList.add('logo')
   img.src = object.pathImg
   card.appendChild(img)

   containerCards.appendChild(card)
}