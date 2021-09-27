import dialogContents from "./dialogContents";
import { arrToObj } from "./utils";

import "./style.css";

const main = document.querySelector("main");

// CommonDialog Class
class CommonDialog {
  constructor(optionsArr) {
    const optionsObj = arrToObj(optionsArr);

    this.title = optionsObj.title;
    this.id = optionsObj.id;
    this.email = optionsObj.email;
    this.name = optionsObj.name;
    this.mobile = optionsObj.mobile;
    this.team = optionsObj.team;
  }

  open() {
    main.className = "active";
    main.appendChild(Dialog(false, defaultOptions));
    setViewEventListener();
  }

  close() {
    main.classList.remove("active");
    const dialogBox = document.querySelector(".dialog-box");
    dialogBox.remove();
  }

  editable(isEditable) {
    const dialogBox = document.querySelector(".dialog-box");
    dialogBox.remove();

    if (isEditable) {
      main.appendChild(Dialog(true, defaultOptions));
      setEditEventListener();
    } else {
      main.appendChild(Dialog(false));
      setViewEventListener();
    }
  }

  save() {
    const dialogBox = document.querySelector(".dialog-box");
    dialogBox.remove();

    main.appendChild(Dialog(false));
    setViewEventListener();
    defaultOptions = { ...options };
  }

  cancel() {
    const dialogBox = document.querySelector(".dialog-box");
    dialogBox.remove();

    main.appendChild(Dialog(false, defaultOptions));
    setViewEventListener();
  }

  get getDataSource() {
    const dataSource = {
      title: this.title,
      id: this.id,
      email: this.email,
      name: this.name,
      mobile: this.mobile,
      team: this.team,
    };
    return dataSource;
  }

  set setDataSource(optionsArr) {
    const optionsObj = arrToObj(optionsArr);

    this.title = optionsObj.title;
    this.id = optionsObj.id;
    this.email = optionsObj.email;
    this.name = optionsObj.name;
    this.mobile = optionsObj.mobile;
    this.team = optionsObj.team;
  }
}

// CommonDialog instance 생성 options
let options = {
  title: "Title",
  id: "Liveconnect",
  email: "liveconnect@liveconnect.co.kr",
  name: "liveconnect",
  mobile: "010-0000-0000",
  team: "Media&nbsp;Lab.",
};

// CommonDialog instance 생성 options 복사본
let defaultOptions = { ...options };

// CommonDialog instance 생성 함수
const newDialog = (opt = options) => {
  const optionsArr = Object.entries(opt);
  let dialog = new CommonDialog(optionsArr);
  return dialog;
};

// dialog component
const Dialog = (isEditMode = false, opt = options) => {
  const dialog = newDialog(opt);

  const dialogSection = document.createElement("section");
  dialogSection.className = "dialog-box";

  const innerContents = dialogContents(isEditMode, dialog);

  dialogSection.innerHTML = innerContents;

  return dialogSection;
};

// 입력값 핸들링 함수
const onTextChange = (e) => {
  const { name, value } = e.target;
  options[name] = value;
};

// 조회 모드 시 이벤트리스너 부착 함수
const setViewEventListener = () => {
  const closeBtn = document.querySelector(".close-btn");
  closeBtn.addEventListener("click", newDialog().close);

  const editBtn = document.querySelector(".edit-btn");
  editBtn.addEventListener("click", () => newDialog().editable(true));
};

// 수정 모드 시 이벤트리스너 부착 함수
const setEditEventListener = () => {
  const cancelBtn = document.querySelector(".cancel-btn");
  cancelBtn.addEventListener("click", newDialog().cancel);

  const saveBtn = document.querySelector(".save-btn");
  saveBtn.addEventListener("click", newDialog().save);

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
  setBtn.addEventListener("click", newDialog().open);

  main.appendChild(setBtn);

  return setBtn;
};

(function () {
  DialogBtn();
})();
