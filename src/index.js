const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
// let addToy = false
const inputName = document.querySelector('#inputName')
const inputImage = document.querySelector('#inputImage')

const state = {
  toys: [],
  addToy: false
}

function renderSingleToy(toy) {
  const div = document.createElement('div')
  div.className = 'card'
  div.innerHTML = `
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} likes </p>
        <button class="like-btn">Like <3</button>
  `;
  toyCollection.appendChild(div)
}


function renderMultipleToys(toys) {
  toys.forEach(toy => renderSingleToy(toy))

  toyForm.addEventListener('submit', (event) => {
    event.preventDefault()
    createAToy()
    addAToy()

  })
}
// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  state.addToy = !state.addToy
  if (state.addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


// add a new Toy
function createAToy() {
  const toyEl = document.createElement('div')
  toyEl.className = 'card'
  const name = inputName.value
  const image = inputImage.value

  toyEl.innerHTML = `
        <h2>${name}</h2>
        <img src=${image} class="toy-avatar" />
        <p>0 likes </p>
        <button class="like-btn">Like <3</button>
  `;
  toyCollection.appendChild(toyEl)
}
//

// like a Toy

function likeAToy() {
  document.addEventListener('click', event => {
    
  })
}

function initialize() {
  getToys()
    .then(toys => {
      state.toys = toys
      renderMultipleToys(state.toys)
    })
}

// server stuff
function getToys() {
  return fetch('http://localhost:3000/toys')
            .then(resp => resp.json())
}

function addAToy(name, image) {
  state.toys.push({name: name, image: image, likes: 0})
  return fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: { 'Content-Type' : 'application/json' },
    body: JSON.stringify({ name: name, image: image, likes: 0 })
  }).then(resp => resp.json)
}

function updateToy(toy) {
  return fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type' : 'application/json' },
    body: JSON.stringify(toy)
  }).then(resp => resp.json())
}

function deleteAToy(toy) {
  return fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'DELETE'
  }).then(resp => resp.json())
}


initialize()
