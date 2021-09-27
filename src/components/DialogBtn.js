import { dialog } from "..";

class DialogBtn extends HTMLElement {
  connectedCallback() {
    const setBtn = document.createElement("button");
    setBtn.className = "set-btn";
    setBtn.innerText = "dialog";
    setBtn.addEventListener("click", dialog.open);

    this.appendChild(setBtn);
  }
}

export default DialogBtn;
