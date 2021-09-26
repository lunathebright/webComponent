import "./style.css";

const main = document.querySelector("main");

class CommonDialog {
  constructor(options) {
    this.title = options.title;
    this.id = options.id;
    this.email = options.email;
    this.name = options.name;
    this.mobile = options.mobile;
    this.team = options.team;
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

  changeTitle() {
    console.log("change title");
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

  getDataSource() {
    console.log("get data");
  }

  setDataSource() {
    console.log("set data");
  }
}

let options = {
  title: "Test&nbsp;Title",
  id: "Liveconnect",
  email: "liveconnect@liveconnect.co.kr",
  name: "liveconnect",
  mobile: "010-0000-0000",
  team: "Media&nbsp;Lab.",
};

let defaultOptions = { ...options };

const newDialog = (opt = options) => {
  let dialog = new CommonDialog(opt);
  return dialog;
};

const Dialog = (isEditMode, opt = options) => {
  const dialog = newDialog(opt);

  const dialogSection = document.createElement("section");
  dialogSection.className = "dialog-box";

  const viewMode = `
  <form>
    <h1 class="dialog-title">
      <input type="text" name="title" readonly value=${dialog.title}>
    </h1>
    <ul>
      <li>
        <label for="id">ID</label>
        <input type="text" class="value-inputs" name="id" id="id" readonly value=${dialog.id}>
      </li>
      <li>
        <label for="email">Email</label>
        <input type="text" class="value-inputs" name="email" id="email" readonly value=${dialog.email}>
      </li>
      <li>
        <label for="name">Name</label>
        <input type="text" class="value-inputs" name="name" id="name" readonly value=${dialog.name}>
      </li>
      <li>
        <label for="mobile">Mobile</label>
        <input type="text" class="value-inputs" name="mobile" id="mobile" readonly value=${dialog.mobile}>
      </li>
      <li>
        <label for="team">Team</label>
        <input type="text" class="value-inputs" name="team" id="team" readonly value=${dialog.team}>
      </li>
    </ul>
    <div class="btns">
      <button type="button" class="edit-btn">Edit</button>
      <button type="button" class="close-btn">Close</button>
    </div>
  </form
  `;

  const editMode = `
  <form>
    <h1 class="dialog-title">
      <input type="text" name="title" value=${dialog.title}>
    </h1>
    <ul>
      <li>
        <label for="id">ID</label>
        <input type="text" class="value-inputs" name="id" id="id" readonly value=${dialog.id}>
      </li>
      <li>
        <label for="email">Email</label>
        <input type="text" class="value-inputs" name="mail" id="email" value=${dialog.email}>
      </li>
      <li>
        <label for="name">Name</label>
        <input type="text" class="value-inputs" name="name" id="name" value=${dialog.name}>
      </li>
      <li>
        <label for="mobile">Mobile</label>
        <input type="text" class="value-inputs" name="mobile" id="mobile" value=${dialog.mobile}>
      </li>
      <li>
        <label for="team">Team</label>
        <input type="text" class="value-inputs" name="team" id="team" readonly value=${dialog.team}>
      </li>
    </ul>
    <div class="btns">
      <button type="button" class="cancel-btn">Cancel</button>
      <button type="button" class="save-btn">Save</button>
    </div>
  </form>
`;

  isEditMode
    ? (dialogSection.innerHTML = editMode)
    : (dialogSection.innerHTML = viewMode);

  return dialogSection;
};

const onTextChange = (e) => {
  const { name, value } = e.target;
  options[name] = value;
};

const setViewEventListener = () => {
  const closeBtn = document.querySelector(".close-btn");
  closeBtn.addEventListener("click", newDialog().close);

  const editBtn = document.querySelector(".edit-btn");
  editBtn.addEventListener("click", () => newDialog().editable(true));
};

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
