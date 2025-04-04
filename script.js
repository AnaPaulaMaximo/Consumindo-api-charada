const baseUrl = "https://gerador-de-charadas-ashen.vercel.app";
const aleatorio = "/charadas";

// Elementos do DOM
const charadaElement = document.getElementById("charada");
const input_resposta = document.getElementById("input_resposta");
const submitButton = document.getElementById("submit-btn");
const novaCharadaButton = document.getElementById("nova-charada-btn");
const result = document.getElementById("result");
const resultText = document.getElementById("result-text");
const respostaElement = document.getElementById("resposta");

let respostaCorreta;


// Função para buscar uma nova charada
async function getCharada() {
    try {
        const response = await fetch(baseUrl + aleatorio);
        const data = await response.json();
        
        charadaElement.textContent = data.resposta;  // Exibe a charada
        respostaCorreta = data.texto;  // Guarda a resposta correta
        
        input_resposta.value = "";
        input_resposta.focus();
        result.classList.add("hidden");
        respostaElement.classList.add("hidden");

    } catch (erro) {
        console.error("Erro ao chamar a API: ", erro);
        charadaElement.textContent = "Erro ao carregar a charada. Tente novamente!";
    }
}

// Função para verificar a resposta do usuário
function checkAnswer() {
    const respostaUsuario = input_resposta.value.trim().toLowerCase();
    const correto = respostaUsuario === respostaCorreta;

    result.classList.remove("hidden");
    resultText.textContent = correto 
        ? "Parabéns! Você acertou!" 
        : "Ops! Não foi dessa vez...";

    // Exibir a resposta correta apenas se o usuário errar
    respostaElement.textContent = `Resposta correta: ${respostaCorreta}`;
    respostaElement.classList.toggle("hidden", correto);

    if (!correto) {
        input_resposta.value = "";
        input_resposta.focus();
    }
}

// Eventos
submitButton.addEventListener("click", checkAnswer);
novaCharadaButton.addEventListener("click", getCharada);
input_resposta.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkAnswer();
    }
});

// Carregar a primeira charada ao iniciar
getCharada();
