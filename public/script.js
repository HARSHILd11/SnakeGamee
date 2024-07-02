var blockSize = 25;

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
var rows = 20;
var cols = 20;

var board;
var context;

var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var velocityX = 0;
var velocityY = 0;


var foodX = blockSize;
var foodY = blockSize;

var snakeBody = [];
var score = 0;
let Hscore = document.getElementById("Highest-score");
var HighestScore = Hscore.innerText;

var gameover = false;
const inputElement = document.getElementById("myInput");
let hasInput = false;

inputElement.addEventListener('input', function () {
    if (!hasInput) {
        startgame();
        hasInput = true;
    }
});

function restart() {
    window.location.reload();
}

function startgame() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");
    placeFood()

    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000 / 10);

}
let sc = document.getElementById("score");
let Hsc = document.getElementById("Highest-score");

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * cols) * blockSize;

}

const buttons = document.querySelectorAll("button");

for (const button of buttons) {
    button.disabled = true;
}
function update() {
    if (gameover) {


        if (score > HighestScore) {



            const highscoreImage = document.querySelector(".highscore");
            if (highscoreImage) { // Check if the image element exists
                highscoreImage.style.display = "block"; // Display the image
            }


        }

        for (const button of buttons) {
            button.disabled = false;

        }




        return;

    }
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    // (x,y,width,heght)
    context.fillRect(foodX, foodY, blockSize, blockSize);
    if (snakeX === foodX && snakeY === foodY) {
        score++;
        snakeBody.push([foodX, foodY])
        console.log(score);
        placeFood();


    }
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY]
    }
    sc.value = score;
    const hiddenInput = document.getElementsByName("score")[0];
    hiddenInput.value = sc.value;
    if (score > HighestScore) {
        Hsc.innerText = score;
        const hiddenInput = document.getElementsByName("HigestScore")[0];
        hiddenInput.value = score;





    }





    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;




    for (let i = 0; i < snakeBody.length - 1; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize)
    }
    context.fillRect(snakeX, snakeY, blockSize, blockSize);


    if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        gameover = true;
        alert(`Game over! Your Score is ${score}`);
    }



}



function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;

    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;

    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;

    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;

    }

}

const refreshButton = document.getElementById("refreshButton");

refreshButton.addEventListener("click", () => {
    window.location.reload();
});