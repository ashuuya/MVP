import "./styles/style.css";
import {
  addLoginEventListener,
  addExitEventListener,
  AUTH_KEY,
} from "./auth.js";

async function fetchClubs() {
  try {
    const response = await fetch("http://localhost:3000/api/clubs");
    if (!response.ok) throw new Error(response.statusText);
    return response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function applyClub(clubId, studentId) {
  try {
    const response = await fetch("http://localhost:3000/api/studenttoclub", {
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

function renderClubs(cardList = []) {
  const cardsContainerEl = document.querySelector(".cards-list-ul");
  for (const card of cardList) {
    cardsContainerEl.insertAdjacentHTML(
      "beforeend",
      `
        <li class="cards-list-li">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${card.title}</h5>
                    <p class="card-text">
                        ${card.description}
                    </p>
                    <button class="btn btn-primary float-end">Подать заявку</button>
                </div>
            </div>
        </li>
        `
    );
  }
}

function addApplyClubEventListeners(clubsData = []) {
  document
    .querySelectorAll(".cards-list-li button")
    .forEach((button, index) => {
      button.addEventListener("click", () => {
        const authData = JSON.parse(sessionStorage.getItem(AUTH_KEY));
        if (authData.type !== "student") {
          alert("Вы не студент!");
          return;
        }
        console.log(authData);
        applyClub(clubsData[index].id, authData.id);
        alert("Заявка подана!");
      });
    });
}

async function renderContent() {
  const clubsData = await fetchClubs();
  renderClubs(clubsData);
  addApplyClubEventListeners(clubsData);
}

async function main() {
  renderContent();
  addLoginEventListener();
  addExitEventListener();
}

main();
