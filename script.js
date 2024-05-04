const numberContainer = document.getElementById('numberContainer');
const resetButton = document.getElementById('resetButton');

// Função para tratar o clique no número
function selectNumber(event) {
    const selectedNumber = event.currentTarget;

    // Verifica se o número já foi escolhido
    if (!selectedNumber.classList.contains('selected')) {
        const playerName = prompt('Por favor, digite seu nome:');

        if (playerName !== null && playerName.trim() !== '') {
            selectedNumber.classList.add('selected');
            const nameElement = selectedNumber.querySelector('.name');
            nameElement.innerHTML = playerName;

            // Armazena a informação no armazenamento local
            const numberIndex = Array.from(numberContainer.children).indexOf(selectedNumber);
            localStorage.setItem(`number_${numberIndex}`, playerName);
            localStorage.setItem(`number_${numberIndex}_selected`, true);
        }
    }
}

// Função para limpar todas as informações
function resetNumbers() {
    localStorage.clear();
    location.reload();
}

// Cria os números de 0 a 120
for (let i = 0; i <= 120; i++) {
    const numberElement = document.createElement('div');
    numberElement.classList.add('number-container');
    const number = document.createElement('div');
    number.classList.add('number');
    number.innerHTML = i;
    numberElement.appendChild(number);

    const name = document.createElement('div');
    name.classList.add('name');
    const storedName = localStorage.getItem(`number_${i}`);
    name.innerHTML = storedName ? storedName : '';
    numberElement.appendChild(name);

    // Verifica se o número está selecionado ao recarregar a página
    const selected = localStorage.getItem(`number_${i}_selected`);
    if (selected) {
        numberElement.classList.add('selected');
    }

    numberElement.addEventListener('click', selectNumber);
    numberContainer.appendChild(numberElement);
}

resetButton.addEventListener('click', resetNumbers);
