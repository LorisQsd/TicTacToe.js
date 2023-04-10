const currentGame = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const slot = document.querySelectorAll(".slot")
const tour = document.querySelector("#tour")
const endGame = document.querySelector("h2")
let cross = false;

slot.forEach((el, index) => {
    let clickPossible;
    let isendofgame;
    el.addEventListener("click", handleMove)

    function handleMove() {
        if (clickPossible) return;
        //MAKE MOVE
        clickPossible = true;
        if (!cross) {
            nextMove("O", "X", true);
            checkResult();
            if (isendofgame !== true) {
                checkFullGame();
            }
        } else {
            nextMove("X", "O", false);
            checkResult();
            if (isendofgame !== true) {
                checkFullGame();
            }
        }

        function nextMove(move, nextTour, switchCross) {
            el.textContent = move;
            tour.textContent = nextTour;
            currentGame[index] = move;
            cross = switchCross;
        }

        //CHECK RESULT
        function checkResult() {
            winningCombinations.forEach(arr => {
                let scoreO = 0;
                let scoreX = 0;

                arr.forEach(el => {
                    if (currentGame[el] === "O") {
                        scoreO++;
                        if (scoreO === 3) {
                            endGame.textContent = "Le joueur O a gagné la partie ! Appuyez sur F5 pour recommencer.";
                            slot.forEach(el => { el.style.pointerEvents = "none" })
                            isendofgame = true;
                        }
                    } else if (currentGame[el] === "X") {
                        scoreX++;
                        if (scoreX === 3) {
                            endGame.textContent = "Le joueur X a gagné la partie ! Appuyez sur F5 pour recommencer.";
                            slot.forEach(el => { el.style.pointerEvents = "none" })
                            isendofgame = true;
                        }
                    }
                })
            })
        }

        //CHECK FULLGAME
        function checkFullGame() {
            let fullGame = 0;
            currentGame.forEach(el => {
                if (el !== "") {
                    fullGame++
                }
                if (fullGame === 9) {
                    endGame.textContent = "Aucun des joueurs n'a gagné, appuyez sur F5 pour recommencer la partie"
                }
            })
        }
    }
})