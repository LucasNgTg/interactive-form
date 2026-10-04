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

const pwd = document.getElementById("pwd");
const pwdStregth = document.getElementById("pwd-strength");

const reqNchar = document.getElementById("pwd-param__nchar");
const reqUpper = document.getElementById("pwd-param__upper");
const reqLower = document.getElementById("pwd-param__lower");
const reqNumber = document.getElementById("pwd-param__number");
const reqSpecial = document.getElementById("pwd-param__special");

const pwd2 = document.getElementById("pwd2");
const pwdConfirmVerify = document.getElementById("pwd-confirm-verify");


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


function scoreSenha(v)
{
  let p=0;
  if(v.length>=8) p+=30;
  if(/[A-Z]/.test(v)) p+=20;
  if(/[a-z]/.test(v)) p+=20;
  if(/[^A-Za-z0-9]/.test(v)) p+=15;
  if(/\d/.test(v)) p+=15;
  return Math.min(p,100);
}


function atualizarForçaSenha(e)
{
  const valor = e.target.value;
  if(valor.length===0)
  {
    pwdStregth.classList.add("hidden");
    return;
  }
  pwdStregth.classList.remove("hidden");

  const pts = scoreSenha(valor);

  pwdStregth.classList.remove("fraca","media","forte");

  if(pts<40)
  {
    pwdStregth.textContent = "Fraca";
    pwdStregth.classList.add("fraca");
    invalidField(pwd);
  }
  else if (pts<80)
  {
    pwdStregth.textContent = "Média";
    pwdStregth.classList.add("media");
    invalidField(pwd);
  }
  else 
  {
    pwdStregth.textContent = "Forte";
    pwdStregth.classList.add("forte");
    validField(pwd);
  }

  atualizarRequisitos(valor);

}

function atualizarRequisitos(v){
  toggleRequisito(reqNchar, v.length>=8);
  toggleRequisito(reqUpper, /[A-Z]/.test(v));
  toggleRequisito(reqLower, /[a-z]/.test(v));
  toggleRequisito(reqNumber, /\d/.test(v));
  toggleRequisito(reqSpecial, /[^A-Za-z0-9]/.test(v));
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

pwd.addEventListener("input", atualizarForçaSenha);

function validarConfirmaçãoSenha()
{
  if (pwd2.value.length === 0) {
    hideMsg(pwdConfirmVerify);
    pwd2.removeAttribute("aria-invalid");
    return;
  }
showMsg(pwdConfirmVerify);

if (pwd2.value === pwd.value) {
    pwdConfirmVerify.textContent = "As senhas coincidem";
    validField(pwd2);
  } else {
    pwdConfirmVerify.textContent = "As senhas devem ser idênticas";
    invalidField(pwd2);
  }
}

pwd2.addEventListener("input", validarConfirmaçãoSenha);

pwd.addEventListener("input", () => {
  if (pwd2.value.length > 0) {
    validarConfirmaçãoSenha();
  }
});