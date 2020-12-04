let keyPublic = 'd3b97d40b5ed5059a984df36093c63c4'
let keyPrivate = '2b2537515cda562ecdcf3f7c93bf44ffe6bacea8'

let logo = document.querySelector(".logo")
let containerCards = document.querySelector(".cards")
let cardInfo = document.querySelector(".cardInfo")

cardInfo.addEventListener('click',()=>{
   
   if (cardInfo.classList.contains('animCard')){
   cardInfo.classList.toggle('animCard');
   console.log("true")
}     
})

// containerCards.addEventListener('click', ()=>{
//    cardInfo.classList.toggle('animCard')
// })
//console.dir(logo)

 connect()

function connect(){
   fetch('https://gateway.marvel.com:443/v1/public/characters?limit=50&apikey=d3b97d40b5ed5059a984df36093c63c4&hash=8ca546ed33714770ccae7e432abb3c92&ts=1')
   .then(r => r.json())
   .then(d => {
      console.log(d.data.results)
      d.data.results.forEach(e => {
         getInfoCharacter(e)
      });
     
   })
}

function getInfoCharacter(data){
   let obj = {
      id : data.id,
      name : data.name,
      description : data.description,
      pathImg : data.thumbnail.path+'/portrait_xlarge.'+data.thumbnail.extension
   }
   console.log(obj.name)
 //  logo.src = p
 createCard(obj)
}
function createCard(object){
   let card = document.createElement('div')
   card.classList.add('card')
   card.dataset.id = object.id;
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

   card.addEventListener('click',function(){
      const id =this.dataset.id
      fetch(`https://gateway.marvel.com:443/v1/public/characters?id=${id}&apikey=d3b97d40b5ed5059a984df36093c63c4&hash=8ca546ed33714770ccae7e432abb3c92&ts=1`)
   .then(r => r.json())
   .then(d => {
      const perso = d.data.results[0]
      cardInfo.classList.toggle('animCard')
      cardInfo.childNodes[1].innerText = perso.name
      let t = cardInfo.childNodes[3].childNodes[3]
      perso.description !== '' ? t.innerText = perso.description : t.innerText = 'No Description' 
      let img = cardInfo.childNodes[3].childNodes[1]
      let  pathImg = perso.thumbnail.path+'/portrait_xlarge.'+perso.thumbnail.extension
      img.src = pathImg
  })
  // cardInfo.classList.toggle('animCard')
      console.log(cardInfo.childNodes[3].childNodes)
   })
   containerCards.appendChild(card)
}