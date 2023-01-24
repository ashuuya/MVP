import "./styles/style.css";
import { addLoginEventListener, addExitEventListener } from "./auth.js";

async function main() {
  addLoginEventListener();
  addExitEventListener();
}

main();
