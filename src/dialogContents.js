const dialogContents = (isEditMode, dialog) => {
  const innerContents = `
  <form>
  <h1 class="dialog-title">
    <input type="text" name="title" ${!isEditMode && "readonly"} value=${
    dialog.title
  }>
  </h1>
  <ul>
    <li>
      <label for="id">ID</label>
      <input type="text" class="value-inputs" name="id" id="id" readonly value=${
        dialog.id
      }>
    </li>
    <li>
      <label for="email">Email</label>
      <input type="text" class="value-inputs" name="email" id="email" ${
        !isEditMode && "readonly"
      } value=${dialog.email}>
    </li>
    <li>
      <label for="name">Name</label>
      <input type="text" class="value-inputs" name="name" id="name" ${
        !isEditMode && "readonly"
      } value=${dialog.name}>
    </li>
    <li>
      <label for="mobile">Mobile</label>
      <input type="text" class="value-inputs" name="mobile" id="mobile" ${
        !isEditMode && "readonly"
      } value=${dialog.mobile}>
    </li>
    <li>
      <label for="team">Team</label>
      <input type="text" class="value-inputs" name="team" id="team" readonly value=${
        dialog.team
      }>
    </li>
  </ul>
  <div class="btns">
  ${
    isEditMode
      ? `  
      <button type="button" class="cancel-btn">Cancel</button>
      <button type="button" class="save-btn">Save</button>`
      : `  
      <button type="button" class="edit-btn">Edit</button>
      <button type="button" class="close-btn">Close</button>`
  }
  </div>
  </form
  `;

  return innerContents;
};

export default dialogContents;
