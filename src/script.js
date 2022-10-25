"use strict";
const form = document.querySelector(".form");
const modal = document.querySelector(".modal");

(() => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      event.stopPropagation();
    }

    form.classList.add("was-validated");

    const formattedFormData = {
      email: this.email.value,
      password: this.password.value,
    };

    postData(formattedFormData);
  });
})();

const postData = async (formattedFormData) => {
  const res = await fetch("login.php", {
    method: "POST",
    body: JSON.stringify(formattedFormData),
  });

  const data = await res.json();

  if (data.success) {
    window.location = `welcome.php?name=${data["0"].name}`;
  } else {
    console.log(form.email.value);
    if (form.email.value !== "" && form.password.value !== "")
      document.querySelector(".modal-btn").click();
  }
};
