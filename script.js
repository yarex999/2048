document.addEventListener('DOMContentLoaded', () => {

    const gameBoard = document.querySelector('.game');
    const score = document.querySelector('#score_number');
    const result = document.querySelector('.result');



    const width = 4;
    let scoreNumber = 0;

    let cells = [];

    // create the board

    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            let cell = document.createElement('div');
            cell.innerHTML = 0;
            gameBoard.appendChild(cell);
            cells.push(cell);
        }
        randomCell();
        randomCell();

    }
    createBoard()


    // a random new number
    function randomCell() {
        let randomNumber = Math.floor(Math.random() * cells.length);
        if (cells[randomNumber].innerHTML == 0) {
            cells[randomNumber].innerHTML = 2
            checkForGameOver();
        } else { randomCell() }
    }

    // to move cells
    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 == 0) {
                let firstCell = cells[i].innerHTML;
                let secondCell = cells[i + 1].innerHTML;
                let thirdCell = cells[i + 2].innerHTML;
                let fourthCell = cells[i + 3].innerHTML;
                let arr = [parseInt(firstCell), parseInt(secondCell), parseInt(thirdCell), parseInt(fourthCell)];

                let cellwithNumber = arr.filter(num => num);
                let zeroNumber = 4 - cellwithNumber.length;
                let zeroGet = Array(zeroNumber).fill(0);
                let newArr = zeroGet.concat(cellwithNumber);

                cells[i].innerHTML = newArr[0];
                cells[i + 1].innerHTML = newArr[1];
                cells[i + 2].innerHTML = newArr[2];
                cells[i + 3].innerHTML = newArr[3];
            }
        }
    }

    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 == 0) {
                let firstCell = cells[i].innerHTML;
                let secondCell = cells[i + 1].innerHTML;
                let thirdCell = cells[i + 2].innerHTML;
                let fourthCell = cells[i + 3].innerHTML;
                let arr = [parseInt(firstCell), parseInt(secondCell), parseInt(thirdCell), parseInt(fourthCell)];

                let cellwithNumber = arr.filter(num => num);
                let zeroNumber = 4 - cellwithNumber.length;
                let zeroGet = Array(zeroNumber).fill(0);
                let newArr = cellwithNumber.concat(zeroGet);

                cells[i].innerHTML = newArr[0];
                cells[i + 1].innerHTML = newArr[1];
                cells[i + 2].innerHTML = newArr[2];
                cells[i + 3].innerHTML = newArr[3];
            }
        }
    }

    function moveUp() {
        for (let i = 0; i < 4; i++) {

            let firstCell = cells[i].innerHTML;
            let secondCell = cells[i + width].innerHTML;
            let thirdCell = cells[i + (width * 2)].innerHTML;
            let fourthCell = cells[i + (width * 3)].innerHTML;
            let arr = [parseInt(firstCell), parseInt(secondCell), parseInt(thirdCell), parseInt(fourthCell)];

            let cellwithNumber = arr.filter(num => num);
            let zeroNumber = 4 - cellwithNumber.length;
            let zeroGet = Array(zeroNumber).fill(0);
            let newArr = cellwithNumber.concat(zeroGet);

            cells[i].innerHTML = newArr[0];
            cells[i + width].innerHTML = newArr[1];
            cells[i + (width * 2)].innerHTML = newArr[2];
            cells[i + (width * 3)].innerHTML = newArr[3];

        }
    }

    function moveDown() {
        for (let i = 0; i < 4; i++) {

            let firstCell = cells[i].innerHTML;
            let secondCell = cells[i + width].innerHTML;
            let thirdCell = cells[i + (width * 2)].innerHTML;
            let fourthCell = cells[i + (width * 3)].innerHTML;
            let arr = [parseInt(firstCell), parseInt(secondCell), parseInt(thirdCell), parseInt(fourthCell)];

            let cellwithNumber = arr.filter(num => num);
            let zeroNumber = 4 - cellwithNumber.length;
            let zeroGet = Array(zeroNumber).fill(0);
            let newArr = zeroGet.concat(cellwithNumber);

            cells[i].innerHTML = newArr[0];
            cells[i + width].innerHTML = newArr[1];
            cells[i + (width * 2)].innerHTML = newArr[2];
            cells[i + (width * 3)].innerHTML = newArr[3];

        }
    }

    // to sum up the numbers

    function combineRight() {
        for (let i = 15; i > 0; i--) {
            if (cells[i].innerHTML === cells[i - 1].innerHTML) {
                let combinedTotal = parseInt(cells[i].innerHTML) + parseInt(cells[i - 1].innerHTML);

                cells[i].innerHTML = combinedTotal;
                cells[i - 1].innerHTML = 0;

                scoreNumber += combinedTotal;
                score.innerHTML = scoreNumber;
            }
        }
        checkForWin()
    }


    function combineLeft() {
        for (let i = 0; i < 15; i++) {
            if (cells[i].innerHTML === cells[i + 1].innerHTML) {
                let combinedTotal = parseInt(cells[i].innerHTML) + parseInt(cells[i + 1].innerHTML);

                cells[i].innerHTML = combinedTotal;
                cells[i + 1].innerHTML = 0;

                scoreNumber += combinedTotal;
                score.innerHTML = scoreNumber;
            }
        }
        checkForWin()
    }

    function combineUp() {
        for (let i = 0; i < 12; i++) {
            if (cells[i].innerHTML === cells[i + width].innerHTML) {
                let combinedTotal = parseInt(cells[i].innerHTML) + parseInt(cells[i + width].innerHTML);

                cells[i].innerHTML = combinedTotal;
                cells[i + width].innerHTML = 0;

                scoreNumber += combinedTotal;
                score.innerHTML = scoreNumber;

            }
        }
        checkForWin()
    }

    function combineDown() {
        for (let i = 15; i > 3; i--) {
            if (cells[i].innerHTML === cells[i - width].innerHTML) {
                let combinedTotal = parseInt(cells[i].innerHTML) + parseInt(cells[i - width].innerHTML);

                cells[i].innerHTML = combinedTotal;
                cells[i - width].innerHTML = 0;

                scoreNumber += combinedTotal;
                score.innerHTML = scoreNumber;

            }
        }
        checkForWin()
    }


    // control
    document.addEventListener('keyup', control);

    function control(e) {
        switch (e.keyCode) {
            case 37:
                keyLeft();
                break;
            case 38:
                keyUp();
                break;
            case 39:
                keyRight();
                break;
            case 40:
                keyDown();
                break;
        }
    }




    function keyLeft() {
        moveLeft();
        combineLeft();
        moveLeft();
        randomCell();
    }

    function keyRight() {
        moveRight();
        combineRight();
        moveRight();
        randomCell();
    }

    function keyUp() {
        moveUp();
        combineUp();
        moveUp();
        randomCell();
    }

    function keyDown() {
        moveDown();
        combineDown();
        moveDown();
        randomCell();
    }



    // check if you win or lose
    function checkForWin() {
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].innerHTML == 2048) {
                result.innerHTML = 'You WIN'
                document.removeEventListener('keyup', control)
                setTimeout(() => clear(), 3000)
            }
        }
    }

    function checkForGameOver() {
        let zeros = 0
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].innerHTML == 0) {
                zeros++
            }
        }
        if (zeros === 0) {
            result.innerHTML = 'You LOSE'
            document.removeEventListener('keyup', control)
            setTimeout(() => clear(), 3000)
        }
    }

    //clear timer
    function clear() {
        clearInterval(myTimer)
    }

    function addColours() {
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].innerHTML == 0) cells[i].style.backgroundColor = '#afa192'
            else if (cells[i].innerHTML == 2) cells[i].style.backgroundColor = '#eee4da'
            else if (cells[i].innerHTML == 4) cells[i].style.backgroundColor = '#ede0c8'
            else if (cells[i].innerHTML == 8) cells[i].style.backgroundColor = '#f2b179'
            else if (cells[i].innerHTML == 16) cells[i].style.backgroundColor = '#ffcea4'
            else if (cells[i].innerHTML == 32) cells[i].style.backgroundColor = '#e8c064'
            else if (cells[i].innerHTML == 64) cells[i].style.backgroundColor = '#ffab6e'
            else if (cells[i].innerHTML == 128) cells[i].style.backgroundColor = '#fd9982'
            else if (cells[i].innerHTML == 256) cells[i].style.backgroundColor = '#ead79c'
            else if (cells[i].innerHTML == 512) cells[i].style.backgroundColor = '#76daff'
            else if (cells[i].innerHTML == 1024) cells[i].style.backgroundColor = '#beeaa5'
            else if (cells[i].innerHTML == 2048) cells[i].style.backgroundColor = '#d7d4f0'
        }
    }
    addColours()

    var myTimer = setInterval(addColours, 50)


    let upButton = document.querySelector('#up');
    let downButton = document.querySelector('#down');
    let rightButton = document.querySelector('#right');
    let leftButton = document.querySelector('#left');

    upButton.addEventListener('click', keyUp);
    downButton.addEventListener('click', keyDown);
    rightButton.addEventListener('click', keyRight);
    leftButton.addEventListener('click', keyLeft);

})