let boxes = document.querySelectorAll('.box');
let reset = document.querySelector('.reset');
let turn0 = true;
let newGame = document.querySelector('.new');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');
let nGame = document.querySelector('#nGame');
let draw = document.querySelector('.msg-draw'); 
let newGame2 = document.querySelector('.new2');



const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "O";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const checkWinner = () => {
    let hasWinner = false;
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            hasWinner = true;
        }
    }
    if (!hasWinner) {
        checkdraw(); // Only check for a draw if no winner is found
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove('hide');
    disableBoxes();
};

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add('hide');
    draw.classList.add('hide'); // Hide the draw message as well
};

newGame.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
newGame2.addEventListener("click", resetGame);
const checkdraw = () => {
    let isDraw = [...boxes].every(box => box.innerText !== ""); // Check if all boxes are filled
    if (isDraw) {
        gameDraw();
    }
};

const gameDraw = () => {
    nGame.innerText = 'The game is a draw';
    draw.classList.remove('hide');
    disableBoxes();
};
