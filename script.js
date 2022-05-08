// Variables
let cvs = document.getElementById('cvs');
let ctx = cvs.getContext('2d');
let dinosaurIMG = document.getElementById('dinosaur');
let cactusIMG = document.getElementById('cactus');

let timer, dinosaur, cactus
let W = cvs.width, H = cvs.height;


// Dinosaur
class Dinosaur {
    constructor() {
        this.x = 20
        this.y = 170
        this.jumping = false
        this.jumpSpeed = 2
        this.highestJump = false
    }

    draw() {
        ctx.drawImage(dinosaurIMG, this.x, this.y, 80, 80)
    }

    jump() {
        //Jump up
        if (this.jumping && !this.highestJump && this.y > 50) {
            this.y -= this.jumpSpeed
        }
        //Jump down
        else if (this.y < 170) {
            this.highestJump = true
            this.y += this.jumpSpeed
        }
        //End jump
        else {
            this.highestJump = false;
            this.jumping = false;
        }
    }

    update() {
        this.draw();
        this.jump();
    }
}

// Cactus

class Cactus {
    constructor() {
        this.x = W;
        this.y = 200;
        this.speed = 2;
    }

    draw() {
        ctx.drawImage(cactusIMG, this.x, this.y, 50, 50)
    }

    mpveLoop() {
        if (this.x > -50) {
            this.x -= this.speed
        } else {
            this.x = W
        }
    }

    update() {
        this.draw();
        this.mpveLoop();
    }
}


// Collision

function collision() {
    if (
        dinosaur.x < cactus.x &&
        dinosaur.x + 40 > cactus.x &&
        dinosaur.y + 80 > cactus.y
    ) {
        restartGame();
    }
}


// Loop

function loop() {
    ctx.clearRect(0, 0, W, H);
    cactus.update();
    dinosaur.update();
    collision()
}

// Start Game

function startGame() {
    timer = setInterval(loop, 1000 / 160);
    dinosaur = new Dinosaur();
    cactus = new Cactus();
}


// Restart game

function restartGame() {
    clearInterval(timer);
    addEventListener('keydown', startGame, {once: true})

    ctx.fillStyle = 'rbga(44, 62, 80, 0.7)';
    ctx.fillRect(0, 0, W, H)

    ctx.fillStyle = '#4cffd7';
    ctx.Align = 'center';

    ctx.font = 'bold 30px Poppins';
    ctx.fillText('GAME OVER', W / 2, H / 2)

    ctx.font = 'bold 18px Poppins';
    ctx.fillText('Press any key to restart', W / 2, H / 2 + 30)
}

// Events
addEventListener('keydown', function () {
    if (!dinosaur.jumping) {
        dinosaur.jumping = true;
    }
})

// On load page

startGame()


