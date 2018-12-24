    const canv = document.querySelector("canvas");
    const ctx = canv.getContext("2d");

    canv.width = 1000;
    canv.height = 500;

    const cw = canv.width;
    const ch = canv.height;

    const ballSize = 20;
    let ballX = cw/2 - ballSize/2;
    let ballY = ch/2-ballSize/2;

    const rocketHeight = 80;
    const rocketWidth = 20;
    const rocketX = 70;
    let rocketY = 200;

    const opponentX = 910;
    let opponentY = 200;

    const lineWidth = 5;
    const lineHeight = 15;

    let speedX = 1;
    let speedY = 1;

    const topCanvas = canv.offsetTop;

    // przyspieszenie po kontakcie ze śnianą lub rakietką
    function speedUp () {
        if (speedX > 0 && speedX < 16) {
            speedX += 0.2;
        }

        else if (speedX < 0 && speedX > -16) {
            speedX -= 0.5;
        }

        if (speedY > 0 && speedY < 16) {
            speedY += 0.2;
        }

        else if (speedY < 0 && speedY > -16) {
            speedY -= 0.5;
        }
    }

    function opponentMove() {
        const rocketCenter = opponentY + rocketHeight / 2;
        const ballCenter = ballY + ballSize / 2;

        if (ballX > 500) {
            if(rocketCenter - ballCenter > 200) {
                opponentY -= 30;
            }

            else if(rocketCenter - ballCenter > 50){
                opponentY -= 15;
            }

            if(rocketCenter - ballCenter < -200) {
                opponentY += 30
            }

            else if(rocketCenter - ballCenter < -50){
                opponentY += 15
            }
        }

        else if (ballX <= 500 && ballX > 150) {
            if (rocketCenter - ballCenter > 100) {
                opponentY -= 3
            }

            else if (rocketCenter - ballCenter < -100){
                opponentY += 3
            }
        }
    }

    // ruch rakietki gracza
    canv.addEventListener("mousemove", function(event){
        rocketY = event.clientY - topCanvas - rocketHeight / 2;

        if (rocketY >= ch - rocketHeight){
            rocketY = ch - rocketHeight
        }
        if (rocketY <= 0){
            rocketY = 0
        }
    });
    
    function opponent() {
        ctx.fillStyle = "white";
        ctx.fillRect(opponentX, opponentY , rocketWidth, rocketHeight);
    }

    function rocket() {
        ctx.fillStyle = "white";
        ctx.fillRect(rocketX, rocketY , rocketWidth, rocketHeight);
    }

    function ball() {
        ctx.fillStyle = "white";
        ctx.fillRect(ballX, ballY , ballSize, ballSize);

        ballX += speedX;
        ballY += speedY;

        if (ballY <= 0 || ballY + ballSize >= ch){
            speedY = - speedY;
            speedUp();
        }

        if (ballX <= 0 || ballX + ballSize >= cw){
            speedX = - speedX
        }
    }

    function table() {

        ctx.fillStyle = "darkgreen";
        ctx.fillRect(0, 0, cw, ch);

        for (let i=20; i<ch; i+=30){
            ctx.fillStyle = "white";
            ctx.fillRect(cw/2 - lineWidth / 2, i, lineWidth, lineHeight)
        }
    }

    function game() {
        table();
        ball();
        rocket();
        opponent();
        opponentMove();
    }

setInterval(game, 1000 / 60)