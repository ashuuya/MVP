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

async function searchClubs(searchValue) {
  try {
    const response = await fetch("http://localhost:3000/api/searchclub", {
      method: "POST",
      body: JSON.stringify({ searchValue: searchValue }),
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
  cardsContainerEl.innerHTML = "";
  for (const card of cardList) {
    cardsContainerEl.insertAdjacentHTML(
      "beforeend",
      `
        <li class="cards-list-li">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title"><h1>${card.title}</h1></h5>
                    <p class="card-text">
                    <h2>Описание:</h2> ${card.description} <br>
                    <h3>Ищем:</h3> ${card.skills}
                    </p>
                    <a class="btn btn-outline-primary" href="aboutclub.html?clubId=${card.id}" role="button">Подробнее</a>
                    <button class="applyclub-btn btn btn-primary float-end">Подать заявку</button>
                </div>
            </div>
        </li>
        `
    );
  }
}

function addApplyClubEventListeners(clubsData = []) {
  document
    .querySelectorAll(".cards-list-li .applyclub-btn")
    .forEach((button, index) => {
      button.addEventListener("click", () => {
        const authData = JSON.parse(sessionStorage.getItem(AUTH_KEY));
        if (authData.is_manager !== "0") {
          alert("Вы не студент!");
          return;
        }
        console.log(authData);
        applyClub(clubsData[index].id, authData.id);
        alert("Заявка подана!");
      });
    });
}

function addSearchEventListeners() {
  document.getElementById("searchbtn").addEventListener("click", (event) => {
    event.preventDefault();
    const searchEl = document.getElementById("searchbar");
    renderSearchContent(searchEl.value);
  });
}

async function renderSearchContent(searchValue) {
  const clubsData = await searchClubs(searchValue);
  renderClubs(clubsData);
  addApplyClubEventListeners(clubsData);
}

async function renderContent() {
  const clubsData = await fetchClubs();
  renderClubs(clubsData);
  addApplyClubEventListeners(clubsData);
  addSearchEventListeners();
}

async function main() {
  renderContent();
  addLoginEventListener();
  addExitEventListener();
}

main();
