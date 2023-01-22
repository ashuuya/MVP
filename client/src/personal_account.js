import "./styles/style.css";

async function fetchForms() {
  try {
    const response = await fetch("http://localhost:3000/api/forms");
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

function renderForms(formList = []) {
  const cardsContainerEl = document.querySelector(".forms-list-ul");
  for (const form of formList) {
    cardsContainerEl.insertAdjacentHTML(
      "beforeend",
      `
          <li class="forms-list-li">
              <div class="form">
                  <div class="card-body">
                      <h5 class="card-title">${form.idClub}</h5>
                      <p class="card-text">
                          ${form.id}
                      </p>
                      <button class="btn btn-primary float-end">Подать заявку</button>
                  </div>
              </div>
          </li>
          `
    );
  }
}
