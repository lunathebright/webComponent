import dialogContents from "../dialogContents";
import { options, defaultOptions } from "..";

const commonDialog = document.querySelector("common-dialog");

class CommonDialog extends HTMLElement {
  // render 함수
  render() {
    const dialogBox = document.createElement("section");
    dialogBox.className = "dialog-box";

    const isEditable = commonDialog.getAttribute("mode") === "edit";
    const isSave = commonDialog.getAttribute("save") === "true";

    dialogBox.innerHTML = dialogContents(
      isEditable,
      isSave ? options : defaultOptions
    );

    this.appendChild(dialogBox);
  }

  // re-render 조건
  static get observedAttributes() {
    return ["mode", "save"];
  }

  //  re-render 함수
  attributeChangedCallback() {
    const dialogBox = document.querySelector(".dialog-box");
    if (dialogBox) {
      dialogBox.remove();
    }
    this.render();
  }
}

export default CommonDialog;
