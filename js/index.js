let page=1;

document.addEventListener("DOMContentLoaded",()=>{
  createForm()
  getMonsters(page)
  nextData()
})

function getMonsters(page){
  let fetchUrl = `http://localhost:3000/monsters/?_limit=50&_page=${page}`
  fetch(fetchUrl)
  .then(res => res.json())
  .then(data => renderMonster(data))
}
function renderMonster(arrayOfMonsters){
  let monsterContainer = document.querySelector("#monster-container")
  monsterContainer.innerHTML = ""
  arrayOfMonsters.forEach(monster => {
    let monsterItem = document.createElement("div")
    let h2 = document.createElement("h2")
    h2.innerText = monster.name
    monsterItem.appendChild(h2)
    let h3 = document.createElement("h3")
    h3.innerText = monster.age
    monsterItem.appendChild(h3)
    let descriptionP = document.createElement("p")
    descriptionP.innerText = monster.description
    monsterItem.appendChild(descriptionP)

    monsterContainer.appendChild(monsterItem)

  });
}

function createForm(){
  
  let formContainer = document.querySelector("#create-monster")

  let form = document.createElement("form");
  form.id = "monster-form"

  let monsterName = document.createElement("input");
  monsterName.id = "monster-name"
  monsterName.type = "text"
  monsterName.placeholder = "name.."
  form.appendChild(monsterName)

  let monsterAge = document.createElement("input");
  monsterAge.id = "monster-age"
  monsterAge.type = "text"
  monsterAge.placeholder = "age.."
  form.appendChild(monsterAge)

  let monsterDescription = document.createElement("input");
  monsterDescription.id = "monster-description"
  monsterDescription.type = "text"
  monsterDescription.placeholder = "description.."
  form.appendChild(monsterDescription)

  let submitButton = document.createElement("button");
  submitButton.id = "create"
  submitButton.innerText = "SUBMIT"
  form.appendChild(submitButton)

  formContainer.appendChild(form)
  form.addEventListener("submit",(event)=>{
    event.preventDefault()
    postData()
  })
}

function postData(){

    let name = document.querySelector("#monster-name").value
    let age = Number(document.querySelector("#monster-age").value)
    let description = document.querySelector("#monster-description").value
    let dataObj = {
        name:name,
        age: age,
        description:description
      }

    fetch("http://localhost:3000/monsters",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body:JSON.stringify(dataObj)
    })
    .then(res => res.json())
    .then(data => data)
}

function nextData(){
  let forward = document.querySelector("#forward")
  let back = document.querySelector("#back")
  forward.addEventListener("click",()=>{
    page +=1
    getMonsters(page)
  })
  back.addEventListener("click",()=>{
    if(page<=1){
      alert("No monsters on this page")
    }
    else{
      page -=1
    getMonsters(page)
    }
    
  })

}
