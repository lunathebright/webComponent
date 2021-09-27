import { options, defaultOptions } from ".";
import dialogContents from "./dialogContents";

const commonDialog = document.querySelector("common-dialog");

class CommonDialog extends HTMLElement {
  constructor() {
    super();
  }

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

  static get observedAttributes() {
    return ["mode", "save"];
  }

  attributeChangedCallback() {
    const dialogBox = document.querySelector(".dialog-box");
    if (dialogBox) {
      dialogBox.remove();
    }
    this.render();
  }
}

export default CommonDialog;
