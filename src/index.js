import "./style.css";

const main = document.querySelector("main");

class CommonDialog {
  constructor(options) {
    this.title = options.title;
    this.ID = options.ID;
    this.Email = options.Email;
    this.Name = options.Name;
    this.Mobile = options.Mobile;
    this.Team = options.Team;
  }

  open() {
    main.className = "active";
    main.appendChild(Dialog(false));
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
      main.appendChild(Dialog(true));
      setEditEventListener();
    } else {
      main.appendChild(Dialog(false));
      setViewEventListener();
    }
  }

  onSave() {
    console.log("save");
  }

  onCancel() {
    console.log("save");
  }
}

let options = {
  title: "Test&nbsp;Title",
  ID: "Liveconnect",
  Email: "liveconnect@liveconnect.co.kr",
  Name: "liveconnect",
  Mobile: "010-0000-0000",
  Team: "Media&nbsp;Lab.",
};

let dialog = new CommonDialog(options);

const Dialog = (isEditMode) => {
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
        <input type="text" class="value-inputs" name="id" id="id" readonly value=${dialog.ID}>
      </li>
      <li>
        <label for="email">Email</label>
        <input type="text" class="value-inputs" name="email" id="email" readonly value=${dialog.Email}>
      </li>
      <li>
        <label for="name">Name</label>
        <input type="text" class="value-inputs" name="name" id="name" readonly value=${dialog.Name}>
      </li>
      <li>
        <label for="mobile">Mobile</label>
        <input type="text" class="value-inputs" name="mobile" id="mobile" readonly value=${dialog.Mobile}>
      </li>
      <li>
        <label for="team">Team</label>
        <input type="text" class="value-inputs" name="team" id="team" readonly value=${dialog.Team}>
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
        <input type="text" class="value-inputs" name="id" id="id" readonly value=${dialog.ID}>
      </li>
      <li>
        <label for="email">Email</label>
        <input type="text" class="value-inputs" name="email" id="email" value=${dialog.Email}>
      </li>
      <li>
        <label for="name">Name</label>
        <input type="text" class="value-inputs" name="name" id="name" value=${dialog.Name}>
      </li>
      <li>
        <label for="mobile">Mobile</label>
        <input type="text" class="value-inputs" name="mobile" id="mobile" value=${dialog.Mobile}>
      </li>
      <li>
        <label for="team">Team</label>
        <input type="text" class="value-inputs" name="team" id="team" readonly value=${dialog.Team}>
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

const setViewEventListener = () => {
  const closeBtn = document.querySelector(".close-btn");
  closeBtn.addEventListener("click", dialog.close);

  const editBtn = document.querySelector(".edit-btn");
  editBtn.addEventListener("click", () => dialog.editable(true));
};

const setEditEventListener = () => {
  const cancelBtn = document.querySelector(".cancel-btn");
  cancelBtn.addEventListener("click", () => dialog.editable(false));

  const saveBtn = document.querySelector(".save-btn");
};

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
