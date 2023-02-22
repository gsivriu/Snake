let ctx;
let appleX, appleY;
let snake = {
    x: 200,
    y: 200,
    speed: 2,
    vx: 0,
    vy: 0,
    body: [{x: 200,y: 200}]
};

function createBoard() {
    let board = document.getElementById("gameBoard");
    ctx = board.getContext('2d');
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, 400, 400)
    drawSnake();
    createApple();
}

function drawSnake() {
    ctx.fillStyle = 'yellow';
    for (let i = 0; i < snake.body.length; ++i) {
        ctx.fillRect(snake.body[i].x, snake.body[i].y, 20, 20);
    }
}

function createApple() {
    appleX = Math.floor(Math.random() * 20) * 20;
    appleY = Math.floor(Math.random() * 20) * 20;
    ctx.fillStyle = "red"
    ctx.fillRect(appleX, appleY, 20, 20);
}

function moveSnake() {
    ctx.fillStyle = 'green';
    for (let i = 0; i < snake.body.length; ++i) {
        ctx.fillRect(snake.body[i].x, snake.body[i].y, 20, 20);
    }
    for (let i = snake.body.length - 1; i > 0; --i) {
        snake.body[i].x = snake.body[i - 1].x;
        snake.body[i].y = snake.body[i - 1].y;
    }
    if (snake.body.length > 0) {
        snake.body[0].x = snake.x;
        snake.body[0].y = snake.y;
    }
    snake.x += snake.vx * 10;
    snake.y += snake.vy * 10;
    drawSnake();
    checkMovement();
}

function handleKeyDown(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (snake.vy !== snake.speed) {
                snake.vx = 0;
                snake.vy = -snake.speed;
            }
            break;
        case 'ArrowDown':
            if (snake.vy !== -snake.speed) {
                snake.vx = 0;
                snake.vy = snake.speed;
            }
            break;
        case 'ArrowLeft':
            if (snake.vx !== snake.speed) {
                snake.vx = -snake.speed;
                snake.vy = 0;
            }
            break;
        case 'ArrowRight':
            if (snake.vx !== -snake.speed) {
                snake.vx = snake.speed;
                snake.vy = 0;
            }
            break;
    }
}

function checkMovement() {
    if (snake.x < 0 || snake.x + 15 > 400 || snake.y < 0 || snake.y + 15 > 400) {
        popupLose();
    }
    for (let i = 1; i < snake.body.length; ++i) {
        if (snake.x === snake.body[i].x && snake.y === snake.body[i].y) {
            popupLose();
        }
    }
    if (snake.x === appleX && snake.y === appleY) {
        setTimeout(createApple, 500);
        snake.body.push({
            x: snake.x,
            y: snake.y
        });
    }
}

createBoard();
document.addEventListener('keydown', handleKeyDown);
setInterval(moveSnake, 300);

function popupLose() {
    handleButtonClick = null;
    var popup = document.createElement("div");
    popup.classList.add("popupLose");
    popup.innerHTML = "GAME OVER";
    document.body.appendChild(popup);
}