"use strict";
const form = document.querySelector(".form");
const modal = document.querySelector(".modal");
const msg = document.querySelector(".modal-body");
const btnCloseModal = document.querySelector(".modal-btn-close");
const btnModal = document.querySelector(".modal-btn");
const labelTitle = document.querySelector(".modal-title");
const btnClose = document.querySelector(".btn-close");

(() => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      event.stopPropagation();
    }

    form.classList.add("was-validated");

    if (this.password.value !== this.confirmPassword.value) {
      if (btnCloseModal.classList.contains("btn-success"))
        btnCloseModal.classList.remove("btn-success");

      btnCloseModal.classList.add("btn-danger");
      msg.textContent = "Passwords do not match";
      labelTitle.textContent = "Error";
      btnModal.click();
      return;
    }

    const formattedFormData = {
      email: this.email.value,
      password: this.password.value,
      name: this.username.value,
    };

    postData(formattedFormData);
  });
})();

const postData = async (formattedFormData) => {
  const res = await fetch("register.php", {
    method: "POST",
    body: JSON.stringify(formattedFormData),
  });

  const data = await res.json();
  console.log(data);

  if (data.success) {
    if (btnCloseModal.classList.contains("btn-danger"))
      btnCloseModal.classList.remove("btn-danger");
    btnCloseModal.classList.add("btn-success");
    msg.textContent = data.message;
    labelTitle.textContent = "Congratulations";
    btnModal.click();
  } else {
    if (btnCloseModal.classList.contains("btn-success"))
      btnCloseModal.classList.remove("btn-success");
    btnCloseModal.classList.add("btn-danger");
    msg.textContent = data.message;
    labelTitle.textContent = "Error";
    btnModal.click();
  }
};

const close = () => {
  if (btnCloseModal.classList.contains("btn-success")) {
    window.location = "index.html";
  }
};

btnCloseModal.addEventListener("click", close);
btnClose.addEventListener("click", close);
