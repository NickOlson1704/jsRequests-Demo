const { default: axios } = require("axios")

console.log('connected')

//step1 get the HTML
const getAllBtn = document.querySelector('#all')
const charBtns = document.querySelectorAll('.char-btns')
const ageForm = document.querySelector('#age-form')
const ageInput = document.querySelector('#age-input')
const createForm = document.querySelector('#create-form')
const newFirstInput = document.querySelector('#first')
const newLastInput = document.querySelector('#last')
const newGenderDropDown = document.querySelector('select')
const newAgeInput = document.querySelector('#age')
const newLikesText = document.querySelector('textarea')
const charContainer = document.querySelector('section')

const baseURL = "http://localhost:4000"

//step2 create callback function
function createCharacterCard(char) {
  let charCard = document.createElement('div')
  charCard.innerHTML = `<h3>${char.firstName} ${char.lastName}</h3>
  <p>gender: ${char.gender} | age: ${char.age}</p>
  <h4>Likes</h4>
  <ul>
    <li>${char.likes[0]}</li>
    <li>${char.likes[1]}</li>
    <li>${char.likes[2]}</li>
  </ul>`

  charContainer.appendChild(charCard)
}



function clearCharacters() {
  charContainer.innerHTML = ``
}

// create a function that will send axios.get request
function getAllChars() {
  clearCharacters()

  axios.get(`${baseURL}/characters`)
  .then((response) => {
    console.log(response)
    for(let i = 0; i < response.data.length; i++) {
      createCharacterCard(response.data[i])
    }
  })
}

//create a function that will run axios.get with route param
function getOneChar(event) {
  clearCharacters()

  axios.get(`${baseURL}/character/${event.target.id}`)
  .then((res) => {
    console.log(res)
    createCharacterCard(res.data)
  })
  .catch((err) => {
    console.log(err)
  })
}

//create a function that will runn axios request with Query string
function getOldChars(event) {
  event.preventDefault()

  axios.get(`${baseURL}/character/?age=${event.target.value}`)
  .then((res) => {
    console.log(res.data)
  })
  .catch((err) => {
    console.log(err)
  })
}


//step3 add event listener
getAllBtn.addEventListener('click', getAllChars)

for(let i = 0; i < charBtns.length; i++) {
  charBtns[i].addEventListener('click', getOneChar)
}

ageForm.addEventListener('submit', getOldChars)
