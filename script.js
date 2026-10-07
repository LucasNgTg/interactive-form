const nome = document.getElementById("name");
const ajudaNome1 = document.getElementById("ajuda-nome-1");
const ajudaNome = document.getElementById("ajuda-nome");
const espelho = document.getElementById("espelho");
const contador = document.getElementById("contador");
const numRestantes = document.getElementById("num-restantes");

const email = document.getElementById("email");
const emailVerify = document.getElementById("email-verify");

const courseVerify = document.getElementById("course-verify");
const course = document.getElementById("course");

const estado = document.getElementById("state");
const cidade = document.getElementById("city");

const stateVerify = document.getElementById("state-verify");
const cityVerify = document.getElementById("city-verify");

const termsText = document.getElementById("terms-text");
const termsCheck = document.getElementById("terms-check");

const pwd = document.getElementById("pwd");
const pwdStrength = document.getElementById("pwd-strength");

const reqNchar = document.getElementById("pwd-param__nchar");
const reqUpper = document.getElementById("pwd-param__upper");
const reqLower = document.getElementById("pwd-param__lower");
const reqNumber = document.getElementById("pwd-param__number");
const reqSpecial = document.getElementById("pwd-param__special");

const pwd2 = document.getElementById("pwd2");
const pwdConfirmVerify = document.getElementById("pwd-confirm-verify");

const submitBtn = document.getElementById("submit-btn");

const limite = 50;
const minimo = 3;

const msgSucesso = document.getElementById("msg-sucesso");

const emailRegex =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

const cidades = {
  "sao-paulo": ["São Paulo", "Campinas", "Santos"],
  "rio-de-janeiro": ["Rio de Janeiro", "Niterói", "Petrópolis"],
  "minas-gerais": ["Belo Horizonte", "Uberlândia", "Ouro Preto"],
  "espirito-santo": ["Vitória", "Vila Velha", "Guarapari"],
};

//Esconde a mensagem de sucesso de envio ao modificar algum campo
nome.addEventListener("input", () => hideMsg(msgSucesso));
email.addEventListener("input", () => hideMsg(msgSucesso));
course.addEventListener("change", () => hideMsg(msgSucesso));
estado.addEventListener("change", () => hideMsg(msgSucesso));
cidade.addEventListener("change", () => hideMsg(msgSucesso));
pwd.addEventListener("input", () => hideMsg(msgSucesso));
pwd2.addEventListener("input", () => hideMsg(msgSucesso));
termsCheck.addEventListener("change", () => hideMsg(msgSucesso));

// Validação de nome
nome.addEventListener(
  "input",
  debounce((e) => {
    if (e.target.value.length > limite) {
      e.target.value = e.target.value.slice(0, limite);
    }
    atualizarQuantidade(e.target.value);
    revalidar();
  }, 150),
);

ajudaNome.textContent = `${minimo}`;
ajudaNome1.textContent = `${limite}`;
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

  revalidar();
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
  revalidar();
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
  revalidar();
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
  revalidar();
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
  revalidar();
});

// Validação da senha
pwd.addEventListener("input", (e) => {
  const notAllowedChars = /[^A-Za-z0-9!@#$%^&*]/;

  e.target.value = e.target.value.replace(notAllowedChars, "");

  atualizarForcaSenha(e);
  revalidar();
});

// Habilitação do aceite
termsText.addEventListener("scroll", () => {
  const tolerancia = 4;
  if (termsText.scrollTop + termsText.clientHeight >= termsText.scrollHeight-tolerancia) {
    termsCheck.removeAttribute("disabled");
  }
});

termsCheck.addEventListener("change", (e) => {
  if (e.target.checked) {
    validField(termsCheck);
  } else {
    invalidField(termsCheck);
  }
  revalidar();
});

submitBtn.addEventListener("click", (e) => {
  preventDefault();
  limpar();
})

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
  nome.setAttribute("aria-invalid", usados >= limite || usados < 3 ? "true" : "false");
}

function testReq(v) {
  const requirements = [
    v.length >= 8, // tamanho da senha
    /[A-Z]/.test(v), // letras maiúsculas
    /[a-z]/.test(v), // letras minúsculas
    /\d/.test(v), // números
    /[!@#$%^&*]/.test(v), // caracteres especiais
  ];

  return requirements;
}

function pwdReq(v) {
  const reqs = testReq(v);

  const trueCount = reqs.filter(Boolean).length;
  return trueCount;
}

function atualizarForcaSenha(e) {
  const valor = e.target.value;
  if (valor.length === 0) {
    pwdStrength.classList.add("hidden");
  } else {
    pwdStrength.classList.remove("hidden");

    const pts = pwdReq(valor);

    pwdStrength.classList.remove("fraca", "media", "forte");

    if (pts < 3) {
      pwdStrength.textContent = "Fraca";
      pwdStrength.classList.add("fraca");
      invalidField(pwd);
    } else if (pts < 5) {
      pwdStrength.textContent = "Média";
      pwdStrength.classList.add("media");
      invalidField(pwd);
    } else {
      pwdStrength.textContent = "Forte";
      pwdStrength.classList.add("forte");
      validField(pwd);
    }
  }

  atualizarRequisitos(valor);
}

function atualizarRequisitos(v) {
  const reqs = testReq(v);

  toggleRequisito(reqNchar, reqs[0]);
  toggleRequisito(reqUpper, reqs[1]);
  toggleRequisito(reqLower, reqs[2]);
  toggleRequisito(reqNumber, reqs[3]);
  toggleRequisito(reqSpecial, reqs[4]);
}

function toggleRequisito(elemento, condicao) {
  if (condicao) {
    elemento.classList.add("valido");
    elemento.classList.remove("invalido");
  } else {
    elemento.classList.remove("valido");
    elemento.classList.add("invalido");
  }
}

function validarConfirmacaoSenha() {
  if (pwd2.value.length === 0) {
    hideMsg(pwdConfirmVerify);
    pwd2.removeAttribute("aria-invalid");
    return false;
  }
  showMsg(pwdConfirmVerify);

  if (pwd2.value === pwd.value) {
    pwdConfirmVerify.textContent = "As senhas coincidem";
    validField(pwd2);
  } else {
    pwdConfirmVerify.textContent = "As senhas devem ser idênticas";
    invalidField(pwd2);
  }

  return true;
}

pwd2.addEventListener("input", validarConfirmacaoSenha);

pwd.addEventListener("input", () => {
  if (pwd2.value.length > 0) {
    validarConfirmacaoSenha();
  }
});

function limpar() {
  nome.value = "";
  email.value = "";
  course.value = "";
  estado.value = "";
  cidade.value = "";
  pwd.value = "";
  pwd2.value = "";
  termsCheck.checked = false;
  
  cidade.disabled = true;
  contador.textContent = `0/${limite}`;
  numRestantes.textContent = `${limite}`;
  pwdStrength.classList.add("hidden");

  const inputs = [nome, email, course, estado, cidade, pwd, pwd2, termsCheck];
  inputs.forEach(input => {
    input.removeAttribute("aria-invalid");
  });

  hideMsg(emailVerify);
  hideMsg(courseVerify);
  hideMsg(stateVerify);
  hideMsg(cityVerify);
  hideMsg(pwdConfirmVerify);

  contador.textContent = `0/${limite}`;
  numRestantes.textContent = `${limite}`;
  pwdStrength.classList.add("hidden");
  pwdStrength.textContent = "";
}

function revalidar() {
  const okNome = nome.value.length >= 3 && nome.value.length <= 50;
  const okEmail = emailRegex.test(email.value);
  const okCurso = course.value;
  const okEstado = estado.value;
  const okCidade = cidade.value;
  const okSenha = pwdReq(pwd.value) === 5;
  const okconfirmSenha = validarConfirmacaoSenha();
  const okTerms = termsCheck.checked;

  const okTudo = okNome && okEmail && okCurso && okEstado && okCidade && okSenha && okconfirmSenha && okTerms;

  if (okTudo) {
    submitBtn.disabled = false;
  } else{
    submitBtn.disbled = true;
  }
}

submitBtn.addEventListener("click", (e) =>{
  e.preventDefault();

  
  limpar();
  showMsg(msgSucesso);
});
