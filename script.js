const imagePaths = [
    { name: "Bầu", img: './imgs/gourd.png' },
    { name: 'Cua', img: './imgs/crab.png' },
    { name: "Tôm", img: './imgs/shrimp.png' },
    { name: "Cá", img: './imgs/fish.png' },
    { name: "Nai", img: './imgs/deer.png' },
    { name: "Gà", img: './imgs/chicken.png' }
];

const imageElement = document.querySelectorAll(".result");
const betCell = document.querySelectorAll(".bet-cell");
const playBtn = document.querySelector(".play-button button");
const resetBtn = document.querySelector(".reset-button button");

let isPlaying = false;

function playRound() {
    const gameResult = [];
    const yourChoice = [];

    function handleClick(e) {
        if (yourChoice.length >= 3) return; 
        const choice = e.target.closest(".bet-cell");
        let choiceNumber = choice.querySelector(".bet-number");
        let count = parseInt(choiceNumber.textContent);
        yourChoice.push(choice.dataset.name);
        count++;
        choiceNumber.textContent = count;
    }

    playBtn.addEventListener('click', () => {
        console.clear();
        if (isPlaying) return;
        isPlaying = true;

        playBtn.disabled = true;
        resetBtn.disabled = true;
        betCell.forEach(cell => cell.classList.add('disabled'));

        gameResult.splice(0, gameResult.length);

        imageElement.forEach((cell, index) => {
            let counter = 0;
            const maxIterations = 100;
            const interval = 50;
            const randomImageInterval = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * imagePaths.length);
                cell.innerHTML = `
                    <img src="${imagePaths[randomIndex].img}" alt="Result image">
                `;
                counter++;
                if (counter >= maxIterations) {
                    clearInterval(randomImageInterval);
                    gameResult.push(imagePaths[randomIndex].name);
                    if (index === imageElement.length - 1) {
                        isPlaying = false;
                        playBtn.disabled = false;
                        resetBtn.disabled = false;
                        betCell.forEach(cell => cell.classList.remove('disabled'));
                        checkWin(gameResult, yourChoice);
                    }
                }
            }, interval);
        });
    });

    betCell.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });

    resetBtn.addEventListener('click', () => {
        yourChoice.splice(0, yourChoice.length);
        document.querySelectorAll(".bet-number").forEach(cell => (cell.textContent = "0"));
        betCell.forEach(cell => cell.addEventListener('click', handleClick));
    });
}

function countOccurrences(arr) {
    const counts = {};
    arr.forEach(value => {
        counts[value] = (counts[value] || 0) + 1;
    });
    return Object.entries(counts)
        .map(([value, count]) => `${value}: ${count}`)
        .join(", ");
}

function checkWin(arr1, arr2) {
    const sortedArr1 = [...arr1].sort();
    const sortedArr2 = [...arr2].sort();
    if (JSON.stringify(sortedArr1) === JSON.stringify(sortedArr2)) {
        console.log(`Bạn đã đúng với kết quả: ${countOccurrences(arr1)}`);
    } else {
        console.log(`Bạn đã sai với kết quả: ${countOccurrences(arr1)}`);
    }
}

playRound();
