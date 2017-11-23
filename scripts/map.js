PIXI.utils.sayHello();

var displayLog = false;

var rendererWidthScreenPortion = 0.58;
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
  .add('characterSheetEarth', 'images/characterSheet.png')
  .add('characterSheetWater', 'images/characterSheet2.png')
  .add('cloud', 'images/cloud.png')
  .load(setup);

var characterWidth = 512;
var characterHeight = 768;
var characterScale = 0.3;

var character;
var characterRect;
var characterTexture;
var characterTextureEarth;
var characterTextureWater;

var cloudWidth = 579;
var cloudHeight = 126;

var cloud;
var cloudRect;
var cloudTexture;

var cloudInOut;
var fadeIn;
var fadeOut;

var mapWidth = 5652;
var mapHeight = 2948;
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

var pointsCanada = [962,484,1132,342,1154,341,1177,353,1211,339,1272,329,1295,328,1349,339,1360,324,1346,310,1404,275,1442,268,1471,275,1459,252,1528,230,1560,232,1600,218,1646,215,1667,225,1699,206,1760,213,1764,197,1829,186,1878,180,1934,175,1991,164,2139,167,2166,171,1972,225,1884,271,1893,285,1932,317,1966,335,1962,364,1998,383,1957,414,1904,490,1919,538,1906,544,1949,579,1963,601,1955,624,1945,658,1966,665,1973,700,1959,715,1882,701,1859,705,1860,730,1770,768,1757,752,1750,733,1755,704,1737,706,1695,741,1645,742,1623,754,1574,777,1517,795,1509,791,1550,743,1526,715,1516,688,1493,680,1494,675,1461,692,1407,680,1393,675,1026,675,1007,688,973,658,986,624,983,591,1025,556,1015,551,1020,491,982,507];
var Canada = new PIXI.Polygon(pointsCanada);

var pointsFrance = [2622,682,2645,674,2653,678,2666,662,2683,667,2714,649,2712,644,2726,639,2746,649,2762,663,2773,666,2784,671,2799,673,2791,695,2775,718,2784,738,2783,757,2792,757,2772,775,2751,767,2731,772,2729,784,2709,786,2671,775,2664,772,2670,733,2662,714,2652,699,2627,692];
var France = new PIXI.Polygon(pointsFrance);

var pointsFrance2 = [2817,775,2818,793,2813,803,2807,788];
var France2 = new PIXI.Polygon(pointsFrance2);

var pointsRoyaumeUni = [2615,518,2661,504,2657,529,2676,529,2659,554,2674,562,2681,578,2692,582,2696,598,2706,606,2713,608,2717,614,2705,630,2714,634,2697,644,2678,644,2651,647,2642,651,2620,658,2634,635,2639,629,2626,628,2632,606,2631,590,2611,590,2599,586,2592,581,2599,573,2598,569,2602,542,2609,524];
var RoyaumeUni = new PIXI.Polygon(pointsRoyaumeUni);

var pointsEspagne = [2575,762,2662,769,2694,782,2697,778,2731,786,2727,800,2695,813,2680,841,2683,846,2737,828,2745,831,2688,853,2670,870,2653,884,2611,889,2600,897,2572,878,2580,844,2575,834,2581,830,2585,811,2594,800,2585,797,2560,795,2553,777];
var Espagne = new PIXI.Polygon(pointsEspagne);

var pointsPortugal = [2560,793,2589,795,2596,800,2587,809,2576,835,2577,849,2577,860,2571,870,2572,880,2550,880,2554,856,2546,854,2548,843,2558,819];
var Portugal = new PIXI.Polygon(pointsPortugal);

var pointsEtatsUnis = [1025,673,1406,675,1465,689,1427,712,1485,699,1523,722,1529,741,1524,776,1505,796,1516,803,1576,779,1576,772,1594,773,1622,759,1641,740,1693,740,1703,737,1740,700,1756,703,1753,726,1754,740,1684,783,1686,797,1579,895,1581,913,1532,935,1468,985,1473,1064,1464,1089,1444,1099,1433,1040,1422,1001,1406,1011,1392,999,1349,1001,1346,1023,1318,1018,1267,1012,1235,1029,1210,1055,1207,1076,1184,1066,1161,1008,1147,1009,1136,1027,1115,1014,1103,978,1079,974,1074,980,1031,981,983,961,952,961,937,932,912,921,906,846,909,820,987,690,1011,690];
var EtatsUnis = new PIXI.Polygon(pointsEtatsUnis);

var pointsEtatsUnis2 = [1134,342,960,484,985,486,984,504,1019,496,1022,510,1017,542,1025,555,1002,575,958,607,952,612,953,588,968,549,962,501,908,487,873,494,811,502,738,546,723,532,625,574,458,613,453,606,694,523,678,513,631,495,663,436,726,394,808,386,823,377,819,366,835,348,938,323,999,314];
var EtatsUnis2 = new PIXI.Polygon(pointsEtatsUnis2);

var pointsIrlande = [2599,575,2597,569,2572,583,2567,595,2578,603,2569,612,2560,624,2572,630,2603,621,2611,618,2617,607,2609,589,2595,585,2589,579];
var Irlande = new PIXI.Polygon(pointsIrlande);

var pointsDanemark = [];
var Danemark = new PIXI.Polygon(pointsDanemark);

var pointsDanemark2 = [2005,220,2088,211,2088,197,2166,177,2245,173,2287,174,2324,162,2374,167,2447,159,2508,164,2619,179,2565,202,2547,240,2540,263,2508,284,2477,306,2475,329,2428,355,2355,365,2312,391,2274,401,2251,404,2227,416,2222,436,2168,490,2147,488,2126,474,2111,480,2086,424,2085,393,2096,370,2113,360,2100,342,2110,324,2107,313,2126,296,2131,269,2111,260,2101,253,2019,254,1998,236];
var Danemark2 = new PIXI.Polygon(pointsDanemark2);

var pointsBelgique = [2721,640,2769,666,2769,656,2776,650,2771,645,2769,639,2757,632,2741,635];
var Belgique = new PIXI.Polygon(pointsBelgique);

var pointsPaysBas = [2770,644,2775,635,2774,626,2782,626,2787,619,2789,600,2766,596,2757,603,2749,621,2750,635,2763,633,2757,629];
var PaysBas = new PIXI.Polygon(pointsPaysBas);

var pointsAllemagne = [2767,662,2776,650,2776,635,2775,626,2788,620,2788,602,2789,595,2807,597,2810,574,2825,576,2840,584,2859,585,2883,598,2894,640,2854,652,2859,664,2877,677,2866,690,2868,696,2859,693,2844,701,2821,699,2795,698,2798,673];
var Allemagne = new PIXI.Polygon(pointsAllemagne);

var pointsSuisse = [2772,717,2786,700,2818,697,2818,706,2832,712,2819,723,2802,723,2795,729,2782,729,2782,717];
var Suisse = new PIXI.Polygon(pointsSuisse);

var pointsItalie = [2784,727,2781,744,2790,760,2811,755,2829,761,2832,775,2861,801,2877,809,2897,819,2915,846,2907,864,2863,864,2894,886,2903,879,2904,869,2925,854,2925,839,2920,824,2927,822,2945,833,2950,829,2914,806,2913,796,2891,795,2879,770,2861,756,2858,738,2874,729,2876,717,2855,707,2830,711,2810,725,2805,720];
var Italie = new PIXI.Polygon(pointsItalie);

var pointsItalie2 = [2817,806,2822,817,2820,842,2812,846,2801,841,2802,815];
var Italie2 = new PIXI.Polygon(pointsItalie2);

var pointsMexique = [947,961,985,955,987,962,1026,980,1071,983,1078,974,1101,974,1117,995,1116,1009,1132,1021,1150,1009,1162,1007,1178,1025,1169,1035,1179,1046,1182,1068,1209,1080,1199,1088,1187,1146,1210,1192,1208,1205,1214,1200,1223,1212,1261,1204,1276,1211,1295,1167,1318,1153,1347,1156,1347,1165,1333,1189,1329,1209,1317,1211,1310,1218,1283,1218,1275,1226,1285,1250,1264,1252,1258,1265,1256,1279,1226,1244,1217,1241,1192,1258,1119,1225,1094,1209,1066,1177,1069,1161,1069,1136,1026,1081,1032,1068,999,1026,989,998,972,1002,1015,1127,1003,1132,980,1099,977,1068,954,1050];
var Mexique = new PIXI.Polygon(pointsMexique);

var pointsBresil = [1874,1457,1898,1499,1907,1532,1926,1540,1979,1566,2000,1572,2043,1582,2103,1625,2114,1621,2133,1666,2104,1722,2068,1771,2076,1841,2042,1931,1946,1978,1949,2035,1898,2123,1891,2105,1823,2066,1866,2001,1862,1981,1852,1981,1849,1950,1839,1955,1823,1923,1797,1918,1787,1885,1790,1855,1773,1824,1753,1814,1744,1774,1679,1747,1662,1725,1661,1708,1612,1724,1584,1728,1579,1703,1559,1708,1543,1695,1524,1663,1538,1625,1576,1604,1586,1609,1595,1556,1584,1532,1583,1525,1597,1518,1588,1513,1586,1501,1610,1501,1631,1498,1642,1519,1677,1501,1677,1492,1666,1458,1693,1467,1698,1460,1731,1440,1741,1449,1747,1464,1743,1497,1757,1509,1786,1498,1801,1497,1801,1488,1827,1493,1851,1491];
var Bresil = new PIXI.Polygon(pointsBresil);

var pointsLuxembourg = [2774,652,2779,659,2778,667,2771,667,2768,655];
var Luxembourg = new PIXI.Polygon(pointsLuxembourg);

var pointsRussie = [3362,808,3327,785,3303,782,3249,768,3246,770,3198,738,3214,726,3212,704,3232,693,3233,666,3168,652,3145,630,3138,616,3119,620,3106,602,3125,598,3096,576,3095,564,3084,557,3059,554,3047,527,3044,508,3050,498,3072,490,3055,481,3085,452,3083,443,3066,433,3068,422,3057,413,3059,403,3048,381,3050,369,3040,361,3040,352,3054,342,3070,339,3098,345,3178,367,3187,381,3218,389,3207,356,3267,340,3318,350,3342,342,3308,324,3280,310,3299,272,3328,250,3351,245,3411,237,3426,243,3340,277,3363,321,3448,343,3451,325,3452,312,3463,291,3464,281,3478,284,3529,293,3564,299,3580,283,3619,277,3628,261,3690,244,3734,243,3731,229,3637,211,3602,198,3607,183,3641,184,3678,193,3771,215,3862,240,3906,259,3932,280,4039,276,4104,287,4126,301,4124,255,4160,242,4240,239,4299,263,4313,295,4383,315,4436,320,4497,327,4511,336,4577,339,4591,330,4669,335,4681,311,4723,315,4747,348,4832,367,4899,383,4926,395,4928,422,4850,409,4835,420,4874,449,4836,457,4819,497,4770,488,4767,522,4797,547,4800,606,4791,641,4692,540,4685,525,4699,483,4644,475,4643,503,4487,504,4478,535,4471,568,4512,580,4565,582,4658,674,4679,723,4644,726,4600,664,4591,745,4579,781,4526,781,4508,745,4517,735,4531,738,4519,682,4495,701,4438,664,4416,663,4348,602,4283,600,4296,627,4295,658,4283,672,4254,656,4224,653,4216,668,4175,669,4150,662,4126,648,4091,652,4067,649,4053,635,4008,624,4003,640,4011,649,4004,666,3967,654,3932,641,3899,663,3882,675,3828,650,3805,638,3767,642,3694,588,3670,596,3623,579,3584,565,3501,586,3509,605,3499,626,3513,638,3493,647,3468,640,3429,646,3387,629,3349,640,3346,660,3328,652,3334,691,3363,716,3341,745,3363,790,3370,801];
var Russie = new PIXI.Polygon(pointsRussie);

var pointsInde = [3719,1139,3748,1166,3770,1158,3772,1145,3779,1157,3786,1188,3802,1254,3831,1314,3853,1371,3871,1389,3878,1392,3893,1367,3899,1351,3908,1352,3904,1327,3909,1304,3902,1264,3936,1242,3939,1233,3964,1215,3978,1184,3999,1174,3999,1157,4026,1151,4016,1106,4006,1097,4021,1089,4006,1076,4008,1066,4000,1064,3992,1067,3969,1060,3947,1055,3923,1047,3894,1036,3877,1021,3882,1003,3868,991,3843,970,3853,957,3840,939,3839,927,3825,919,3823,905,3801,918,3769,918,3764,929,3783,978,3769,1004,3754,1041,3738,1049,3733,1038,3720,1058,3747,1098,3715,1102,3706,1120,3718,1131];
var Inde = new PIXI.Polygon(pointsInde);

var pointsJapon = [4653,729,4704,761,4731,747,4747,734,4765,724,4750,741,4748,765,4711,793,4695,798,4707,821,4722,841,4720,869,4726,894,4733,910,4728,914,4719,931,4695,925,4682,936,4677,949,4658,942,4648,944,4642,955,4626,955,4624,964,4629,995,4612,1012,4608,983,4598,961,4583,957,4578,955,4591,944,4609,922,4618,903,4649,902,4662,898,4662,884,4660,878,4666,875,4691,845,4677,824,4655,792,4660,754];
var Japon = new PIXI.Polygon(pointsJapon);

var pointsCoreeDuSud = [4538,928,4567,915,4561,883,4532,852,4518,859,4512,874];
var CoreeDuSud = new PIXI.Polygon(pointsCoreeDuSud);

var pointsCoreeDuNord = [4532,852,4510,842,4511,831,4521,821,4528,809,4524,801,4527,783,4515,776,4510,788,4502,794,4506,801,4483,799,4481,810,4466,825,4466,831,4482,837,4482,850,4487,863,4507,865];
var CoreeDuNord = new PIXI.Polygon(pointsCoreeDuNord);

var pointsChine = [4279,610,4282,603,4294,594,4329,599,4363,619,4419,666,4443,668,4477,694,4503,700,4519,684,4530,694,4535,731,4538,743,4515,735,4511,743,4529,774,4524,781,4505,794,4504,803,4483,799,4481,808,4461,833,4432,846,4425,837,4411,817,4391,844,4393,861,4411,878,4425,865,4454,875,4458,885,4437,899,4424,918,4482,974,4488,1007,4496,1033,4482,1064,4466,1093,4440,1122,4434,1130,4396,1138,4353,1156,4357,1172,4346,1174,4340,1150,4316,1151,4293,1133,4270,1123,4249,1136,4231,1132,4227,1140,4220,1136,4221,1158,4215,1157,4211,1148,4198,1153,4180,1144,4177,1123,4169,1107,4152,1114,4149,1092,4161,1075,4157,1047,4137,1035,4123,1036,4112,1018,4086,1018,4056,1046,4023,1030,4011,1049,4006,1036,3982,1043,3934,1024,3890,996,3887,1001,3845,980,3839,960,3852,956,3839,940,3852,911,3834,903,3819,906,3793,902,3762,879,3757,853,3749,856,3739,842,3739,831,3756,822,3775,819,3777,810,3796,811,3798,800,3818,791,3813,784,3821,775,3804,745,3798,743,3819,737,3835,741,3830,729,3829,705,3853,709,3865,705,3857,690,3857,680,3872,682,3865,668,3880,676,3911,687,3939,709,3942,732,3968,742,3983,740,4041,781,4109,778,4133,791,4158,794,4175,803,4214,786,4240,779,4255,758,4244,749,4253,744,4266,744,4279,734,4298,727,4338,709,4302,691,4295,699,4276,694,4271,687,4264,661,4281,659,4297,651,4293,621,4289,611,4113,783];
var Chine = new PIXI.Polygon(pointsChine);

var country;

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

  cloudRect = new PIXI.Rectangle(0, 0, cloudWidth, cloudHeight);
  cloudTexture = PIXI.loader.resources['cloud'].texture;
  cloudTexture.frame = cloudRect;

  cloud = new PIXI.Sprite(cloudTexture);
  cloud.anchor.set(0.5, 1);
  cloud.scale.set(characterScale, characterScale);
  cloud.x = character.x;
  cloud.y = character.y+20;

  testPosition(mapRect.x+character.x, mapRect.y+character.y-map.y);

  stage.addChild(map);
  stage.addChild(mapTop);
  stage.addChild(mapBottom);
  stage.addChild(cloud);
  stage.addChild(character);

  animationLoop();

  window.onresize = function (event) {
    renderer.resize(window.innerWidth*rendererWidthScreenPortion,
      window.innerHeight*rendererHeightScreenPortion);

    stage.scale.set(renderer.screen.width/usefulMapWidth*visibleMapScreenPortion,
      renderer.screen.width/usefulMapWidth*visibleMapScreenPortion);

    character.y -= map.y;
    map.y = (renderer.screen.height-stage.scale.y*usefulMapHeight)/(2*stage.scale.y);
    character.y += map.y;
    cloud.y = character.y+20;
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
  cloud.x = character.x;
  cloud.y = character.y+20;

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
      cloud.x = character.x;
      cloud.y = character.y+20;

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
    changeCountry("Canada");
  } else if(France.contains(x, y) || France2.contains(x, y)) {
    changeCountry("France");
  } else if(RoyaumeUni.contains(x, y)) {
    changeCountry("Royaume-Uni");
  } else if(Espagne.contains(x, y)) {
    changeCountry("Espagne");
  } else if(Portugal.contains(x, y)) {
    changeCountry("Portugal");
  } else if(EtatsUnis.contains(x, y) || EtatsUnis2.contains(x, y)) {
    changeCountry("Etats-Unis");
  } else if(Irlande.contains(x, y)) {
    changeCountry("Irlande");
  } else if(Danemark.contains(x, y) || Danemark2.contains(x, y)) {
    changeCountry("Danemark");
  } else if(Belgique.contains(x, y)) {
    changeCountry("Belgique");
  } else if(PaysBas.contains(x, y)) {
    changeCountry("Pays-Bas");
  } else if(Allemagne.contains(x, y)) {
    changeCountry("Allemagne");
  } else if(Suisse.contains(x, y)) {
    changeCountry("Suisse");
  } else if(Italie.contains(x, y) || Italie2.contains(x, y)) {
    changeCountry("Italie");
  } else if(Mexique.contains(x, y)) {
    changeCountry("Mexique");
  } else if(Bresil.contains(x, y)) {
    changeCountry("Brésil");
  } else if(Luxembourg.contains(x, y)) {
    changeCountry("Luxembourg");
  } else if(Russie.contains(x, y)) {
    changeCountry("Russie");
  } else if(Inde.contains(x, y)) {
    changeCountry("Inde");
  } else if(Japon.contains(x, y)) {
    changeCountry("Japon");
  } else if(CoreeDuSud.contains(x, y)) {
    changeCountry("Corée du Sud");
  } else if(CoreeDuNord.contains(x, y)) {
    changeCountry("Corée du Nord");
  } else if(Chine.contains(x, y)) {
    changeCountry("Chine");
  } else {
    changeCountry("CAKE");
  }

  character.texture.frame = characterRect;
}

function changeCountry(name) {
  consoleLog(name);
  country = name;

  if(country === 'CAKE') {
    cloudFade('in');
    //cloud.visible = true;
    //character.texture = characterTextureEarth;
    document.getElementById('infoCountry').innerHTML = 'Pays non identifié';
  } else {
    cloudFade('out');
    //cloud.visible = false;
    //character.texture = characterTextureWater;
    document.getElementById('infoCountry').innerHTML = country;
  }

  chooseArticleContent();
}

function cloudFade(inOut) {
  if (cloudInOut != inOut && inOut == 'in') {
    cloudInOut = inOut;
    clearInterval(fadeOut);

    fadeIn = setInterval(function() {
      if (cloudInOut == 'out' || cloud.alpha >= 1) {
        cloudInOut = null;
        clearInterval(fadeIn);
      } else
        cloud.alpha += 0.1;
    }, 1000/30);
  } else if (cloudInOut != inOut && inOut == 'out') {
    cloudInOut = inOut;
    clearInterval(fadeIn);

    fadeOut = setInterval(function() {
      if (cloudInOut == 'in' || cloud.alpha <= 0) {
        cloudInOut = null;
        clearInterval(fadeOut);
      } else
        cloud.alpha -= 0.1;
    }, 1000/30);
  }
}

function consoleLog(message) {
  if (displayLog)
    console.log(message);
}
