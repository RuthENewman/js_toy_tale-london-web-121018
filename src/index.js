const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
// let addToy = false

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


// OR HERE!

//

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


initialize()
