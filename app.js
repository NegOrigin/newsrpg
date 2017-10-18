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
renderer.autoResize = true;

PIXI.loader
  .add('mapPic', 'images/map.png')
  .add('characterSheet', 'images/characterSheet4x.png')
  .load(setup);

var characterWidth = 512;
var characterHeight = 768;
var characterScale = 0.5;

var mapWidth = 2000;
var mapHeight = 1124;
var mapBorder = 32;

var visibleMapWidth = 700;
var visibleMapHeight = 500;

var map;
var mapRect;
var mapTexture;

var character;
var characterRect;
var characterTexture;

var move;
var moveState;
var keyPressed;

var movementSpeed = 1;

function setup() {
  //stage.interactive = true;

  mapRect = new PIXI.Rectangle(0, 0, visibleMapWidth, visibleMapHeight);
  mapRect.x = 0.5*(mapWidth-visibleMapWidth);
  mapRect.y = 0.5*(mapHeight-visibleMapHeight);
  mapTexture = PIXI.loader.resources['mapPic'].texture;
  mapTexture.frame = mapRect;

  map = new PIXI.Sprite(mapTexture);

  characterRect = new PIXI.Rectangle(0, 0, characterWidth/4, characterHeight/4);
  characterTexture = PIXI.loader.resources['characterSheet'].texture;
  characterTexture.frame = characterRect;

  character = new PIXI.Sprite(characterTexture);
  character.anchor.set(0.5, 1);
  character.scale.set(characterScale, characterScale);

  character.x = visibleMapWidth/2;
  character.y = (visibleMapHeight+characterScale*(character.anchor.y*characterHeight/4))/2;

  character.vx = 0;
  character.vy = 0;

  stage.addChild(map);
  stage.addChild(character);

  animationLoop();

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
    ((visibleMapWidth/2)-(characterScale*(0.5*characterWidth/4)+mapBorder))*
    (mapWidth/2-visibleMapWidth/2);
  mapRect.y += character.vy/
    ((visibleMapHeight/2)-(characterScale*(0.5*characterHeight/4)+mapBorder))*
    (mapHeight/2-visibleMapHeight/2);

  mapTexture.frame = mapRect;
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
  || y < characterScale*(character.anchor.y*characterHeight/4)+mapBorder
  || x > visibleMapWidth-(characterScale*((1-character.anchor.x)*characterWidth/4)+mapBorder)
  || y > visibleMapHeight-(characterScale*((1-character.anchor.y)*characterHeight/4)+mapBorder)) {
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
