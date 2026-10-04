const nome = document.getElementById("name");
const ajudaNome = document.getElementById("ajuda-nome");
const espelho = document.getElementById("espelho");
const contador = document.getElementById("contador");
const numRestantes = document.getElementById("num-restantes");

const email = document.getElementById("email");
const emailVerify = document.getElementById("email-verify");

const courseVerify = document.getElementById("course-verify");

const estado = document.getElementById("state");
const cidade = document.getElementById("city");

const stateVerify = document.getElementById("state-verify");
const cityVerify = document.getElementById("city-verify");

const termsText = document.getElementById("terms-text");
const termsCheck = document.getElementById("terms-check");

const limite = 50;

const emailRegex =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

const cidades = {
  "sao-paulo": ["São Paulo", "Campinas", "Santos"],
  "rio-de-janeiro": ["Rio de Janeiro", "Niterói", "Petrópolis"],
  "minas-gerais": ["Belo Horizonte", "Uberlândia", "Ouro Preto"],
  "espirito-santo": ["Vitória", "Vila Velha", "Guarapari"],
};

// Validação de nome
nome.addEventListener("input",
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

// Validação do curso
course.addEventListener("focus", () => {
  hideMsg(courseVerify);
});

course.addEventListener("blur", () => {
  const warningMsg = "Escolha um curso";

  if (course.value === "") {
    courseVerify.textContent = warningMsg;
    showMsg(courseVerify);
    invalidField(course);
  } else {
    hideMsg(courseVerify);
    validField(course);
  }
});

// Validação do Estado
estado.addEventListener("focus", () => {
  hideMsg(stateVerify);
});

estado.addEventListener("blur", () => {
  const warningMsg = "Escolha um estado";

  if (estado.value === "") {
    stateVerify.textContent = warningMsg;
    showMsg(stateVerify);
    invalidField(estado);
  } else {
    hideMsg(stateVerify);
    validField(estado);
  }
});

// Validação da cidade
cidade.addEventListener("focus", () => {
  hideMsg(cityVerify);
});

cidade.addEventListener("blur", () => {
  const warningMsg = "Escolha uma cidade";

  if (cidade.value === "") {
    cityVerify.textContent = warningMsg;
    showMsg(cityVerify);
    invalidField(cidade);
  } else {
    hideMsg(cityVerify);
    validField(cidade);
  }
});

estado.addEventListener("change", () => {
  cidade.innerHTML =
    '<option value="" disabled selected>-- Selecione sua cidade --</option>';
  if (estado.value !== "") {
    cidade.disabled = false;

    cidades[estado.value].forEach((nomeCidade) => {
      const option = document.createElement("option");

      option.value = nomeCidade;
      option.textContent = nomeCidade;
      cidade.appendChild(option);
    });
  } else {
    cidade.disabled = true;
  }
});

// Habilitação do aceite
termsText.addEventListener("scroll", () => {
  if (termsText.scrollTop + termsText.clientHeight >= termsText.scrollHeight) {
    termsCheck.removeAttribute("disabled");
  }
});

termsCheck.addEventListener("change", (e) => {
  if (e.target.checked) {
    validField(termsCheck);
  } else {
    invalidField(termsCheck);
  }
});

// Funções auxiliares
function debounce(fn, delay = 200) {
  let id;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => fn(...args), delay);
  };
}

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
  nome.setAttribute("aria-invalid", usados >= limite || usados === 0 ? "true" : "false");
}
