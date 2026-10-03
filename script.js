const email = document.getElementById("email");
const emailVerify = document.getElementById("email-verify");

const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

  // Validação de e-mail
email.addEventListener("focus", () => {
  hideMsg(emailVerify);

  email.classList.remove("invalid");
  email.classList.remove("valid");
})

email.addEventListener("blur", () => {
  const successMsg = "E-mail válido";
  const warningMsg = "E-mail inválido";

  showMsg(emailVerify);

  if (!emailRegex.test(email.value)) {
    hideSuccess(emailVerify);
    showWarning(emailVerify, warningMsg);
    invalidField(email);
  } else {
    hideWarning(emailVerify);
    showSuccess(emailVerify, successMsg);
    validField(email);
  }
})

function showMsg(verify) {
  verify.classList.remove("hidden");
  verify.setAttribute("aria-hidden", "false");
}

function hideMsg(verify) {
  verify.textContent = "";
  verify.classList.add("hidden");
  verify.setAttribute("aria-hidden", "true");
}

function showWarning(verify, warningMsg) {
  verify.textContent = warningMsg;
  verify.classList.add("warning");
}

function hideWarning(verify) {
  verify.classList.remove("warning");
}

function showSuccess(verify, successMsg) {
  verify.textContent = successMsg;
  verify.classList.add("success");
}

function hideSuccess(verify) {
  verify.classList.remove("success");
}

function invalidField(field) {
  field.classList.remove("valid");
  field.classList.add("invalid");
}

function validField(field) {
  field.classList.remove("invalid");
  field.classList.add("valid");
}
