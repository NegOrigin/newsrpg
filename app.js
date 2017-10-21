PIXI.utils.sayHello();

var displayLog = true;

var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
  antialias: false,
  transparent: true,
  resolution: 1
});

document.querySelector('#display').appendChild(renderer.view);

var stage = new PIXI.Container();

renderer.render(stage);

renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
//renderer.autoResize = true;

PIXI.loader
  .add('mapPic', 'images/map.png')
  .add('mapTopPic', 'images/map.png')
  .add('mapBottomPic', 'images/map.png')
  .add('characterSheet', 'images/characterSheet4x.png')
  .load(setup);

var characterWidth = 512;
var characterHeight = 768;
var characterScale = 0.3;

var character;
var characterRect;
var characterTexture;

var mapWidth = 2000;
var mapHeight = 1124;
var mapBorder = 32;

var visibleMapScreenPortion = 0.7;

var usefulMapWidth = mapWidth/2;
var usefulMapHeight = mapHeight/2;

var map;
var mapRect;
var mapTexture;

var mapTop;
var mapTopRect;
var mapTopTexture;

var mapBottom;
var mapBottomRect;
var mapBottomTexture;

var move;
var moveState;
var keyPressed;

var movementSpeed = 1.5;

function setup() {
  //stage.interactive = true;

  stage.scale.set(renderer.screen.width/usefulMapWidth*visibleMapScreenPortion,
    renderer.screen.width/usefulMapWidth*visibleMapScreenPortion);

  mapRect = new PIXI.Rectangle(0.5*(mapWidth-usefulMapWidth), 0.5*(mapHeight-usefulMapHeight),
    usefulMapWidth, usefulMapHeight);
  mapTexture = PIXI.loader.resources['mapPic'].texture;
  mapTexture.frame = mapRect;

  map = new PIXI.Sprite(mapTexture);
  map.y = (renderer.screen.height-stage.scale.y*usefulMapHeight)/(2*stage.scale.y);

  mapTopRect = new PIXI.Rectangle(mapRect.x, 0,
    usefulMapWidth, mapRect.y);
  mapTopTexture = PIXI.loader.resources['mapTopPic'].texture;
  mapTopTexture.frame = mapTopRect;

  mapTop = new PIXI.Sprite(mapTopTexture);
  mapTop.anchor.set(0, 1);
  mapTop.y = map.y;

  mapBottomRect = new PIXI.Rectangle(mapRect.x, mapRect.y+usefulMapHeight,
    usefulMapWidth, mapRect.y);
  mapBottomTexture = PIXI.loader.resources['mapBottomPic'].texture;
  mapBottomTexture.frame = mapBottomRect;

  mapBottom = new PIXI.Sprite(mapBottomTexture);
  mapBottom.y = map.y+usefulMapHeight;

  characterRect = new PIXI.Rectangle(0, 0, characterWidth/4, characterHeight/4);
  characterTexture = PIXI.loader.resources['characterSheet'].texture;
  characterTexture.frame = characterRect;

  character = new PIXI.Sprite(characterTexture);
  character.anchor.set(0.5, 1);
  character.scale.set(characterScale, characterScale);
  character.x = usefulMapWidth/2;
  character.y = map.y+(usefulMapHeight+characterScale*(character.anchor.y*characterHeight/4))/2;
  character.vx = 0;
  character.vy = 0;

  stage.addChild(map);
  stage.addChild(mapTop);
  stage.addChild(mapBottom);
  stage.addChild(character);

  animationLoop();

  window.onresize = function (event) {
    renderer.resize(window.innerWidth, window.innerHeight);

    stage.scale.set(renderer.screen.width/usefulMapWidth*visibleMapScreenPortion,
      renderer.screen.width/usefulMapWidth*visibleMapScreenPortion);

    character.y -= map.y;
    map.y = (renderer.screen.height-stage.scale.y*usefulMapHeight)/(2*stage.scale.y);
    character.y += map.y;
    mapTop.y = map.y;
    mapTopRect.y = mapRect.y-mapTopRect.height;
    mapBottom.y = map.y+usefulMapHeight;
    mapBottomRect.y = mapRect.y+usefulMapHeight;
  }

  window.addEventListener('keydown', function(e) {
    switch(e.which) {
      case 83:
      case 40:
        e.preventDefault();
        startMove('down');
        keyPressed = e.which;
        break;
      case 81:
      case 37:
      case 65:
        e.preventDefault();
        startMove('left');
        keyPressed = e.which;
        break;
      case 68:
      case 39:
        e.preventDefault();
        startMove('right');
        keyPressed = e.which;
        break;
      case 90:
      case 38:
      case 87:
        e.preventDefault();
        startMove('up');
        keyPressed = e.which;
        break;
      default:
        consoleLog(e.which);
    }
  });

  window.addEventListener('keyup', function(e) {
    if (e.which == keyPressed) {
      e.preventDefault();
      stopMove();
    }
  });
}

function animationLoop() {
  requestAnimationFrame(animationLoop);
  renderer.render(stage);
}

function startMove(direction) {
  consoleLog('startMove '+direction);

  switch(direction) {
    case 'down':
      characterRect.y = 0;
      character.texture.frame = characterRect;
      character.vx = 0;
      outOfBounds(character.x, character.y + movementSpeed) ?
        character.vy = 0 : character.vy = movementSpeed;
      break;
    case 'left':
      characterRect.y = characterHeight/4;
      character.texture.frame = characterRect;
      outOfBounds(character.x - movementSpeed, character.y) ?
        character.vx = 0 : character.vx = -movementSpeed;
      character.vy = 0;
      break;
    case 'right':
      characterRect.y = 2*characterHeight/4;
      character.texture.frame = characterRect;
      outOfBounds(character.x + movementSpeed, character.y) ?
        character.vx = 0 : character.vx = movementSpeed;
      character.vy = 0;
      break;
    case 'up':
      characterRect.y = 3*characterHeight/4;
      character.texture.frame = characterRect;
      character.vx = 0;
      outOfBounds(character.x, character.y - movementSpeed) ?
        character.vy = 0 : character.vy = -movementSpeed;
      break;
  }

  if (!moveState)
    actionMove();
}

function actionMove() {
  consoleLog('actionMove');

  clearInterval(move);

  moveState = 1;

  characterRect.x += characterWidth/4;
  character.texture.frame = characterRect;

  character.x += character.vx;
  character.y += character.vy;

  moveMap();

  animation = setInterval(function() {
    characterRect.x + characterWidth/4 < characterWidth ?
      characterRect.x += characterWidth/4 : characterRect.x = 0;
    character.texture.frame = characterRect;
  }, 1000/8);

  move = setInterval(function() {
    if(!outOfBounds(character.x+character.vx, character.y+character.vy)) {
      character.x += character.vx;
      character.y += character.vy;

      moveMap();
    }
  }, 1000/60);
}

function moveMap() {
  mapRect.x += character.vx/
    ((usefulMapWidth/2)-(characterScale*(0.5*characterWidth/4)+mapBorder))*
    (mapWidth/2-usefulMapWidth/2);
  mapRect.y += character.vy/
    ((usefulMapHeight/2)-(characterScale*(0.5*characterHeight/4)+mapBorder))*
    (mapHeight/2-usefulMapHeight/2);

  mapTopRect.x = mapRect.x;
  mapTopRect.height = mapRect.y;

  mapBottomRect.x = mapRect.x;
  mapBottomRect.y = mapRect.y+usefulMapHeight;
  mapBottomRect.height = mapHeight-mapBottomRect.y;

  mapTexture.frame = mapRect;
  mapTopTexture.frame = mapTopRect;
  mapBottomTexture.frame = mapBottomRect;
}

function stopMove() {
  consoleLog('stopMove');

  clearInterval(animation);
  clearInterval(move);

  characterRect.x = 0;
  character.texture.frame = characterRect;

  character.vx = 0;
  character.vy = 0;

  moveState = 0;
}

function outOfBounds(x, y) {
  if (x < characterScale*(character.anchor.x*characterWidth/4)+mapBorder
  || y-map.y < characterScale*(character.anchor.y*characterHeight/4)+mapBorder
  || x > usefulMapWidth-(characterScale*((1-character.anchor.x)*characterWidth/4)+mapBorder)
  || y-map.y > usefulMapHeight-(characterScale*((1-character.anchor.y)*characterHeight/4)+mapBorder)) {
    consoleLog('out of bounds');
    return true;
  } else {
    return false;
  }
}

function consoleLog(message) {
  if (displayLog)
    console.log(message);
}
