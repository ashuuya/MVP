import "./styles/style.css";
import {
  addLoginEventListener,
  addExitEventListener,
  AUTH_KEY,
} from "./auth.js";

async function fetchProfile(profileId) {
  try {
    if (!profileId) {
      return undefined;
    }
    const authData = JSON.parse(sessionStorage.getItem(AUTH_KEY));
    const response = await fetch("http://localhost:3000/api/getprofile", {
      method: "POST",
      body: JSON.stringify({
        profileType: authData.is_manager,
        profileId: profileId,
      }),
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

function renderProfile(profileData) {
  const cardsContainerEl = document.querySelector(".card");
  if (!profileData) {
    cardsContainerEl.insertAdjacentHTML(
      "beforeend",
      `
      <h5 class="card-header">Мой профиль</h5>
          <div class="card-body">
            <h5 class="card-title">Вы не авторизованы</h5>
          </div>
    `
    );
  } else if (profileData.is_manager == "0") {
    cardsContainerEl.insertAdjacentHTML(
      "beforeend",
      `
      <div class="card-text">
        <h5 class="card-header">Мой профиль</h5>
          <div class="card-body">
            <h5 class="card-title">${profileData.fio}</h5>
            <p class="card-text">E-mail: ${profileData.email}</p>
            <p class="card-text">Номер телефона: ${profileData.phone}</p>
            <p class="card-text">Курс: ${profileData.course}</p>
            <p class="card-text">Группа здоровья: ${profileData.healthgroup}</p>
          </div>
      </div>
      <div class="avatar">
      <img class="png" src="../src/assets/person.png">   
      </div> 
      `
    );
  } else if (profileData.is_manager == "1") {
    cardsContainerEl.insertAdjacentHTML(
      "beforeend",
      `
        <div class="card-text">
        <h5 class="card-header">Мой профиль</h5>
          <div class="card-body">
            <h5 class="card-title">${profileData.fio}</h5>
            <p class="card-text">E-mail: ${profileData.email}</p>
            <p class="card-text">Номер телефона: ${profileData.phone}</p>
          </div>
        </div>
        <div class="avatar">
          <img class="png" src="../src/assets/person.png">   
        </div> 
    `
    );
  }
}

/*TODO: 1) обработка кнопки "принять заявку"
2) добавить статус к заявке
3) переход между аккаунтами в шапке
*/

async function renderContent() {
  const authData = JSON.parse(sessionStorage.getItem(AUTH_KEY));
  console.log(authData);
  const profileData = await fetchProfile(authData?.id);
  renderProfile(profileData);
}

async function main() {
  renderContent();
  addLoginEventListener();
  addExitEventListener();
}

main();
