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

const courseVerify = document.getElementById("course-verify");


course.addEventListener("focus", () => {
  hideMsg(courseVerify);

  course.classList.remove("invalid");
  course.classList.remove("valid");
});

course.addEventListener("blur", () => {
  const warningMsg = "Escolha um curso";

  showMsg(courseVerify);

  if (course.value === "") {
    showWarning(courseVerify, warningMsg);
    invalidField(course);
  } else {
    hideWarning(courseVerify);
    validField(course);
  }
});

const estado = document.getElementById("state");
const cidade = document.getElementById("city");

const stateVerify = document.getElementById("state-verify");
const cityVerify = document.getElementById("city-verify");

estado.addEventListener("focus", () => {
  hideMsg(stateVerify);

  estado.classList.remove("invalid");
  estado.classList.remove("valid");
});

estado.addEventListener("blur", () => {
  const warningMsg = "Escolha um estado";

  showMsg(stateVerify);

  if (estado.value === "") {
    showWarning(stateVerify, warningMsg);
    invalidField(estado);
  } else {
    hideWarning(stateVerify);
    validField(estado);
  }
});

cidade.addEventListener("focus", () => {
  hideMsg(cityVerify);

  cidade.classList.remove("invalid");
  cidade.classList.remove("valid");
});

cidade.addEventListener("blur", () => {
  const warningMsg = "Escolha uma cidade";

  showMsg(cityVerify);

  if (cidade.value === "") {
    showWarning(cityVerify, warningMsg);
    invalidField(cidade);
  } else {
    hideWarning(cityVerify);
    validField(cidade);
  }
});

const cidades = {
  "sao-paulo": ["São Paulo", "Campinas", "Santos"],
  "rio-de-janeiro": ["Rio de Janeiro", "Niterói", "Petrópolis"],
  "minas-gerais": ["Belo Horizonte", "Uberlândia", "Ouro Preto"],
  "espirito-santo": ["Vitória", "Vila Velha", "Guarapari"]
};

estado.addEventListener("change", function() {
  cidade.innerHTML = '<option value="">-- Selecione sua cidade --</option>';
  if (estado.value!=="") {
    cidade.disabled = false;
    cidades[estado.value].forEach(function(nomeCidade) {
    const option = document.createElement("option");
    option.value = nomeCidade;
    option.textContent = nomeCidade;
    cidade.appendChild(option);
    });
  } 
  else {
    cidade.disabled = true;
  }
});

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
