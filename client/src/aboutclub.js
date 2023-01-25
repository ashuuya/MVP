import "./styles/style.css";
import { addLoginEventListener, addExitEventListener } from "./auth.js";

async function fetchClub(clubId) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/getinfo?id=${clubId}`
    );
    if (!response.ok) throw new Error(response.statusText);

    return response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

function renderClub(clubData) {
  const cardContainerEl = document.querySelector(".card");
  cardContainerEl.insertAdjacentHTML(
    "beforeend",
    `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title"><h1>${clubData.title}</h1></h5>
                    <div class="date">Дата основания клуба: <h2>${clubData.date_of_foundation}</h2></div>
                    <p class="card-text">
                    Описание: <b>${clubData.description}</b> <br>
                    Ищем: <b>${clubData.skills}
                    <h5>Наш девиз: <h3>${clubData.slogan}</h3></h5>
                    <h5>Наша цель: <h3>${clubData.goal}</h3></h5>
                    <h4>Расписание: ${clubData.schedule}</h4>
                    </p>
                </div>
            </div>
        `
  );
}

async function renderContent() {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  let value = params.clubId;
  const clubData = await fetchClub(value);
  renderClub(clubData[0]);
}

async function main() {
  renderContent();
  addLoginEventListener();
  addExitEventListener();
}

main();
