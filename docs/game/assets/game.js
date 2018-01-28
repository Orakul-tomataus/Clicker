window.onload = function () {
  const gameOptions = {
    gameHeight: 480,
    gameWidth:  640,
    font:       "100% Arial",
    fontStyle:  "#000",
  };
  const mountAt     = document.getElementById("main_window");

  void init(mountAt, undefined, gameOptions);
};


async function init (map, _save_ = {}, options) {
  const noSave = {points: 0, pointsPerClick: 1};
  const save   = Object.assign({}, noSave, _save_);

  const assets = await loadAssets();
  const ctx    = map.getContext("2d");
  const draw   = new Draw(ctx, assets);

  map.height = options.gameHeight;
  map.width  = options.gameWidth;

  ctx.fillStyle = options.fontStyle;
  ctx.font      = options.font;

  ctx.fillText("Points : " + save.points, 50, 50);
  ctx.fillText("Modyficator click : " + save.pointsPerClick, 50, 70);

  /*
  // Очень не желательно держать в коде „мертвые“ фрагменты. Такие куски нужно сразу и безжалостно удалять
  sefesf
    earth(color);
    sphere(color,450,200);
    drawNew(color,1);
    drawNew(color,2);
    drawNew(color,3);
  */
  const crashPoints = draw.spawnBlock();

  map.onclick = getClickHandler(Object.assign({crashPoints}, save), draw);
}

async function loadAssets () {
  const loadImage = createImageLoader('assets/textures');
  const blocks    = loadImage('blocks.png');
  const inventory = loadImage('inventory.png');

  return Promise.all([blocks, inventory])
    .then(([blocks, inventory]) => ({blocks, inventory}));
}

function getClickHandler (initial, draw) {
  const pointsPerClick = initial.pointsPerClick;
  let points           = initial.points;
  let crashPoints      = initial.crashPoints;

  /*
  // опять мертвые куски :(
    const ColorDefault = "#131C2C";
    var Maximal        = 254;
    var StartPrise    = [10, 20, 30];
    var ModifierPrise = [1, 1, 1];
    var color = ColorDefault;
    var iBuy          = 1;
  */
  return function onClick () {
    console.log("Click");

    var x = event.clientX;
    var y = event.clientY;
    /*
    // вовсе не задача обработчика кликов выставлять фонт
        ctx.fillStyle = "#000";
        ctx.font      = "100% Arial";
    */

    if (crashPoints > 0) {
      //if (x>245 && x<395 && y>1145 y<1295) {
      //X(1040~1140)  Y(290~390)
      //X(610~650)  Y(290~390)
      crashPoints -= pointsPerClick;
      //console.log(AnimationIncrement);
      draw.animationCrash();

      //}
    } else {
      crashPoints = draw.spawnBlock();
      draw.resetAnimation();
      draw.drawPoints(++points)
    }


    //ctx.fillText("Mody click : " + PointsForClick,50,70);
  }
}

function sphere (color, x, y) {
  ctx.fillStyle = color;
  ctx.arc(x, y, 50, 0, 2 * Math.PI, false);
  ctx.fill();
}

function Draw (ctx, assets) {
  const crashPointsLevel = {
    1: [10, 10, 20, 5, 5],
  };
  let animationIncrement = 0;
  let AnimationTimer     = 0;

  this.drawPoints = function (points) {
    ctx.clearRect(0, 0, 200, 50);
    ctx.fillText("Points : " + points, 50, 50);
  };

  this.resetAnimation = function () {
    AnimationTimer = 0;
  }

  this.spawnBlock = function () {
    var RandomSpawn   = Math.ceil((Math.random() * 10) / 2) - 1;
    const crashPoints = crashPointsLevel[1][RandomSpawn];

    ctx.drawImage(assets.blocks, RandomSpawn * 50, 0, 50, 50, 400, 100, 150, 150);
    animationIncrement = 10 / crashPoints;

    return crashPoints;
  };

  this.drawCrash = function () {
    ctx.drawImage(assets.blocks, (AnimationTimer - 1) * 50, 450, 50, 50, 400, 100, 150, 150);
  };

  this.animationCrash = function () {
    AnimationTimer += animationIncrement;
    if (AnimationTimer >= 1 && AnimationTimer <= 10 && Math.ceil(AnimationTimer) === Math.floor(AnimationTimer)) {
      this.drawCrash();
    }
  }

}


function earth (color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, GameHeight - 100, GameWidth, 100);
}

function drawNew (color, num) {
  ctx.fillStyle = color;
  ctx.fillRect(50, 35 + num * 60, 250, 50);
  ctx.fillStyle = "#fff";
  ctx.font      = "125% Arial";
  ctx.fillText("Cost for 1 up =  " + StartPrise[num - 1] * ModifierPrise[num - 1] * iBuy, 60, 65 + num * 60);
}

function createImageLoader (path) {
  return function (imageName) {
    const image = new Image();

    image.src = path + '/' + imageName;

    return new Promise(function (resolve, reject) {
      image.onload  = function (event) {
        resolve(image);
      }
      image.onerror = function (error) {
        reject(error);
      }
    });
  }
}
