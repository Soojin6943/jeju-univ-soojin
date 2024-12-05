window.onload = async() => {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    const heroImg = await loadTexture('assets/player.png');
    const enemyImg = await loadTexture('assets/enemyShip.png');
    const starBackgroundImg = await loadTexture('assets/starBackground.png');

    // 우주 배경 설정
    const pattern = ctx.createPattern(starBackgroundImg, 'repeat');

    ctx.fillStyle = pattern;
    ctx.fillRect(0,0, canvas.width, canvas.height);

    // ctx.drawImage(heroImg, canvas.width/2 - 45, canvas.height - (canvas.height/4));
    // ctx.drawImage(heroImg, (canvas.width / 2) - 45 * 1.5, canvas.height - (canvas.height / 4), 45, heroImg.height * (45/heroImg.width));
    // createEnemies(ctx, canvas, enemyImg);

    // 플레이어 우주선과 보조 우주선 그리기
    drawHeroAndAllies(ctx, heroImg, canvas);

    // 적 피라미드로 그리기
    createEnemies2(ctx, canvas, enemyImg);
};

function loadTexture(path) {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = path;
        img.onload = () => {
            resolve(img);
        };
    })
}

function createEnemies(ctx, canvas, enemyImg) {
    const MONSTER_TOTAL = 5;
    const MONSTER_WIDTH = MONSTER_TOTAL * enemyImg.width;
    const START_X = (canvas.width - MONSTER_WIDTH) / 2;
    const STOP_X = START_X + MONSTER_WIDTH;

    for (let x = START_X; x < STOP_X; x += enemyImg.width) {
        for (let y = 0; y < enemyImg.height * 5; y += enemyImg.height) {
            ctx.drawImage(enemyImg, x, y);
        }
    }
}

function createEnemies2(ctx, canvas, enemyImg){
    const MONSTER_TOTAL_ROWS = 5;
    let START_X;

    for (let row = 0; row < MONSTER_TOTAL_ROWS; row++){
        START_X = (canvas.width - (enemyImg.width * (MONSTER_TOTAL_ROWS - row))) /2;
        for (let col=0; col < MONSTER_TOTAL_ROWS - row; col++){
            ctx.drawImage(enemyImg, START_X + col * enemyImg.width, row * enemyImg.height);
        }
    }
}

function drawHeroAndAllies(ctx, heroImg, canvas) {
    const mainHeroWidth = 70; // 중앙 플레이어 우주선 너비
    const mainHeroHeight = heroImg.height * (mainHeroWidth / heroImg.width); // 높이

    const allyHeroWidth = 45; // 보조 우주선 너비
    const allyHeroHeight = heroImg.height * (allyHeroWidth / heroImg.width); // 높이

    const centerX = canvas.width / 2; // 캔버스 중앙 X 좌표
    const centerY = canvas.height - (canvas.height / 4); // 캔버스에서 플레이어 우주선 Y 좌표

    const gap = 10; // 중앙과 보조 우주선 간의 간격

    // 중앙 플레이어
    ctx.drawImage(heroImg, centerX - mainHeroWidth / 2, centerY, mainHeroWidth, mainHeroHeight);

    // 왼쪽 보조 우주선
    ctx.drawImage(heroImg, centerX - mainHeroWidth / 2 - allyHeroWidth - gap, centerY + (mainHeroHeight - allyHeroHeight) / 2, allyHeroWidth, allyHeroHeight);

    // 오른쪽 보조 우주선
    ctx.drawImage(heroImg, centerX + mainHeroWidth / 2 + gap, centerY + (mainHeroHeight - allyHeroHeight) / 2, allyHeroWidth, allyHeroHeight);
}