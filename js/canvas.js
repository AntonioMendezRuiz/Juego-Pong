var canvas = document.getElementById("lienzo");
var ctx = canvas.getContext("2d");
var radioPelota = 7;
var x = canvas.width/2;
var y = canvas.height-30;
var velocidadX = 5;
var velocidadY = -5;
var paddleHeight = 2;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var flechaDerecha = false;
var flechaIzquierda = false;
var numeroFilasLadrillos = 9;
var numeroColumnasLadrillos = 9;
var anchoLadrillos = 70;
var alturaLadrillos = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 3;

var bricks = [];
for(c=0; c<numeroColumnasLadrillos; c++) {
    bricks[c] = [];
    for(r=0; r<numeroFilasLadrillos; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


function keyDownHandler(e) {
    if(e.keyCode == 39) {
        flechaDerecha = true;
    }
    else if(e.keyCode == 37) {
        flechaIzquierda = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        flechaDerecha = false;
    }
    else if(e.keyCode == 37) {
        flechaIzquierda = false;
    }
}

function collisionDetection() {
    for(c=0; c<numeroColumnasLadrillos; c++) {
        for(r=0; r<numeroFilasLadrillos; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+anchoLadrillos && y > b.y && y < b.y+alturaLadrillos) {
                    velocidadY = -velocidadY;
                    b.status = 0;
                    score++;
                    if(score == numeroFilasLadrillos*numeroColumnasLadrillos) {
                        alert("HAS GANADO");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, radioPelota, 0, Math.PI*2);
    ctx.fillStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black"
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    for(c=0; c<numeroColumnasLadrillos; c++) {
        for(r=0; r<numeroFilasLadrillos; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (r*(anchoLadrillos+brickPadding))+brickOffsetLeft;
                var brickY = (c*(alturaLadrillos+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, anchoLadrillos, alturaLadrillos);
                ctx.fillStyle = "red";
                ctx.fill();
                ctx.lineWidth = 2;
                ctx.strokeStyle = "black"
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Score: "+score, 8, 20);
}
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    
    if(x + velocidadX > canvas.width-radioPelota || x + velocidadX < radioPelota) {
        velocidadX = -velocidadX;
    }
    if(y + velocidadY < radioPelota) {
        velocidadY = -velocidadY;
    }
    else if(y + velocidadY > canvas.height-radioPelota) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            velocidadY = -velocidadY;
        }
        else {
            lives--;
            if(!lives) {
                alert("GAME OVER");
                document.location.reload();
            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                velocidadX = 3;
                velocidadY = -3;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }
    
    if(flechaDerecha && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(flechaIzquierda && paddleX > 0) {
        paddleX -= 7;
    }
    
    x += velocidadX;
    y += velocidadY;
    requestAnimationFrame(draw);
}

draw();