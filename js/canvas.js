var canvas = document.getElementById("lienzo");
var ctx = canvas.getContext("2d");
var radioPelota = 7;
var x = canvas.width/2;
var y = canvas.height-30;
var velocidadX = 6;
var velocidadY = -6;
var alturaRaqueta = 8;
var anchoRaqueta = 75;
var raquetaX = (canvas.width-anchoRaqueta)/2;
var flechaDerecha = false;
var flechaIzquierda = false;
var numeroFilasLadrillos = 9;
var numeroColumnasLadrillos = 9;
var anchoLadrillos = 70;
var alturaLadrillos = 20;
var paddingLadrillos = 10;
var distaciaTop = 40;
var distanciaIzquierda = 40;
var Puntos = 0;
var Vidas = 3;

var ladrillos = [];
for(c=0; c<numeroColumnasLadrillos; c++) {
    ladrillos[c] = [];
    for(r=0; r<numeroFilasLadrillos; r++) {
        ladrillos[c][r] = { x: 0, y: 0, status: 1 };
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

function colisiones() {
    for(c=0; c<numeroColumnasLadrillos; c++) {
        for(r=0; r<numeroFilasLadrillos; r++) {
            var b = ladrillos[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+anchoLadrillos && y > b.y && y < b.y+alturaLadrillos) {
                    velocidadY = -velocidadY;
                    b.status = 0;
                    Puntos++;
                    if(Puntos == numeroFilasLadrillos*numeroColumnasLadrillos) {
                        alert("HAS GANADO");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function dibujaPelota() {
    ctx.beginPath();
    ctx.arc(x, y, radioPelota, 0, Math.PI*2);
    ctx.fillStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black"
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}
function dibujaRaqueta() {
    ctx.beginPath();
    ctx.rect(raquetaX, canvas.height-alturaRaqueta, anchoRaqueta, alturaRaqueta);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}
function dibujaLadrillos() {
    for(c=0; c<numeroColumnasLadrillos; c++) {
        for(r=0; r<numeroFilasLadrillos; r++) {
            if(ladrillos[c][r].status == 1) {
                var brickX = (r*(anchoLadrillos+paddingLadrillos))+distanciaIzquierda;
                var brickY = (c*(alturaLadrillos+paddingLadrillos))+distaciaTop;
                ladrillos[c][r].x = brickX;
                ladrillos[c][r].y = brickY;
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
function dibujaPuntos() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Puntos: "+Puntos, 8, 20);
}
function dibujaVidas() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Vidas: "+Vidas, canvas.width-65, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujaLadrillos();
    dibujaPelota();
    dibujaRaqueta();
    dibujaPuntos();
    dibujaVidas();
    colisiones();
    
    if(x + velocidadX > canvas.width-radioPelota || x + velocidadX < radioPelota) {
        velocidadX = -velocidadX;
    }
    if(y + velocidadY < radioPelota) {
        velocidadY = -velocidadY;
    }
    else if(y + velocidadY > canvas.height-radioPelota) {
        if(x > raquetaX && x < raquetaX + anchoRaqueta) {
            velocidadY = -velocidadY;
        }
        else {
            Vidas--;
            if(!Vidas) {
                alert("GAME OVER");
                document.location.reload();
            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                velocidadX = velocidadX;
                velocidadY = velocidadY;
                raquetaX = (canvas.width-anchoRaqueta)/2;
            }
        }
    }
    
    if(flechaDerecha && raquetaX < canvas.width-anchoRaqueta) {
        raquetaX += 7;
    }
    else if(flechaIzquierda && raquetaX > 0) {
        raquetaX -= 7;
    }
    
    x += velocidadX;
    y += velocidadY;
    requestAnimationFrame(draw);
}

draw();