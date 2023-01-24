import "./styles/style.css";

export const AUTH_KEY = "AUTH_KEY";
export async function login(type) {
  try {
    if (sessionStorage.getItem(AUTH_KEY)) {
      const data = sessionStorage.getItem(AUTH_KEY);
      return JSON.parse(data);
    }

    const response = await fetch(`http://localhost:3000/api/auth?type=${type}`);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    sessionStorage.setItem(AUTH_KEY, JSON.stringify({ ...data[0], type }));
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function exit() {
  sessionStorage.removeItem(AUTH_KEY);
  location.replace("/");
}

export function addLoginEventListener() {
  const authBtnEl = document.querySelector(".auth-btn");
  authBtnEl.addEventListener("click", async () => {
    const loginType = window.confirm("Да = студент, Нет = менеджер");
    if (loginType) {
      login("student");
    } else {
      login("manager");
    }
  });
}

export function addExitEventListener() {
  const authBtnEl = document.querySelector(".exit-btn");
  authBtnEl.addEventListener("click", async () => {
    exit();
  });
}
