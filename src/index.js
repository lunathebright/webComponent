import CommonDialog from "./components/CommonDialog";
import DialogBtn from "./components/DialogBtn";
import { arrToObj } from "./utils";

import "./style.css";

const commonDialog = document.querySelector("common-dialog");

export let options = {
  title: "Title",
  id: "user01",
  email: "user01@mail.com",
  name: "user",
  mobile: "010-0000-0000",
  team: "team.",
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
    options = { ...defaultOptions };
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

// Dialog instance 생성
export let dialog = new Dialog(Object.entries(options));

// 입력값 변경 핸들링 함수
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

(function () {
  customElements.define("dialog-btn", DialogBtn);
  customElements.define("common-dialog", CommonDialog);
})();
