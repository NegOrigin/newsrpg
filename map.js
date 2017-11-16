PIXI.utils.sayHello();

var displayLog = false;

var rendererWidthScreenPortion = 0.6;
var rendererHeightScreenPortion = 0.71;

var renderer = PIXI.autoDetectRenderer(window.innerWidth*rendererWidthScreenPortion,
  window.innerHeight*rendererHeightScreenPortion, {
  antialias: false,
  transparent: true,
  resolution: 1
});

document.querySelector('#map').appendChild(renderer.view);

var stage = new PIXI.Container();

renderer.render(stage);

renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
//renderer.autoResize = true;

PIXI.loader
  .add('mapPic', 'images/worldMap.jpg')
  .add('mapTopPic', 'images/worldMap.jpg')
  .add('mapBottomPic', 'images/worldMap.jpg')
  .add('characterSheetEarth', 'images/characterSheet4x.png')
  .add('characterSheetWater', 'images/characterSheet4x2.png')
  .load(setup);

var characterWidth = 512;
var characterHeight = 768;
var characterScale = 0.3;

var character;
var characterRect;
var characterTexture;
var characterTextureEarth;
var characterTextureWater;

var mapWidth = 5866;
var mapHeight = 3144;
var mapBorder = 32;

var visibleMapScreenPortion = 1;

var visibleMapRatio = 4;
var usefulMapWidth = mapWidth/visibleMapRatio;
var usefulMapHeight = mapHeight/visibleMapRatio;

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

var pointsCanada = [1405,423,1238,438,1067,583,1091,605,1124,597,1120,639,1132,654,1094,690,1077,745,1116,785,1136,771,1504,770,1568,793,1600,769,1637,812,1653,843,1620,891,1733,856,1751,843,1798,840,1853,800,1864,804,1855,827,1873,864,1975,822,1963,784,2019,810,2063,813,2080,797,2074,701,2020,649,2018,587,2105,487,2074,429,2002,381,2008,360,2272,272,2171,264,1981,276,1704,319,1558,347];
var Canada = new PIXI.Polygon(pointsCanada);

var pointsFrance = [2725,777,2778,776,2774,761,2792,766,2808,758,2820,740,2833,736,2862,754,2906,770,2899,798,2881,813,2891,819,2891,838,2897,857,2878,872,2856,867,2835,872,2835,882,2777,870,2774,812];
var France = new PIXI.Polygon(pointsFrance);

var zoneName = new PIXI.Text("", {fontFamily: "Arial", fontSize: 32, fill: "black"});

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
  characterTextureEarth = PIXI.loader.resources['characterSheetEarth'].texture;
  characterTextureWater = PIXI.loader.resources['characterSheetWater'].texture;
  characterTexture = characterTextureEarth;
  characterTexture.frame = characterRect;

  character = new PIXI.Sprite(characterTexture);
  character.anchor.set(0.5, 1);
  character.scale.set(characterScale, characterScale);
  character.x = usefulMapWidth/2;
  character.y = map.y+(usefulMapHeight+characterScale*(character.anchor.y*characterHeight/4))/2;
  character.vx = 0;
  character.vy = 0;

  zoneName.position.set(usefulMapWidth, 0);

  testPosition(mapRect.x+character.x, mapRect.y+character.y-map.y);

  stage.addChild(map);
  stage.addChild(mapTop);
  stage.addChild(mapBottom);
  stage.addChild(character);
  stage.addChild(zoneName);

  animationLoop();

  window.onresize = function (event) {
    renderer.resize(window.innerWidth*rendererWidthScreenPortion,
      window.innerHeight*rendererHeightScreenPortion);

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
  testPosition(mapRect.x+character.x, mapRect.y+character.y-map.y);

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
      testPosition(mapRect.x+character.x, mapRect.y+character.y-map.y);
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

function testPosition(x, y) {
  if(Canada.contains(x, y)) {
    character.texture = characterTextureWater;
    displayZone("Ecole");
  } else if(France.contains(x, y)) {
    character.texture = characterTextureWater;
    displayZone("Maison");
  } else {
    character.texture = characterTextureEarth;
    displayZone("Quelque part dans le monde");
  }

  character.texture.frame = characterRect;
}

function displayZone(name) {
  zoneName.text = name;
}

function consoleLog(message) {
  if (displayLog)
    console.log(message);
}
