let gamebox = document.getElementById('gamebox');
let context = gamebox.getContext('2d');
let next_level = document.getElementById('next_level');
let restart_level = document.getElementById('restart_level');

let level = 1;
let flag = true;

let playerdefault = {
  x: 0,
  y: 150,
};
//context.fillStyle = 'purple';
//context.fillRect(10, 10, 50, 50);

// let posX = 0;
// let posY = 0;

/*setInterval(function () {
  posX += 20;
  posY += 10;
  context.clearRect(0, 0, gamebox.width, gamebox.height);
  context.fillRect(posX, posY, 50, 50);
}, 2000);*/
/*
function drawNext() {
  posX += 2.15;
  posY += 1;
  context.clearRect(0, 0, gamebox.width, gamebox.height);
  context.fillRect(posX, posY, 50, 50);
  window.requestAnimationFrame(drawNext);
}
drawNext();
*/
let enemy = [
  {
    name: 'turtle',
    color: 'red',
    x: 100,
    y: 0,
    h: 50,
    w: 50,
    vx: 0,
    vy: 1,
    d_vy: 2,
  },
  {
    name: 'turtle',
    color: 'red',
    x: 300,
    y: 0,
    h: 50,
    w: 50,
    vx: 0,
    vy: 1,
    d_vy: 3,
  },
  {
    name: 'turtle',
    color: 'red',
    x: 500,
    y: 0,
    h: 50,
    w: 50,
    vx: 0,
    vy: 1,
    d_vy: 4,
  },
];

let player = {
  name: 'mario',
  color: 'blue',
  x: 0,
  y: 150,
  h: 50,
  w: 50,
  vx: 1,
  vy: 0,
};

let goal = {
  name: 'princess',
  color: 'orange',
  x: 750,
  y: 150,
  h: 50,
  w: 50,
};

function drawBox(box) {
  let img = document.getElementById(box.name);
  context.drawImage(img, box.x, box.y, box.w, box.h);
}

document.addEventListener('keydown', movePlayer);

function movePlayer(key) {
  player.x += player.vx;

  if (player.x + player.w > gamebox.width) {
    player.vx = -5;
  } else if (player.x < 0) {
    player.vx = 5;
  } else if (key.keyCode == '39') {
    player.vx = 5;
  } else if (key.keyCode == '37') {
    player.vx = -5;
  }
}

function updateGameState() {
  for (let i = 0; i < enemy.length; i++) {
    enemy[i].y += enemy[i].vy;
    if (enemy[i].y + enemy[i].h >= gamebox.height || enemy[i].y <= 0) {
      enemy[i].vy *= -1;
    }
  }
}

function detectCollission() {
  //get corner positions
  let pl_x = player.x;
  let pl_y = player.y;
  let pl_w_x = player.x + player.w;
  let pl_h_y = player.y + player.h;

  for (let i = 0; i < enemy.length; i++) {
    let en_x = enemy[i].x;
    let en_y = enemy[i].y;
    let en_w_x = enemy[i].x + enemy[i].w;
    let en_h_y = enemy[i].y + enemy[i].h;
    if (pl_x <= en_x && pl_w_x >= en_x && pl_y <= en_y && pl_h_y >= en_y) {
      // Check TopLeft enemy corner with BottomRight player corner
      return true;
    } else if (
      pl_x <= en_x &&
      pl_w_x >= en_x &&
      pl_y <= en_h_y &&
      pl_h_y >= en_h_y
    ) {
      // Check BottomLeft enemy corner with TopRight player corner
      return true;
    } else if (
      en_x <= pl_x &&
      en_w_x >= pl_x &&
      en_y <= pl_y &&
      en_h_y >= pl_y
    ) {
      // Check TopLeft player corner with BottomRight enemy corner
      return true;
    } else if (
      en_x <= pl_x &&
      en_w_x >= pl_x &&
      en_y <= pl_h_y &&
      en_h_y >= pl_h_y
    ) {
      // Check BottomLeft player corner with TopRight enemy corner
      return true;
    }
  }
  return false;
}
function levelUp() {
  // Player corner positions
  let pl_x = player.x;
  let pl_y = player.y;
  let pl_w_x = player.x + player.w;
  let pl_h_y = player.y + player.h;

  // Goal corner positions
  let gl_x = goal.x;
  let gl_y = goal.y;
  let gl_w_x = goal.x + goal.w;
  let gl_h_y = goal.y + goal.h;

  if (pl_x <= gl_x && pl_w_x >= gl_x) {
    if (pl_y <= gl_y && pl_h_y >= gl_y) {
      // Check TopLeft enemy corner with BottomRight player corner
      return true;
    } else if (pl_y <= gl_h_y && pl_h_y >= gl_h_y) {
      // Check BottomLeft enemy corner with TopRight player corner
      return true;
    }
  } else if (pl_x <= gl_w_x && pl_w_x >= gl_w_x) {
    if (pl_y <= gl_y && pl_h_y >= gl_y) {
      // Check TopRight enemy corner with BottomLeft player corner
      return true;
    } else if (pl_y <= gl_h_y && pl_h_y >= gl_h_y) {
      // Check BottomRight enemy corner with TopLeft player corner
      return true;
    }
  }

  return false;
}
next_level.addEventListener('click', function () {
  window.requestAnimationFrame(updateGame);
  flag = true;
  player.x = playerdefault.x;
  player.y = playerdefault.y;
  setTimeout(function () {
    next_level.hidden = true;
  }, 1000);
});

restart_level.addEventListener('click', function () {
  flag = true;
  player.x = playerdefault.x;
  player.y = playerdefault.y;
  window.requestAnimationFrame(updateGame);
  setTimeout(function () {
    restart_level.hidden = true;
  }, 1000);
});

function updateGame() {
  //update level
  let level_div = document.getElementById('level');
  level_div.innerHTML = 'Level ' + level;
  //update game state
  updateGameState();
  //clear canvas
  context.clearRect(0, 0, gamebox.width, gamebox.height);
  //draw player
  drawBox(player);
  //draw enemy
  for (let i = 0; i < enemy.length; i++) {
    drawBox(enemy[i]);
  }
  //draw goal
  drawBox(goal);

  let collision = detectCollission();
  let levelup = levelUp();
  if (collision) {
    // Collision
    flag = false;
    context.font = '60pt sans-serif';
    context.fillStyle = 'red';
    context.fillRect(100, 100, 600, 200);
    context.strokeText('Game Over', 200, 200);
    restart_level.hidden = false;
  } else if (levelup) {
    flag = false;
    level++;

    for (let i = 0; i < enemy.length; i++) {
      enemy[i].y = 1;
      enemy[i].vy = enemy[i].d_vy;
      enemy[i].d_vy += 1;
    }
    player.x = playerdefault.x;
    player.y = playerdefault.y;

    context.font = '60pt serif';
    context.fillStyle = 'lightgreen';
    context.fillRect(100, 100, 650, 200);
    context.strokeText('Level Complete', 200, 200);
    next_level.hidden = false;
  } else {
    // Request Next Frame
    window.requestAnimationFrame(updateGame);
  }
}

updateGame();
