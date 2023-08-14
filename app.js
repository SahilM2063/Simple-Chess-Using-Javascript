
const gameBoard = document.querySelector("#gameboard");
const playerDetails = document.querySelector("#player");
const infoDisplay = document.querySelector("#info-display");
const err = document.querySelector("#err");
const width = 8

let playerTurn = 'black';
playerDetails.textContent = 'black'

const startPieces = [
    Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook,
    Pawn, Pawn, Pawn, Pawn, Pawn, Pawn, Pawn, Pawn,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    Pawn, Pawn, Pawn, Pawn, Pawn, Pawn, Pawn, Pawn,
    Rook, Knight, Bishop, King, Queen, Bishop, Knight, Rook,
]

function createBoard() {
    startPieces.forEach((startPiece, i) => {
        const square = document.createElement("div");
        square.classList.add("square");
        square.innerHTML = startPiece

        square.setAttribute("square-id", i);
        square.firstChild?.setAttribute('draggable', true)

        const row = Math.floor((63 - i) / 8) + 1;

        if (row % 2 === 0) {
            square.classList.add(i % 2 == 0 ? "beige" : "brown");
        } else {
            square.classList.add(i % 2 == 0 ? "brown" : "beige");
        }

        if (i <= 15) {
            square.firstChild.firstChild.classList.add("black");
        }
        if (i >= 48) {
            square.firstChild.firstChild.classList.add("white");
        }


        gameBoard.append(square);
    });
};

createBoard();


const allSquares = document.querySelectorAll("#gameboard .square");
// console.log(allSquares)

allSquares.forEach(square => {
    square.addEventListener('dragstart', dragstart);
    square.addEventListener('dragover', dragover);
    square.addEventListener('drop', dragdrop);
})

let startPositionId
let draggedElement

function dragstart(e) {
    startPositionId = e.target.parentNode.getAttribute("square-id")
    draggedElement = e.target
}

function dragover(e) {
    e.preventDefault();
}

function dragdrop(e) {
    e.stopPropagation();

    // console.log('player go', playerTurn)
    // console.log('target', e.target)
    // console.log(draggedElement)

    const correctTurn = draggedElement.firstChild.classList.contains(playerTurn);
    const taken = e.target.classList.contains('piece');
    const valid = checkIfValid(e.target);
    const opponentTurn = playerTurn === 'white' ? 'black' : 'white';
    const takenByOpponent = e.target.firstChild?.classList.contains(opponentTurn);
    // console.log('opp go', opponentTurn)


    if (correctTurn) {
        // must check this condition
        if (takenByOpponent && valid) {
            e.target.parentNode.append(draggedElement);
            e.target.remove();
            checkForWin();
            changePlayer();
            return
        }
        if (taken && !takenByOpponent) {
            err.textContent = 'Can not go there'
            setTimeout(() => {
                err.textContent = ''
            }, 2000);
            return
        }
        if (valid) {
            e.target.append(draggedElement);
            checkForWin();
            changePlayer();
            return
        }
    }
}

function checkIfValid(target) {
    const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'));
    const startId = Number(startPositionId);
    const piece = draggedElement.id
    console.log(startId, targetId, piece)

    switch (piece) {
        case 'pawn':
            const starterRow = [8, 9, 10, 11, 12, 13, 14, 15];
            if (starterRow.includes(startId) && startId + width * 2 === targetId ||
                startId + width === targetId ||
                startId + width - 1 === targetId && document.querySelector(`[square-id = "${startId + width - 1}"]`).firstChild ||
                startId + width + 1 === targetId && document.querySelector(`[square-id = "${startId + width + 1}"]`).firstChild) {
                return true;
            }
            break;
        case 'knight':
            if (
                startId + width * 2 + 1 === targetId ||
                startId + width * 2 - 1 === targetId ||
                startId + width - 2 === targetId ||
                startId + width + 2 === targetId ||
                startId - width * 2 + 1 === targetId ||
                startId - width * 2 - 1 === targetId ||
                startId - width + 2 === targetId ||
                startId - width - 2 === targetId
            ) {
                return true
            }
            break;

        case 'bishop':
            if (
                // for right cross --- forward
                startId + width + 1 === targetId ||
                startId + width * 2 + 2 === targetId && !document.querySelector(`[square-id = "${startId + width + 1}"]`).firstChild ||
                startId + width * 3 + 3 === targetId && !document.querySelector(`[square-id = "${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`).firstChild ||
                startId + width * 4 + 4 === targetId && !document.querySelector(`[square-id = "${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 3 + 3}"]`).firstChild ||
                startId + width * 5 + 5 === targetId && !document.querySelector(`[square-id = "${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 4 + 4}"]`).firstChild ||
                startId + width * 6 + 6 === targetId && !document.querySelector(`[square-id = "${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 5 + 5}"]`).firstChild ||
                startId + width * 7 + 7 === targetId && !document.querySelector(`[square-id = "${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 6 + 6}"]`).firstChild ||

                // for left cross --- forward
                startId + width - 1 === targetId ||
                startId + width * 2 - 2 === targetId && !document.querySelector(`[square-id = "${startId + width - 1}"]`).firstChild ||
                startId + width * 3 - 3 === targetId && !document.querySelector(`[square-id = "${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 2 - 2}"]`).firstChild ||
                startId + width * 4 - 4 === targetId && !document.querySelector(`[square-id = "${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 3 - 3}"]`).firstChild ||
                startId + width * 5 - 5 === targetId && !document.querySelector(`[square-id = "${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 4 - 4}"]`).firstChild ||
                startId + width * 6 - 6 === targetId && !document.querySelector(`[square-id = "${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 5 - 5}"]`).firstChild ||
                startId + width * 7 - 7 === targetId && !document.querySelector(`[square-id = "${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 6 - 6}"]`).firstChild ||

                // for right cross --- backward
                startId - width - 1 === targetId ||
                startId - width * 2 - 2 === targetId && !document.querySelector(`[square-id = "${startId - width - 1}"]`).firstChild ||
                startId - width * 3 - 3 === targetId && !document.querySelector(`[square-id = "${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 2 - 2}"]`).firstChild ||
                startId - width * 4 - 4 === targetId && !document.querySelector(`[square-id = "${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 3 - 3}"]`).firstChild ||
                startId - width * 5 - 5 === targetId && !document.querySelector(`[square-id = "${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 4 - 4}"]`).firstChild ||
                startId - width * 6 - 6 === targetId && !document.querySelector(`[square-id = "${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 5 - 5}"]`).firstChild ||
                startId - width * 7 - 7 === targetId && !document.querySelector(`[square-id = "${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 6 - 6}"]`).firstChild ||

                // fot left cross -- backward
                startId - width + 1 === targetId ||
                startId - width * 2 + 2 === targetId && !document.querySelector(`[square-id = "${startId - width + 1}"]`).firstChild ||
                startId - width * 3 + 3 === targetId && !document.querySelector(`[square-id = "${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 2 + 2}"]`).firstChild ||
                startId - width * 4 + 4 === targetId && !document.querySelector(`[square-id = "${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 3 + 3}"]`).firstChild ||
                startId - width * 5 + 5 === targetId && !document.querySelector(`[square-id = "${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 4 + 4}"]`).firstChild ||
                startId - width * 6 + 6 === targetId && !document.querySelector(`[square-id = "${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 5 + 5}"]`).firstChild ||
                startId - width * 7 + 7 === targetId && !document.querySelector(`[square-id = "${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 6 + 6}"]`).firstChild
            ) {
                return true;
            }
            break;

        case 'rook':
            if (
                // moving straight forward
                startId + width === targetId ||
                startId + width * 2 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild ||
                startId + width * 3 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild ||
                startId + width * 4 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild ||
                startId + width * 5 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild ||
                startId + width * 6 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5}"]`).firstChild ||
                startId + width * 7 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6}"]`).firstChild ||

                // moving straight backward
                startId - width === targetId ||
                startId - width * 2 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild ||
                startId - width * 3 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild ||
                startId - width * 4 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild ||
                startId - width * 5 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild ||
                startId - width * 6 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild ||
                startId - width * 7 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6}"]`).firstChild ||

                // moving left side straight
                startId + 1 === targetId ||
                startId + 2 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild ||
                startId + 3 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild ||
                startId + 4 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild ||
                startId + 5 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild ||
                startId + 6 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5}"]`).firstChild ||
                startId + 7 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + 6}"]`).firstChild ||

                // moving right side straight
                startId - 1 === targetId ||
                startId - 2 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild ||
                startId - 3 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild ||
                startId - 4 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild ||
                startId - 5 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild ||
                startId - 6 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5}"]`).firstChild ||
                startId - 7 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - 6}"]`).firstChild
            ) {
                return true
            }
            break;

        case 'queen':
            if (
                // for right cross --- forward
                startId + width + 1 === targetId ||
                startId + width * 2 + 2 === targetId && !document.querySelector(`[square-id = "${startId + width + 1}"]`).firstChild ||
                startId + width * 3 + 3 === targetId && !document.querySelector(`[square-id = "${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`).firstChild ||
                startId + width * 4 + 4 === targetId && !document.querySelector(`[square-id = "${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 3 + 3}"]`).firstChild ||
                startId + width * 5 + 5 === targetId && !document.querySelector(`[square-id = "${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 4 + 4}"]`).firstChild ||
                startId + width * 6 + 6 === targetId && !document.querySelector(`[square-id = "${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 5 + 5}"]`).firstChild ||
                startId + width * 7 + 7 === targetId && !document.querySelector(`[square-id = "${startId + width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 6 + 6}"]`).firstChild ||

                // for left cross --- forward
                startId + width - 1 === targetId ||
                startId + width * 2 - 2 === targetId && !document.querySelector(`[square-id = "${startId + width - 1}"]`).firstChild ||
                startId + width * 3 - 3 === targetId && !document.querySelector(`[square-id = "${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 2 - 2}"]`).firstChild ||
                startId + width * 4 - 4 === targetId && !document.querySelector(`[square-id = "${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 3 - 3}"]`).firstChild ||
                startId + width * 5 - 5 === targetId && !document.querySelector(`[square-id = "${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 4 - 4}"]`).firstChild ||
                startId + width * 6 - 6 === targetId && !document.querySelector(`[square-id = "${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 5 - 5}"]`).firstChild ||
                startId + width * 7 - 7 === targetId && !document.querySelector(`[square-id = "${startId + width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 6 - 6}"]`).firstChild ||

                // for right cross --- backward
                startId - width - 1 === targetId ||
                startId - width * 2 - 2 === targetId && !document.querySelector(`[square-id = "${startId - width - 1}"]`).firstChild ||
                startId - width * 3 - 3 === targetId && !document.querySelector(`[square-id = "${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 2 - 2}"]`).firstChild ||
                startId - width * 4 - 4 === targetId && !document.querySelector(`[square-id = "${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 3 - 3}"]`).firstChild ||
                startId - width * 5 - 5 === targetId && !document.querySelector(`[square-id = "${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 4 - 4}"]`).firstChild ||
                startId - width * 6 - 6 === targetId && !document.querySelector(`[square-id = "${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 5 - 5}"]`).firstChild ||
                startId - width * 7 - 7 === targetId && !document.querySelector(`[square-id = "${startId - width - 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 6 - 6}"]`).firstChild ||

                // fot left cross -- backward
                startId - width + 1 === targetId ||
                startId - width * 2 + 2 === targetId && !document.querySelector(`[square-id = "${startId - width + 1}"]`).firstChild ||
                startId - width * 3 + 3 === targetId && !document.querySelector(`[square-id = "${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 2 + 2}"]`).firstChild ||
                startId - width * 4 + 4 === targetId && !document.querySelector(`[square-id = "${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 3 + 3}"]`).firstChild ||
                startId - width * 5 + 5 === targetId && !document.querySelector(`[square-id = "${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 4 + 4}"]`).firstChild ||
                startId - width * 6 + 6 === targetId && !document.querySelector(`[square-id = "${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 5 + 5}"]`).firstChild ||
                startId - width * 7 + 7 === targetId && !document.querySelector(`[square-id = "${startId - width + 1}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id = "${startId - width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id = "${startId + width * 6 + 6}"]`).firstChild ||

                // moving straight forward
                startId + width === targetId ||
                startId + width * 2 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild ||
                startId + width * 3 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild ||
                startId + width * 4 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild ||
                startId + width * 5 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild ||
                startId + width * 6 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5}"]`).firstChild ||
                startId + width * 7 === targetId && !document.querySelector(`[square-id="${startId + width}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + width * 6}"]`).firstChild ||

                // moving straight backward
                startId - width === targetId ||
                startId - width * 2 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild ||
                startId - width * 3 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild ||
                startId - width * 4 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild ||
                startId - width * 5 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild ||
                startId - width * 6 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild ||
                startId - width * 7 === targetId && !document.querySelector(`[square-id="${startId - width}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - width * 6}"]`).firstChild ||

                // moving left side straight
                startId + 1 === targetId ||
                startId + 2 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild ||
                startId + 3 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild ||
                startId + 4 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild ||
                startId + 5 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild ||
                startId + 6 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5}"]`).firstChild ||
                startId + 7 === targetId && !document.querySelector(`[square-id="${startId + 1}"]`).firstChild && !document.querySelector(`[square-id="${startId + 2}"]`).firstChild && !document.querySelector(`[square-id="${startId + 3}"]`).firstChild && !document.querySelector(`[square-id="${startId + 4}"]`).firstChild && !document.querySelector(`[square-id="${startId + 5}"]`).firstChild && !document.querySelector(`[square-id="${startId + 6}"]`).firstChild ||

                // moving right side straight
                startId - 1 === targetId ||
                startId - 2 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild ||
                startId - 3 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild ||
                startId - 4 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild ||
                startId - 5 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild ||
                startId - 6 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5}"]`).firstChild ||
                startId - 7 === targetId && !document.querySelector(`[square-id="${startId - 1}"]`).firstChild && !document.querySelector(`[square-id="${startId - 2}"]`).firstChild && !document.querySelector(`[square-id="${startId - 3}"]`).firstChild && !document.querySelector(`[square-id="${startId - 4}"]`).firstChild && !document.querySelector(`[square-id="${startId - 5}"]`).firstChild && !document.querySelector(`[square-id="${startId - 6}"]`).firstChild
            ) {
                return true
            }
            break;

        case 'king':
            if (
                startId + 1 === targetId ||
                startId - 1 === targetId ||
                startId + width === targetId ||
                startId + width + 1 === targetId ||
                startId + width - 1 === targetId ||
                startId - width === targetId ||
                startId - width + 1 === targetId ||
                startId - width - 1 === targetId
            ) {
                return true
            }
            break;
        default:
            break;
    }
}


function changePlayer() {
    if (playerTurn === 'black') {
        reverseIds()
        playerTurn = 'white';
        playerDetails.textContent = 'white'
    } else {
        revertIds();
        playerTurn = 'black'
        playerDetails.textContent = 'black'
    }
}

function reverseIds() {
    const allSquares = document.querySelectorAll('#gameboard .square');
    allSquares.forEach((square, i) => {
        square.setAttribute('square-id', (width * width - 1) - i)
    })
}

function revertIds() {
    const allSquares = document.querySelectorAll('#gameboard .square');
    allSquares.forEach((square, i) => {
        square.setAttribute('square-id', i)
    })
}

function checkForWin() {
    const kings = Array.from(document.querySelectorAll('#king'));

    if (!kings.some(king => king.firstChild.classList.contains('white'))) {
        infoDisplay.innerHTML = "Black Player Wins!";
        const allSquares = document.querySelectorAll('.square');
        allSquares.forEach(square => square.firstChild?.setAttribute('draggable', false));
    }
    if (!kings.some(king => king.firstChild.classList.contains('black'))) {
        infoDisplay.innerHTML = "White Player Wins!";
        const allSquares = document.querySelectorAll('.square');
        allSquares.forEach(square => square.firstChild?.setAttribute('draggable', false));
    }
}