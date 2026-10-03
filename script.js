
const nome = document.getElementById("name")
const ajudaNome = document.getElementById("ajuda-nome")
const espelho = document.getElementById("espelho")
const contador = documente.getElementById("contador")
const limite = 50

function debounce(fn, delay = 200)
{
    let id;
    return(...args)=>
    {
        clearTimeout(id);
        id = setTimeout(() => fn(...args),delay);
    };
}

function atualizarQuantidade(valor)
{
    espelho.textContent = 'Você digitou: ${valor}';
    const usados = valor.length;
    const restantes = limite-usados;
    contador.textContent = 'Caracteres: ${usados}/${limite}(retam ${retantes})';
    nome.setAtrribute("aria-invalid", usados>limite? "true" : "false");
    nome.style.border = usados>limite? "crimson": --color-warning;
}

nome.addEventListener("input", debounce((e)=>
{
    if(e.target.value.lenght>limite)
    {
        e.target.value = e.target.value.slice(0,limite);
    }
    atualizarQuantidade(e.target.value);
}; 150));

atualizarQuantidade("");
