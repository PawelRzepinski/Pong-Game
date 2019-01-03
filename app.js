const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 500;
let gameWidth = canvas.width;

/*const ballsMove = ballsGame => {
    ballsGame.forEach(ballsGame =>{
        ballsGame.move(collisionObject)
    })
};*/

const updateGameWindow = () => {
    gameWidth = canvas.width;
    computerPaddel.positionX = canvas.width - 30;
};

const clearScreen = () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width, canvas.height)
};

function Paddel(width, height, color, positionX, positionY) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.positionX = positionX;
    this.positionY = positionY;
    this.speed = 3;
    this.middleHeight = height / 2;
}

function Ball(size, color, positionX, positionY) {
    this.width = size;
    this.height = size;
    this.color = color;
    this.positionX = positionX;
    this.positionY = positionY;
    this.middleHeight = size / 2;
    this.speedX = 2;
    this.speedY = 2;
    this.directionX = true; // true = w prawo
    this.directionY = true; // true = w dół
}

//nie do końca rozumiem co sie tu zadziało
const print = (collisionObject, context) => {
    collisionObject.forEach(collisionObject => {
        context.fillStyle = collisionObject.color;
        context.fillRect(collisionObject.positionX, collisionObject.positionY, collisionObject.width, collisionObject.height)
    });
};

const collisionObject = [];
const ballsGame = [];

const playerPaddel = new Paddel(20, 120, "orange", 10, canvas.height / 2 - 60);
const computerPaddel = new Paddel(20, 120, "red", canvas.width - 30, canvas.height / 2 - 60);
const ball1 = new Ball(20, "blue", canvas.width / 2 - 10, canvas.height / 2 - 10);

collisionObject.push(playerPaddel, computerPaddel, ball1);
ballsGame.push(ball1);


const game = () => {
    if (gameWidth !== canvas.width)
        updateGameWindow();
    clearScreen();
    //ballsMove(ballsGame);
    print(collisionObject, ctx)
};

let interval = setInterval(game, 1000/60);