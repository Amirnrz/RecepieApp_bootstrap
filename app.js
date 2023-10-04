// Selectors
const form = document.getElementById("form")
const recepieContainer = document.getElementById("saved-recepies-container")

let recepiesArr = []

const colorsArr = ['primary','dark','danger','success','info']


// functions
function handleAddRecepie(e) {  
  e.preventDefault()

  const values = {
    name: document.getElementById("name").value,
    ratio: document.getElementById("ratio").value,
    method: document.getElementById("method").value,
    roast: document.getElementById("roast").value,
    note: document.getElementById("note").value,
    id:crypto.randomUUID(),
    color: createRandomColor()
  }

  recepiesArr.push(values)
  setToLocalStorage('recepieApp',recepiesArr)
  e.target.reset()
  renderRecepies()
}

function renderRecepies() {
  const tempString = recepiesArr.map(({
    name,ratio,method,roast,note,id,color
  }) => `
  <div class="col">
  <div class="card mb-4 rounded-3 shadow-lg border-dark">
    <div class='card-header py-3 text-white bg-${color} border-primary'>
      <h4 class='my-0'>${name}</h4>
    </div>
    <div class='card-body'>
      <ul class='text-start'>
        <li><strong>Method: </strong>${method}</li>
        <li><strong>Roast: </strong>${roast}</li>
        <li><strong>Ratio: </strong>${ratio}</li>
        ${!note.length ? "" : `<li><strong>Note :</strong>
          ${note}
        </li>`}
      </ul>
      <button id="delete-btn" class='btn btn-lg btn-outline-danger' value="${id}" aria-label='Delete ${name}'>
        Delete
      </button>
    </div>
  </div>
</div>
  `).join('')

  recepieContainer.innerHTML = tempString
}


function createRandomColor() {
  return colorsArr[Math.floor(Math.random() * colorsArr.length - 1)]
}

function setToLocalStorage(name,value) {
  return localStorage.setItem(name, JSON.stringify(value))
}

function getFromLocalStorage(name) {
  const storage = JSON.parse(localStorage.getItem(name))
  console.log(storage);
  if(storage !== null) {
    recepiesArr = storage
    renderRecepies()
  }
}

function removeElement(id) {
  const filteredItems = recepiesArr.filter(item => !item.id === id)
  recepiesArr = filteredItems
  setToLocalStorage("recepieApp", recepiesArr)
  renderRecepies()
}

// Events
window.addEventListener('DOMContentLoaded', getFromLocalStorage('recepieApp'))

form.addEventListener("submit", handleAddRecepie)

recepieContainer.addEventListener('click', (e) => {
  if(e.target.classList.contains("btn")) {
    removeElement(e.target.value)
  }
})