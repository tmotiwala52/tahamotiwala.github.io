
const player = document.getElementById('player');
let posX = 50;
let posY = 50;
let velocityY = 0;
let gravity = 0.6;
let isJumping = false;
const groundHeight = 50;
let score = 0;

function update() {
  if (isJumping) {
    velocityY -= gravity;
    posY += velocityY;
    if (posY <= 50) {
      posY = 50;
      velocityY = 0;
      isJumping = false;
    }
  }

  player.style.left = posX + 'px';
  player.style.bottom = posY + 'px';

  checkCollision();

  requestAnimationFrame(update);
}

function checkCollision() {
  document.querySelectorAll('.coin').forEach(coin => {
    const coinRect = coin.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    if (
      playerRect.left < coinRect.right &&
      playerRect.right > coinRect.left &&
      playerRect.top < coinRect.bottom &&
      playerRect.bottom > coinRect.top
    ) {
      coin.remove();
      score++;
      document.getElementById('score').innerText = "Coins: " + score;
    }
  });
}

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') posX += 10;
  if (e.key === 'ArrowLeft') posX -= 10;
  if (e.key === ' ' && !isJumping) {
    isJumping = true;
    velocityY = 12;
  }
});

update();
