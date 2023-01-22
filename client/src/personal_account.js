import "./styles/style.css";
import {
  addLoginEventListener,
  addExitEventListener,
  AUTH_KEY,
} from "./auth.js";

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

async function applyForm(clubId, studentId) {
  try {
    const response = await fetch("http://localhost:3000/api/acceptform", {
      method: "POST",
      body: JSON.stringify({ clubId: clubId, studentId: studentId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

function renderForms(formList = []) {
  const cardsContainerEl = document.querySelector(".forms-list-ul");
  cardsContainerEl.innerHTML = "";
  for (const form of formList) {
    cardsContainerEl.insertAdjacentHTML(
      "beforeend",
      `
          <li class="cards-list-li">
              <div class="card">
                  <div class="card-body">
                      <h5 class="card-title">${form.studname} просится в клуб</h5>
                      <p class="card-text">
                          ID студента: ${form.id_students} <br>
                          Статус: ${form.status} 
                      </p>
                      <button class="btn btn-primary float-end">Принять заявку</button>
                  </div>
              </div>
          </li>
          `
    );
  }
}

function addApplyFormEventListeners(formsData = []) {
  document
    .querySelectorAll(".cards-list-li button")
    .forEach((button, index) => {
      button.addEventListener("click", async () => {
        const authData = JSON.parse(sessionStorage.getItem(AUTH_KEY));
        if (authData.type !== "manager") {
          alert("Вы не тренер!");
          return;
        }

        await applyForm(formsData[index].id, 1);
        await renderContent();
        console.log(formsData[index].id);
      });
    });
}

/*TODO: 1) обработка кнопки "принять заявку"
2) добавить статус к заявке
3) переход между аккаунтами в шапке
*/

async function renderContent() {
  const formsData = await fetchForms();
  renderForms(formsData);
  addApplyFormEventListeners(formsData);
}

async function main() {
  renderContent();
  addLoginEventListener();
  addExitEventListener();
}

main();
