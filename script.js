const nome = document.getElementById("name");
const ajudaNome = document.getElementById("ajuda-nome");
const espelho = document.getElementById("espelho");
const contador = document.getElementById("contador");
const numRestantes = document.getElementById("num-restantes");
const limite = 50;

const email = document.getElementById("email");
const emailVerify = document.getElementById("email-verify");

const emailRegex =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

const termsText = document.getElementById("terms-text");
const termsCheck = document.getElementById("terms-check");

// Validação de nome
nome.addEventListener(
  "input",
  debounce((e) => {
    if (e.target.value.length > limite) {
      e.target.value = e.target.value.slice(0, limite);
    }
    atualizarQuantidade(e.target.value);
  }, 150),
);

ajudaNome.textContent = `${limite}`;
contador.textContent = `0/${limite}`;
numRestantes.textContent = `${limite}`;

// Validação de e-mail
email.addEventListener("focus", () => {
  hideMsg(emailVerify);
});

email.addEventListener("blur", () => {
  const successMsg = "E-mail válido";
  const warningMsg = "E-mail inválido";

  showMsg(emailVerify);

  if (!emailRegex.test(email.value)) {
    emailVerify.textContent = warningMsg;
    invalidField(email);
  } else {
    emailVerify.textContent = successMsg;
    validField(email);
  }
});

// Habilitação do aceite
termsText.addEventListener("scroll", () => {
  if (termsText.scrollTop + termsText.clientHeight >= termsText.scrollHeight) {
    termsCheck.removeAttribute("disabled");
  }
})

termsCheck.addEventListener("change", (e) => {
  if (e.target.checked) {
    validField(termsCheck);
  } else {
    invalidField(termsCheck);
  }
})

function debounce(fn, delay = 200) {
  let id;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => fn(...args), delay);
  };
}
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

function invalidField(field) {
  field.setAttribute("aria-invalid", "true");
}

function validField(field) {
  field.setAttribute("aria-invalid", "false");
}

function atualizarQuantidade(valor) {
  const usados = valor.length;
  const restantes = limite - usados;
  contador.textContent = `${usados}/${limite}`;
  numRestantes.textContent = `${restantes}`;
  nome.setAttribute("aria-invalid", (usados >= limite || usados === 0) ? "true" : "false");
}
