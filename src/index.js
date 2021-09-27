import CommonDialog from "./CommonDialog";
import { arrToObj } from "./utils";

import "./style.css";

const main = document.querySelector("main");
const commonDialog = document.querySelector("common-dialog");

export let options = {
  title: "Title",
  id: "Liveconnect",
  email: "liveconnect@liveconnect.co.kr",
  name: "liveconnect",
  mobile: "010-0000-0000",
  team: "Media&nbsp;Lab.",
};

export let defaultOptions = { ...options };

class Dialog {
  constructor(optionsArr) {
    const optionsObj = arrToObj(optionsArr);

    this._title = optionsObj.title;
    this._id = optionsObj.id;
    this._email = optionsObj.email;
    this._name = optionsObj.name;
    this._mobile = optionsObj.mobile;
    this._team = optionsObj.team;
  }

  open() {
    commonDialog.classList.add("active");
    setViewEventListener();
  }

  close() {
    commonDialog.classList.remove("active");
  }

  editable(isEditable) {
    if (isEditable) {
      commonDialog.setAttribute("mode", "edit");
      setEditEventListener();
    } else {
      commonDialog.setAttribute("mode", "view");
      setViewEventListener();
    }
  }

  cancel() {
    commonDialog.setAttribute("save", "false");
    commonDialog.setAttribute("mode", "view");
    setViewEventListener();
  }

  save() {
    commonDialog.setAttribute("save", "true");
    commonDialog.setAttribute("mode", "view");
    setViewEventListener();
    defaultOptions = { ...options };
  }

  get getDataSource() {
    const dataSource = {
      title: this._title,
      id: this._id,
      email: this._email,
      name: this._name,
      mobile: this._mobile,
      team: this._team,
    };

    return Object.entries(dataSource);
  }

  set setDataSource(optionsArr) {
    const optionsObj = arrToObj(optionsArr);

    this._title = optionsObj.title;
    this._id = optionsObj.id;
    this._email = optionsObj.email;
    this._name = optionsObj.name;
    this._mobile = optionsObj.mobile;
    this._team = optionsObj.team;
  }
}

customElements.define("common-dialog", CommonDialog);

let dialog = new Dialog(Object.entries(options));

const onTextChange = (e) => {
  const { name, value } = e.target;
  options[name] = value;
};

// 조회 모드 시 이벤트리스너 부착 함수
const setViewEventListener = () => {
  const closeBtn = document.querySelector(".close-btn");
  closeBtn.addEventListener("click", dialog.close);

  const editBtn = document.querySelector(".edit-btn");
  editBtn.addEventListener("click", () => dialog.editable(true));
};

// 수정 모드 시 이벤트리스너 부착 함수
const setEditEventListener = () => {
  const cancelBtn = document.querySelector(".cancel-btn");
  cancelBtn.addEventListener("click", dialog.cancel);

  const saveBtn = document.querySelector(".save-btn");
  saveBtn.addEventListener("click", dialog.save);

  const inputs = document.querySelectorAll("input:read-write");
  inputs.forEach((input) => {
    input.addEventListener("change", onTextChange);
  });
};

// dialog open button
const DialogBtn = () => {
  const setBtn = document.createElement("button");
  setBtn.className = "set-btn";
  setBtn.innerText = "dialog";
  setBtn.addEventListener("click", dialog.open);

  main.appendChild(setBtn);

  return setBtn;
};

(function () {
  DialogBtn();
})();
