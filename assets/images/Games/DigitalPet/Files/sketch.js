let bars = {
  'hunger': 100,
  'energy': 100,
  'health': 100,
  'luck': 100
}
let sleepTimer = 0;
let sleeping = false;

let barColor = ["green", 'orange', "red"]//kleur van de statistiekbalk
let cloudText = ['Ik heb honger!', 'Ik ben moe 😩', 'Ik voel me niet lekker!', 'Ik verveel me!', 'Wat een topdag!😊']//tekstwolkjes tekst

let pooSprite;//sprite voor drol
let pooSpawnPointX = [innerWidth / 4, innerWidth / 3, innerWidth / 2, innerWidth / 4 * 3, innerWidth / 3 * 2]//coordinaten voor drollen
let pooSpawnPointY = [innerHeight / 4 + 200, innerHeight / 3, innerHeight / 2, innerHeight / 4 * 3, innerHeight / 3 * 2]

let gameStatus = 'livingroom'
let inventoryOpened = false;
let closetOpened = false;
let shopOpened = false;

let neutral = true;//emoties voor character
let sad = false;
let happy = false;

let heartCapImage;
let beanieImage; //kledingstukken
let luigiCapImage;
let rainbowCapImage;
let eyeCapImage;
let dinoCapImage

let wearingHeartCap = false;
let wearingBeanie = false;
let wearingLuigi = false;
let wearingRainbow = false;
let wearingEye = false;
let wearingDino = false;
let wearingNothing = true

let characterX = innerWidth / 2;//maak de character bestuurbaar
let characterY = innerHeight / 2;

let beanieIsBought = false;
let luigiCapIsBought = false;
let eyeCapIsBought = false;
let heartCapIsBought = false;
let dinoCapIsBought = false;
let rainbowCapIsBought = false;

let isWalkingLeft = false;//sprites voor welke kant de character op loopt
let isWalkingRight = false;

let bodyImage;
let bodyWalkingLeftImage;
let bodyWalkingRightImage;
let neutralImage;
var sadImage;
var happyImage;
var tiredImage;
let hungryImage;
let stinkImage;
let homeBackgroundImage;
let inventoryImage;
let shopImage;
let closetImage;
let shopButtonImage;
let minigameImage;
let settingsImage;
let musicOff;
let musicOn;
let slider;
let settingsOpened = false;
let minigameButtonImage;
let inverntoryButtonImage;
let sleepButtonImage;
let miniGameBackgroundImage;
let musicIsOn = true;
let miniGameMusic;
let homeMusic;
let collectItemSound;
let manEatingSound;
let fartSound;
let clickSound;
let appleImage;
let bananaImage;
let energyDrinkImage;
let hamburgerImage;
let heartImage;
let crossImage;
let appleCounter = 0;//tellen items op in inventory
let bananaCounter = 0;
let energyDrinkCounter = 0;
let hamburgerCounter = 0;
let fallSpeed; //bepaalt valsnelheid
let miniGameTimer = 0;//klok
//spawn locatie van het eten/drinken
let fruitSpawnPoint = [innerWidth / 12, innerWidth / 12 * 2, innerWidth / 12 * 3, innerWidth / 12 * 4, innerWidth / 12 * 5, innerWidth / 12 * 6, innerWidth / 12 * 7, innerWidth / 12 * 8, innerWidth / 12 * 9, innerWidth / 12 * 10, innerWidth / 12 * 11]
let appleY = -10;
let bananaY = -10 - innerHeight / 3;
let energyDrinkY = -10 - innerHeight / 3 * 2;
let hamburgerY = -10 - innerHeight / 4
function preload() {//laad alle sprites in en sounds in
  bodyImage = loadImage('assets/body.png')
  bodyWalkingLeftImage = loadImage('assets/bodywalk.png')
  bodyWalkingRightImage = loadImage('assets/bodywalkrechts.png')
  hungryImage = loadImage('assets/hongerstaand.png')
  hungryWalkingLImage = loadImage('assets/hongerlinks.png')
  hungryWalkingRImage = loadImage('assets/hongerrechts.png')

  neutralImage = loadImage("assets/neutraal.png")//emoties
  sadImage = loadImage("assets/sip.png")
  happyImage = loadImage("assets/blij.png")

  beanieImage = loadImage('assets/muts.png'); //kledingstukken
  luigiCapImage = loadImage('assets/luigipet.png');
  eyeCapImage = loadImage('assets/oogpet.png');
  heartCapImage = loadImage('assets/hartpet.png');
  dinoCapImage = loadImage('assets/dinopet.png');
  rainbowCapImage = loadImage('assets/regenboogpet.png');

  ZiekImage = loadImage("assets/ziek.png")//ziek
  tiredImage = loadImage('assets/moe.png')

  minigameButtonImage = loadImage('assets/game.png');//minigame assets
  minigameImage = loadImage('assets/game.png')
  inverntoryButtonImage = loadImage('assets/food.png');
  shopImage = loadImage('assets/shop.png')
  closetImage = loadImage('assets/closet.png')
  shopButtonImage = loadImage('assets/shopbutton.png')
  sleepButtonImage = loadImage('assets/sleep.png');
  homeBackgroundImage = loadImage("assets/huisachtergrond.png")
  inventoryImage = loadImage('assets/inventory.png')
  miniGameBackgroundImage = loadImage('assets/minigamebackground.jpg')
  backButtonImage = loadImage('assets/backbutton.png')
  settingsImage = loadImage('assets/settings.png')
  crossImage = loadImage('assets/cross.png')

  pooSprite = loadImage("assets/poep.png")//afbeeldingen als de verzorging te laag is
  stinkImage = loadImage('assets/stink.png')
  appleImage = loadImage('assets/appel.png')//afbeeldingen van collectebles
  bananaImage = loadImage('assets/banaan.webp')
  energyDrinkImage = loadImage('assets/energydrink.png')
  hamburgerImage = loadImage('assets/hamburger.png')
  collectItemSound = loadSound('soundassets/collect.mp3')//sound assets
  manEatingSound = loadSound('soundassets/maneating.mp3')
  miniGameMusic = loadSound('soundassets/minigamemusic.mp3')
  homeMusic = loadSound('soundassets/huiskamermusic.mp3')
  fartSound = loadSound('soundassets/scheet.mp3')
  clickSound = loadSound('soundassets/clicksound.mp3')
}
function setup() {
  resizeImage()
  createMusicButtons()
  createVolumeSlider()
  randomSpawnPoints()
  createCanvas(innerWidth, innerHeight);//maakt canvas
  getItems()
  console.log("start");
}
function createMusicButtons() {//zorgt dat je muziek aan/uit kan zetten
  musicOff = createButton('Music Off')
  musicOn = createButton('Music On')
  musicOff.position(400, 210);
  musicOn.position(500, 210)
  musicOn.mousePressed(startMusic)
  musicOff.mousePressed(stopMusic)
  musicOff.hide()
  musicOn.hide()
}
function createVolumeSlider() {//kan volume bepalen met slider
  slider = createSlider(0, 15, 50, 1)
  let savedValue = getItem('sliderValue')
  slider.position(400, 180)
  slider.size(300, 30)
  slider.hide()
  if (savedValue !== null) {
    slider.value(savedValue);
  }
}
function randomSpawnPoints() {
  randomLocatie0 = random(fruitSpawnPoint)//maakt random fruitlocatie voor minigame
  randomLocatie1 = random(fruitSpawnPoint)
  randomLocatie2 = random(fruitSpawnPoint)
  randomLocatie3 = random(fruitSpawnPoint)
  randomPooX0 = random(pooSpawnPointX)//maakt random spawnlocaties voor drollen
  randomPooY0 = random(pooSpawnPointY)
  randomPooX1 = random(pooSpawnPointX)
  randomPooY1 = random(pooSpawnPointY)
}
function resizeImage() {
  bodyImage.resize(80, 120);//maakt sprites de juistte grootte
  bodyWalkingLeftImage.resize(80, 120);
  bodyWalkingRightImage.resize(80, 120);
  hungryImage.resize(80, 120);
  hungryWalkingLImage.resize(80, 120);
  hungryWalkingRImage.resize(80, 120);
  neutralImage.resize(80.5, 103.5)
  happyImage.resize(80.5, 103.5)
  sadImage.resize(80.5, 103.5)

  beanieImage.resize(80.5, 120)//kledingstukken
  luigiCapImage.resize(80.5, 120)
  eyeCapImage.resize(80.5, 120)
  heartCapImage.resize(80.5, 120)
  dinoCapImage.resize(80.5, 120)
  rainbowCapImage.resize(80.5, 120)

  ZiekImage.resize(80.5, 103.5)//ziekte/moe afbeelding
  tiredImage.resize(80.5, 103.5)
  stinkImage.resize(100, 100)
  pooSprite.resize(50, 50)

  homeBackgroundImage.resize(innerWidth - innerWidth / 12, innerHeight)//achtergrond/ ui afbeeldingen
  inventoryImage.resize(500, 125)
  shopImage.resize(375, 562.5)
  closetImage.resize(700, 100)
  shopButtonImage.resize(100, 140)
  sleepButtonImage.resize(100, 140)
  inverntoryButtonImage.resize(100, 140)
  minigameButtonImage.resize(100, 140)
  miniGameBackgroundImage.resize(innerWidth, innerHeight)
  backButtonImage.resize(60, 60)
  settingsImage.resize(60, 60)
  crossImage.resize(40, 40)

  appleImage.resize(50, 50)//minigame afbeeldingen
  bananaImage.resize(50, 50)
  energyDrinkImage.resize(50, 50)
  hamburgerImage.resize(50, 50)
}
function getItems() {
  characterX = getItem('characterX') || innerWidth / 2
  characterY = getItem('characterY') || innerHeight / 2
  bars.hunger = getItem('bars.hunger') || 70
  bars.health = getItem('bars.health') || 80
  bars.energy = getItem('bars.energy') || 60
  bars.luck = getItem('bars.luck') || 75

  appleCounter = getItem('appleCounter') || 0
  bananaCounter = getItem('bananaCounter') || 0
  energyDrinkCounter = getItem('energyDrinkCounter') || 0
  hamburgerCounter = getItem('hamburgerCounter') || 0

  gameStatus = getItem('gameStatus') || 'livingroom'
  settingsOpened = getItem('settingsOpened') || false;
  inventoryOpened = getItem('inventoryOpened', inventoryOpened) || false;
  shopOpened = getItem('shopOpened', shopOpened) || false;
  closetOpened = getItem('closetOpened') || false;
  //alle collectebles uit de shop
  wearingHeartCap = getItem('wearingHeartCap') || false;
  wearingBeanie = getItem('wearingBeanie') || false;
  wearingLuigi = getItem('wearingLuigi') || false;
  wearingRainbow = getItem('wearingRainbow') || false;
  wearingEye = getItem('wearingEye') || false;
  wearingDino = getItem('wearingDino') || false;
  wearingNothing = getItem('wearingNothing') || false;

  beanieIsBought = getItem('beanieIsBought') || false;
  luigiCapIsBought = getItem('luigiCapIsBought') || false;
  eyeCapIsBought = getItem('eyeCapIsBought') || false;
  heartCapIsBought = getItem('heartCapIsBought') || false;
  dinoCapIsBought = getItem('dinoCapIsBought') || false;
  rainbowCapIsBought = getItem('rainbowCapIsBought') || false;
  musicIsOn = getItem('musicIsOn', musicIsOn) || true;
}
function storeItems() {//zorgt dat je de page opnieuw in kan laden zonder voortgang te verliezen
  storeItem('characterX', characterX)
  storeItem('characterY', characterY)


  storeItem('bars.hunger', bars.hunger)
  storeItem('bars.energy', bars.energy)
  storeItem('bars.health', bars.health)
  storeItem('bars.luck', bars.luck)

  storeItem('appleCounter', appleCounter)
  storeItem('bananaCounter', bananaCounter)
  storeItem('energyDrinkCounter', energyDrinkCounter)
  storeItem('hamburgerCounter', hamburgerCounter)

  storeItem('gameStatus', gameStatus)
  storeItem('settingsOpened', settingsOpened)
  storeItem('inventoryOpened', inventoryOpened)
  storeItem('shopOpened', shopOpened)
  storeItem('closetOpened', closetOpened)

  storeItem('wearingHeartCap', wearingHeartCap)
  storeItem('wearingBeanie', wearingBeanie)
  storeItem('wearingLuigi', wearingLuigi)
  storeItem('wearingRainbow', wearingRainbow)
  storeItem('wearingEye', wearingEye)
  storeItem('wearingDino', wearingDino)
  storeItem('wearingNothing', wearingNothing)

  storeItem('beanieIsBought', beanieIsBought)
  storeItem('luigiCapIsBought', luigiCapIsBought)
  storeItem('eyeCapIsBought', eyeCapIsBought)
  storeItem('heartCapIsBought', heartCapIsBought)
  storeItem('dinoCapIsBought', dinoCapIsBought)
  storeItem('rainbowCapIsBought', rainbowCapIsBought)
  //storeItem('volume', volume)
  storeItem('musicIsOn', musicIsOn)
}
function draw() {
  let r = slider.value();
  volumeControl()
  musicOn.hide()
  background(200, 200, 200);
  textStyle(BOLD)
  storeItems()//zorgt dat je de page opnieuw in kan laden zonder voortgang te verliezen

  if (gameStatus == 'livingroom') {
    drawBackground()//maakt de huiskamer
    if (characterX + 25 > innerWidth / 5 * 3 && characterX < innerWidth / 4 * 3 && characterY > innerHeight / 3 && characterY < innerHeight / 2) {
      closeMenus()
      inventoryOpened = true
      characterX = innerWidth / 2
    }
    if (sleeping == false) {
      if (bars.energy < 30) {
        moveCharacter(1)//maakt character traag als hij moe is  
      } else {
        moveCharacter(2) //maakt het character bestuurbaar
      }
    }
    drawCharacter()  //tekend het character
    drawUI()         //tekend de user interface
    if (bars.hunger < 40) {//maakt tekstwolkjes van de character zijn eisen
      drawTextCloud(0, 150)
    }
    else if (bars.energy < 50) {
      drawTextCloud(1, 150)
    } else if (bars.health < 50) {
      drawTextCloud(2, 220)
    } else if (bars.luck < 50) {
      drawTextCloud(3, 150)
    } else if (bars.luck > 80) {
      drawTextCloud(4, 190)
    }
  }
  else {//tekend minigame 
    drawMiniGame()
    fallSpeed = 3;
    let appleFallSpeed = 0;//zorgt dat het fruit niet allemaal even snel valt
    let bananaFallSpeed = 0;
    let energydrinkFallSpeed = 0;
    let hamburgerFallSpeed = 0;
    if (characterX - randomLocatie0 > innerWidth / 3 || randomLocatie0 - characterX > innerWidth / 3) {
      appleFallSpeed = -2
    } else if (characterX - randomLocatie0 > innerWidth / 4 || randomLocatie0 - characterX > innerWidth / 4) {
      appleFallSpeed = -1
    } if (characterX - randomLocatie1 > innerWidth / 3 || randomLocatie1 - characterX > innerWidth / 3) {
      bananaFallSpeed = -2
    } else if (characterX - randomLocatie1 > innerWidth / 4 || randomLocatie1 - characterX > innerWidth / 4) {
      bananaFallSpeed = -1
    } if (characterX - randomLocatie2 > innerWidth / 3 || randomLocatie2 - characterX > innerWidth / 3) {
      energydrinkFallSpeed = -2
    } else if (characterX - randomLocatie2 > innerWidth / 4 || randomLocatie2 - characterX > innerWidth / 4) {
      energydrinkFallSpeed = -1
    } if (characterX - randomLocatie3 > innerWidth / 3 || randomLocatie3 - characterX > innerWidth / 3) {
      hamburgerFallSpeed = -2
    } else if (characterX - randomLocatie3 > innerWidth / 4 || randomLocatie3 - characterX > innerWidth / 4) {
      hamburgerFallSpeed = -1
    } if (miniGameTimer > 10) {//zorgt dat fruit valt
      fallSpeed = fallSpeed * 1.5
    } if (miniGameTimer > 25) {
      fallSpeed = fallSpeed * 1.5
    } if (miniGameTimer > 45) {
      fallSpeed = fallSpeed * 2
    }
    appleY += fallSpeed + appleFallSpeed;
    bananaY += fallSpeed + bananaFallSpeed;
    energyDrinkY += fallSpeed + energydrinkFallSpeed;
    hamburgerY += fallSpeed + hamburgerFallSpeed;
    if (appleY > innerHeight + 50) {
      appleY = -50
      randomLocatie0 = random(fruitSpawnPoint)
    } else if (bananaY > innerHeight + 50) {
      bananaY = -50
      randomLocatie1 = random(fruitSpawnPoint)
    } else if (energyDrinkY > innerHeight + 50) {
      energyDrinkY = -50
      randomLocatie2 = random(fruitSpawnPoint)
    } else if (hamburgerY > innerHeight + 50) {
      hamburgerY = -50
      randomLocatie3 = random(fruitSpawnPoint)
    }
    image(appleImage, randomLocatie0, appleY)
    image(bananaImage, randomLocatie1, bananaY)
    image(energyDrinkImage, randomLocatie2, energyDrinkY)
    image(hamburgerImage, randomLocatie3, hamburgerY)
  }
  drawInventory()
    drawCloset()
    drawShop()
    drawSettings()//als opensettings true is opent het instellingen menu
    isSleeping()
}
  isSleeping()//zorgt dat je in bed blijft liggen tijdens slapen
  if (characterX > innerWidth / 5 && characterX < innerWidth / 5 * 1.5 && characterY > innerHeight / 4 && characterY < innerHeight / 3) {
    sleeping = true;
    characterX = innerWidth / 4
    characterY = innerHeight / 3
  }
function drawCharacter() {
  makeWalkingAnimation()
  characterEmotion()
  drawCaps()
}
function makeWalkingAnimation() {
  if (bars.hunger >= 50) {
    if (isWalkingLeft == true) {//maakt animatie als character naar links loopt
      image(bodyWalkingLeftImage, characterX, characterY)
      isWalkingLeft = false;
    }
    else if (isWalkingRight == true) {//maakt animatie als character naar rechts loopt
      image(bodyWalkingRightImage, characterX, characterY)
      isWalkingRight = false;
    }
    else if (isWalkingLeft == false && isWalkingLeft == false) {//als character stilstaat
      image(bodyImage, characterX, characterY)
    }
  }
  else {
    if (isWalkingLeft == true) {//maakt animatie als character naar links loopt
      image(hungryWalkingLImage, characterX, characterY)
      isWalkingLeft = false;
    }
    else if (isWalkingRight == true) {//maakt animatie als character naar rechts loopt
      image(hungryWalkingRImage, characterX, characterY)
      isWalkingRight = false;
    }
    else if (isWalkingLeft == false && isWalkingRight == false) {//als character stilstaat
      image(hungryImage, characterX, characterY)
    }
  }
}
function characterEmotion() {
  if (bars.luck > 30 && bars.luck < 65) {//zorgt dat emoties veranderen
    image(neutralImage, characterX, characterY - 90)
  } else if (bars.luck > 70) {
    image(happyImage, characterX, characterY - 90)
  } else {
    image(sadImage, characterX, characterY - 90)
  }
  if (bars.energy < 40) {//als je niet slaap krijg je wallen onder je ogen
    image(tiredImage, characterX, characterY - 90)
  }
  if (bars.health < 50) {//als de gezondheid niet goed is stink het character
    image(ZiekImage, characterX, characterY - 90)
  } else if (bars.health < 30) {
    image(stinkImage, characterX - 80, characterY - 145)
  }
}
function drawCaps() {
  if (wearingHeartCap == true && heartCapIsBought == true) {
    image(heartCapImage, characterX, characterY - 90)
  }
  else if (wearingBeanie == true && beanieIsBought == true) {
    image(beanieImage, characterX, characterY - 90)
  }
  else if (wearingLuigi == true && luigiCapIsBought == true) {
    image(luigiCapImage, characterX, characterY - 90)
  }
  else if (wearingRainbow == true && rainbowCapIsBought == true) {
    image(rainbowCapImage, characterX, characterY - 90)
  }
  else if (wearingEye == true && eyeCapIsBought == true) {
    image(eyeCapImage, characterX, characterY - 90)
  }
  else if (wearingDino == true && dinoCapIsBought) {
    image(dinoCapImage, characterX, characterY - 90)
  }
}
function drawBackground() {//maakt achtergrond en spawnt drollen
  image(homeBackgroundImage, innerWidth / 12, 0)
  if (bars.health < 60) {
    image(pooSprite, randomPooX0, randomPooY0)
    if (bars.health < 30) {
      image(pooSprite, randomPooX1, randomPooY1)
    }
  }
}
function drawUI() {//maakt de UI van de game
  noStroke()
  fill("lightblue")//maak blauwe balken
  rect(100, 0, innerWidth, innerHeight / 8)
  rect(0, 0, innerWidth / 7, innerHeight)
  rect(innerWidth - innerWidth / 7, 0, innerWidth / 7, innerHeight)
  rect(0, innerHeight - innerHeight / 8, innerWidth, innerHeight / 8)
  updateBars()
  drawBars('hunger ', bars.hunger, 1)
  drawBars('energy ', bars.energy, 2)
  drawBars('health ', bars.health, 3)
  drawBars('luck ', bars.luck, 4)
  drawButtons()
  image(settingsImage, innerWidth / 30, innerHeight - innerHeight / 10)
}
function updateBars() {
  for (let bar in bars) {
    bars[bar] -= deltaTime / 1000 / 5;
    if (bars[bar] < 0) {
      bars[bar] = 0;
    } else if (bars[bar] > 100) {
      bars[bar] = 100;
    }
  }
}
function drawMiniGame() {
  musicOff.hide()
  musicOn.hide()
  slider.hide()
  miniGameTimer += deltaTime / 1000
  image(miniGameBackgroundImage, 0, 0, innerWidth, innerHeight)//maakt de achtergrond
  fill('white')
  drawCharacter()
  rect(innerWidth / 18, innerHeight - innerHeight / 3, 150, 300)//maakt de teller voor het fruit
  image(appleImage, innerWidth / 15, innerHeight - innerHeight / 3)
  image(bananaImage, innerWidth / 15, innerHeight - innerHeight / 4)
  image(energyDrinkImage, innerWidth / 15, innerHeight - innerHeight / 6)
  image(hamburgerImage, innerWidth / 15, innerHeight - innerHeight / 10)
  fill('black')
  text(':' + appleCounter, innerWidth / 10, innerHeight - innerHeight / 3.7)
  text(':' + bananaCounter, innerWidth / 10, innerHeight - innerHeight / 5)
  text(':' + energyDrinkCounter, innerWidth / 10, innerHeight - innerHeight / 8)
  text(':' + hamburgerCounter, innerWidth / 10, innerHeight - innerHeight / 20)
  image(  backButtonImage, innerWidth / 40, innerHeight / 40)//maakt terug knop op minigame scherm
  image(settingsImage, innerWidth / 40, innerHeight / 40 + 80)
  fill('white')
  rect(innerWidth - innerWidth / 10, innerHeight - innerHeight / 12, 150)
  fill('black')
  textSize(20)
  text('TIME: ' + floor(miniGameTimer), innerWidth - innerWidth / 12, innerHeight - innerHeight / 30)
  if (bars.energy < 30) {
    moveCharacter(3)
  } else if(bars.energy < 10){
    moveCharacter(1)
  } else {
    moveCharacter(6)
  }
  if (characterY > innerHeight / 8 * 6) {//zorgt dat het character niet omhoog kan lopen
    characterY = innerHeight / 8 * 6
  }
  else if (characterY < innerHeight / 8 * 5.5) {//5.5) {
    characterY = innerHeight / 8 * 5.5
  }
}
function drawSettings() {
  if (settingsOpened == true) {
    let totalFoodAmount = appleCounter + bananaCounter + energyDrinkCounter + hamburgerCounter;
    fill(255, 255, 255, 220)
    rect(200, 100, innerWidth - 400, innerHeight - 200)
    image(backButtonImage, innerWidth - 250, 80)
    fill('black')
    text('Music Volume :', 250, 200)
    text('Stop Music :', 250, 230)
    text('Total Food Amount  : ' + totalFoodAmount, 250, 260)
    text('Controls :', 250, 300)
    fill('darkred')
    text('Use arrow keys to move character.', 250, 330)
    text('Use mouse to open menus or select food.', 250, 360)
    text('Use ESCAPE key or press the upper right button to leave window.', 250, 390)
    text('Press spacebar to catch items in mini game.', 250, 420)
    text('Click on the closet in the room to select your headwear.', 250, 450)
    text('Walk into bed or the table to sleep or eat.')
    fill('black')
    textStyle(BOLDITALIC)
    text('SETTINGS', innerWidth / 2, innerHeight / 5)
    musicOff.show()
    musicOn.show()
    slider.show()
    if (gameStatus == 'minigame') {
      appleY = -50
      bananaY = -50
      energyDrinkY = -50
      hamburgerY = -50
    }
  } else {
    musicOff.hide()
    slider.hide()
  }
}
function drawInventory() {
  if (inventoryOpened == true) {
    shopOpened = false;
    settingsOpened = false;
    closetOpened = false;
    image(inventoryImage, innerWidth / 2 - 250, innerHeight / 5)//maakt de inventory afbeelding
    fill('black')
    strokeWeight(2)
    if (appleCounter > 0) {
      image(appleImage, innerWidth / 2 - 200, innerHeight / 5 + 50)//geeft de appels weer
      text(appleCounter, innerWidth / 2 - 150, innerHeight / 5 + 100)//geeft het aantal appel weer
    }
    if (bananaCounter > 0) {
      image(bananaImage, innerWidth / 2 - 100, innerHeight / 5 + 50)//geeft de bananen weer
      text(bananaCounter, innerWidth / 2 - 50, innerHeight / 5 + 100)//geeft het aantal bananen weer
    }
    if (energyDrinkCounter > 0) {
      image(energyDrinkImage, innerWidth / 2 + 20, innerHeight / 5 + 50)//geeft de energiedrank weer
      text(energyDrinkCounter, innerWidth / 2 + 80, innerHeight / 5 + 100)//geeft het aantal energiedrankjes weer
    }
    if (hamburgerCounter > 0) {
      image(hamburgerImage, innerWidth / 2 + 140, innerHeight / 5 + 50)//geeft de hamburger weer
      text(hamburgerCounter, innerWidth / 2 + 180, innerHeight / 5 + 100)//geeft het aantal hamburgers weer
    }
    image(backButtonImage, innerWidth / 2 + 200, innerHeight / 5)
  }
}
function drawBars(currentText, currentBar, coordinates) { //functie die voor elke stat een andere balk kan maken
  fill('black')
  textSize(20)
  text(currentText + floor(currentBar), innerWidth / 6 * coordinates, innerHeight - innerHeight / 15)

  fill("white")//tekend balk en veranderd kleur 
  rect(innerWidth / 6 * coordinates, innerHeight - (innerHeight / 17), 100, 10)
  if (currentBar > 50) {
    fill(barColor[0])
  }
  else if (currentBar <= 50 && currentBar >= 30) {
    fill(barColor[1])
  }
  else if (currentBar <= 30) {
    fill(barColor[2])
  }
  rect(innerWidth / 6 * coordinates, innerHeight - (innerHeight / 17), currentBar, 10)
}
function isSleeping() {
  if (sleeping == true) {
    sleepTimer += deltaTime / 1000
    fill(0, 0, 0, 200)
    rect(0, 0, innerWidth, innerHeight)
    if (sleepTimer > 3) {
      sleeping = false;
      sleepTimer = 0
      characterX = characterX + 100
      bars.energy = bars.energy + 50
      bars.hunger = bars.hunger - 10
    }
  }
}
function isPlaying() {
  bars.health = bars.health + 1
  bars.hunger = bars.hunger - 5
  bars.health = bars.health - 1
  bars.energy = bars.energy - 2
}
function drawShop() {
  if (shopOpened == true) {
    inventoryOpened = false;
    closetOpened = false;
    settingsOpened = false;
    fill('black')
    textStyle(BOLD)
    image(shopImage, innerWidth / 2 - 187.5, 0)//maakt plaatjes van items
    image(heartCapImage, innerWidth / 2 - 170, 50)
    image(beanieImage, innerWidth / 2 - 170, 125)
    image(luigiCapImage, innerWidth / 2 - 170, 220)
    image(rainbowCapImage, innerWidth / 2 - 170, 295)
    image(eyeCapImage, innerWidth / 2 - 170, 370)
    image(dinoCapImage, innerWidth / 2 - 170, 460)
    image(backButtonImage, innerWidth / 2 + 150, 0)

    image(appleImage, innerWidth / 2 - 75, 50)//prijs voor cap 1
    text('15', innerWidth / 2 - 30, 50)
    image(bananaImage, innerWidth / 2 - 75, 140)//prijs voor cap 2
    text('20', innerWidth / 2 - 30, 140)
    image(appleImage, innerWidth / 2 - 75, 230)//prijs voor cap 3
    text('30', innerWidth / 2 - 30, 230)
    image(appleImage, innerWidth / 2 - 75, 310)//prijs voor cap 4
    text('50', innerWidth / 2 - 30, 320)
    image(energyDrinkImage, innerWidth / 2 - 75, 400)//prijs voor cap 5
    text('50', innerWidth / 2 - 30, 400)
    image(hamburgerImage, innerWidth / 2 - 75, 490)//prijs voor cap 6
    text('99', innerWidth / 2 - 30, 490)
    text('Item      Price                Owned', innerWidth / 2 - 130, 25)
    if (heartCapIsBought == false) { //geeft aan of je het item kan kopen
      text('NO', innerWidth / 2 + 100, 100)
    } else {
      text('YES', innerWidth / 2 + 100, 100)
    }
    if (beanieIsBought == false) {
      text('NO', innerWidth / 2 + 100, 180)
    } else {
      text('YES', innerWidth / 2 + 100, 180)
    }
    if (luigiCapIsBought == false) {
      text('NO', innerWidth / 2 + 100, 270)
    } else {
      text('YES', innerWidth / 2 + 100, 270)
    }
    if (rainbowCapIsBought == false) {
      text('NO', innerWidth / 2 + 100, 360)
    } else {
      text('YES', innerWidth / 2 + 100, 360)
    }
    if (eyeCapIsBought == false) {
      text('NO', innerWidth / 2 + 100, 440)
    } else {
      text('YES', innerWidth / 2 + 100, 440)
    }
    if (dinoCapIsBought == false) {
      text('NO', innerWidth / 2 + 100, 520)
    } else {
      text('YES', innerWidth / 2 + 100, 520)
    }
    fill('lightgreen')
    if (appleCounter >= 15) {
      text('BUY', innerWidth / 2 + 15, 75)
    }
    if (bananaCounter >= 20) {
      text('BUY', innerWidth / 2 + 15, 170)
    }
    if (appleCounter >= 30) {
      text('BUY', innerWidth / 2 + 15, 260)
    }
    if (appleCounter >= 50) {
      text('BUY', innerWidth / 2 + 15, 350)
    }
    if (energyDrinkCounter >= 50) {
      text('BUY', innerWidth / 2 + 15, 440)
    }
    if (hamburgerCounter >= 99) {
      text('BUY', innerWidth / 2 + 15, 520)
    }
  }
}
function drawTextCloud(tekst, lengte) {//geeft aan wat de character nodig heeft
  fill('white')
  rect(characterX + 75, characterY - 100, lengte, 50, 30)
  triangle(characterX + 80, characterY - 30, characterX + 75, characterY - 80, characterX + 125, characterY - 80)
  fill('black')
  textSize(20)
  text(cloudText[tekst], characterX + 80, characterY - 70)//80 -35 = +45
}
function moveCharacter(movementSpeed) {//zorgt dat de character bestuurbaar is in de huiskamer
  let moved = false;
  if (keyIsDown(LEFT_ARROW)) {
    characterX -= movementSpeed;
    isWalkingLeft = true;
    moved = true;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    characterX += movementSpeed;
    isWalkingRight = true;
    moved = true;
  }
  if (gameStatus == 'livingroom') {
    if (keyIsDown(UP_ARROW)) {
      characterY -= movementSpeed;
      moved = true;
    }
    else if (keyIsDown(DOWN_ARROW)) {
      characterY += movementSpeed;
      moved = true;
    }
  }
  if (!moved) {
    isWalkingLeft = false;
    isWalkingRight = false;
  }
  //diagonalen
  if (keyIsDown(LEFT_ARROW) && keyIsDown(UP_ARROW)) {
    characterX -= 1;
    characterY -= 1;
    isWalkingLeft = true;
  }
  else if (keyIsDown(LEFT_ARROW) && keyIsDown(DOWN_ARROW)) {
    characterX -= 1;
    characterY += 1;
    isWalkingLeft = true;
  }
  else if (keyIsDown(RIGHT_ARROW) && keyIsDown(DOWN_ARROW)) {
    characterX += 1;
    characterY += 1;
    isWalkingRight = true;
  }
  else if (keyIsDown(RIGHT_ARROW) && keyIsDown(UP_ARROW)) {
    characterX += 1;
    characterY -= 1;
    isWalkingRight = true;
  }
  //maakt grenzen van het huis
  if (gameStatus != 'minigame') {
    if (characterX < innerWidth / 6) {
      characterX = innerWidth / 6
    }
    else if (characterX > innerWidth - innerWidth / 5) {
      characterX = innerWidth - innerWidth / 5
    }
    else if (characterY < innerHeight / 3.5) {
      characterY = innerHeight / 3.5
    }
    else if (characterY > innerHeight - innerHeight / 3.2) {
      characterY = innerHeight - innerHeight / 3.2
    }
  }
  if (gameStatus == 'minigame') {
    if (characterX <= -50) {
      characterX = innerWidth + 50;
    }
    else if (characterX > innerWidth + 50) {
      characterX = -50
    }
  }
}

function keyPressed() {
  if (gameStatus == 'minigame' && !settingsOpened) {
    closeMiniGame()//zorgt dat de minigame afgesloten kan worden
    collectFruit(appleCounter, appleY, randomLocatie0)//als je op spatie drukt kan je fruit vangen 
    collectFruit(bananaCounter, bananaY, randomLocatie1)
    collectFruit(energyDrinkCounter, energyDrinkY, randomLocatie2)
    collectFruit(hamburgerCounter, hamburgerY, randomLocatie3)
  }
  if (keyCode === ESCAPE) {
    //if (gameStatus == 'livingroom') {
    /* closeInventory()//inventory dat de minigame afgesloten kan worden
   }
   if (inventoryOpened == true) {
     inventoryOpened = false;
   }
   if (shopOpened == true) {
     closeShop()
   }
   if (settingsOpened == true) {
     closeSettingsMenu()
   }*/
    //}
    closeMenus()
  }
}
function drawButtons() { //plaats afbeeldingen op juistte plek
  image(sleepButtonImage, 30, innerHeight / 14)
  image(inverntoryButtonImage, 30, innerHeight / 14 + 150)
  image(minigameButtonImage, 30, innerHeight / 14 + 300)
  image(shopButtonImage, 30, innerHeight / 14 + 450)
}
function closeMiniGame() {
  if (keyCode === ESCAPE) {//zorgt dat de minigame afgesloten kan worden
    gameStatus = 'livingroom';
    miniGameMusic.stop()
    miniGameTimer = 0;
    if (musicIsOn == true) {
      homeMusic.play()
      homeMusic.loop()
    }
  }
}
function collectFruit(itemCounter, itemHeight, location) {//characterX > location + 150 && characterX  < location +100  && wieieiei
  if (key == ' ' && gameStatus == 'minigame') {//maakt hitbox voor character  
    if (characterX >  location -50 && characterX  < location +100 && characterY - 150 < itemHeight && characterY + 100 > itemHeight) {
      itemHeight = itemHeight - innerHeight
      isPlaying()
      collectItemSound.play()
      if (itemCounter == appleCounter) {
        appleCounter += 1
        appleY = -50
        randomLocatie0 = random(fruitSpawnPoint)
      } else if (itemCounter == bananaCounter) {
        bananaCounter += 1
        bananaY = -50
        randomLocatie1 = random(fruitSpawnPoint)
      } else if (itemCounter == energyDrinkCounter) {
        energyDrinkCounter += 1
        energyDrinkY = -50
        randomLocatie2 = random(fruitSpawnPoint)
      } else if (itemCounter == hamburgerCounter) {
        hamburgerCounter += 1
        hamburgerY = -50
        randomLocatie3 = random(fruitSpawnPoint)
      }
    }
  }
}
function mouseClicked() {
  buyItems()
  equipItem()
  makeButtonHitbox()//maakt de hitboxen voor de knoppen
  endMiniGame()
  makePooHitbox(randomPooX0, randomPooY0)
  makePooHitbox(randomPooX1, randomPooY1)

  if (mouseX > innerWidth / 30 && mouseX < innerWidth / 30 + 60 && mouseY > innerHeight - innerHeight / 10 && mouseY < innerHeight - innerHeight / 10 + 60) {
    closeSettingsMenu()
  }
  if (mouseX > innerWidth / 2 + 200 && mouseX < innerWidth / 2 + 240 && mouseY > innerHeight / 5 && mouseY < innerHeight / 5 + 40) {
    closeInventory()
  }
  if (mouseX > innerWidth / 2 + 150 && mouseX < innerWidth / 2 + 190 && mouseY > 0 && mouseY < 40 && shopOpened == true) {
    closeShop()
  }
  selectFood(appleCounter, 15, -2, 10, -2, -250, -125)//counter,eat,sleep,clean,happines,distanceX1,distanceX2
  selectFood(bananaCounter, 13, -2, 13, -1, -125, 0)
  selectFood(energyDrinkCounter, 2, 25, -10, 3, 0, 125)
  selectFood(hamburgerCounter, 20, -2, -12, 10, 125, 250)


  if (mouseX > innerWidth / 2 - 50 && mouseX < innerWidth / 2 + 80 && mouseY > 150 && mouseY < 300 && !inventoryOpened && !shopOpened && !settingsOpened) {
    closetOpened = true;
    drawCloset()
  }
}
function drawCloset() {
  if (closetOpened == true) {
    inventoryOpened = false;
    openSettings = false;
    shopOpened = false;
    image(closetImage, innerWidth / 2 - 350, 200)
    image(crossImage, innerWidth / 2 - 300, 230)
    image(backButtonImage, innerWidth / 2 + 300, 150)
    if (heartCapIsBought == true) {
      image(heartCapImage, innerWidth / 2 - 230, 215)
    }
    if (beanieIsBought == true) {
      image(beanieImage, innerWidth / 2 - 130, 215)
    }
    if (luigiCapIsBought == true) {
      image(luigiCapImage, innerWidth / 2 - 30, 215)
    }
    if (rainbowCapIsBought == true) {
      image(rainbowCapImage, innerWidth / 2 + 55, 215)
    }
    if (eyeCapIsBought == true) {
      image(eyeCapImage, innerWidth / 2 + 160, 215)
    }
    if (dinoCapIsBought == true) {
      image(dinoCapImage, innerWidth / 2 + 250, 215)
    }
  }
}
function buyItems() {
  if (shopOpened == true) {
    if (heartCapIsBought == false && mouseX > innerWidth / 2 && mouseX < innerWidth / 2 + 100 && mouseY > 0 && mouseY < 90 && appleCounter >= 15) {
      heartCapIsBought = true;
      appleCounter = appleCounter - 15
    }
    if (beanieIsBought == false && mouseX > innerWidth / 2 && mouseX < innerWidth / 2 + 100 && mouseY > 100 && mouseY < 190 && bananaCounter >= 20) {
      beanieIsBought = true;
      bananaCounter = bananaCounter - 20
    }
    if (luigiCapIsBought == false && mouseX > innerWidth / 2 && mouseX < innerWidth / 2 + 100 && mouseY > 190 && mouseY < 280 && appleCounter >= 30) {
      luigiCapIsBought = true;
      appleCounter = appleCounter - 30
    }
    if (rainbowCapIsBought == false && mouseX > innerWidth / 2 && mouseX < innerWidth / 2 + 100 && mouseY > 280 && mouseY < 370 && appleCounter >= 50) {
      rainbowCapIsBought = true;
      appleCounter = appleCounter - 50
    }
    if (eyeCapIsBought == false && mouseX > innerWidth / 2 && mouseX < innerWidth / 2 + 100 && mouseY > 370 && mouseY < 460 && energyDrinkCounter >= 50) {
      eyeCapIsBought = true;
      energyDrinkCounter = energyDrinkCounter - 50
    }
    if (dinoCapIsBought == false && mouseX > innerWidth / 2 && mouseX < innerWidth / 2 + 100 && mouseY > 460 && mouseY < 550 && hamburgerCounter >= 99) {
      dinoCapIsBought = true;
      hamburgerCounter = hamburgerCounter - 99
    }
  }
}
function unEquipItem() {
  wearingNothing = false;
  wearingHeartCap = false;
  wearingBeanie = false;
  wearingLuigi = false;
  wearingRainbow = false;
  wearingEye = false;
  wearingDino = false;
}
function equipItem() {
  if (closetOpened == true) {
    if (mouseX > innerWidth / 2 - 400 && mouseX < innerWidth / 2 - 230 && mouseY > 200 && mouseY < 300) {
      unEquipItem()
      wearingNothing = true//character draagt niets
    }
    else if (mouseX > innerWidth / 2 - 240 && mouseX < innerWidth / 2 - 140 && mouseY > 200 && mouseY < 300) {
      unEquipItem()
      wearingHeartCap = true//character draagt hartjespet
    }
    else if (mouseX > innerWidth / 2 - 130 && mouseX < innerWidth / 2 - 50 && mouseY > 200 && mouseY < 300) {
      unEquipItem()
      wearingBeanie = true//character draagt muts
    }
    else if (mouseX > innerWidth / 2 - 50 && mouseX < innerWidth / 2 + 40 && mouseY > 200 && mouseY < 300) {
      unEquipItem()
      wearingLuigi = true//character draagt luigi pet
    }
    else if (mouseX > innerWidth / 2 + 50 && mouseX < innerWidth / 2 + 140 && mouseY > 200 && mouseY < 300) {
      unEquipItem()
      wearingRainbow = true//character draagt regenboogpet
    }
    else if (mouseX > innerWidth / 2 + 150 && mouseX < innerWidth / 2 + 240 && mouseY > 200 && mouseY < 300) {
      unEquipItem()
      wearingEye = true//character draagt oogpet
    }
    else if (mouseX > innerWidth / 2 + 250 && mouseX < innerWidth / 2 + 340 && mouseY > 200 && mouseY < 300) {
      unEquipItem()
      wearingDino = true//character draagt dinopet
    }
  }
}
function makeButtonHitbox() {
  if (gameStatus != 'minigame') {//slaapknop
    if (mouseX > 30 && mouseX < 130 && mouseY > innerHeight / 14 && mouseY < innerHeight / 14 + 100) {
      isSleeping()
      clickSound.play()
      sleeping = true
      characterX = innerWidth / 4
      characterY = innerHeight / 3
    }else {
      sleeping = false;
    }
    if (mouseX > 30 && mouseX < 130 + 70 && mouseY > innerHeight / 14 + 150 && mouseY < innerHeight / 14 + 250) {
      characterX = innerWidth / 4 * 2.4//slaaphitbox
      characterY = innerHeight / 2
      inventoryOpened = true
      clickSound.play()
    }
    else if (mouseX > 30 && mouseX < 130 && mouseY > innerHeight / 14 + 300 && mouseY < innerHeight / 14 + 400) {
      gameStatus = 'minigame'//start minigame
      clickSound.play()
      homeMusic.stop()
      settingsOpened = false;
      if (musicIsOn == true) {
        miniGameMusic.play()
        miniGameMusic.loop()
      } else {
        miniGameMusic.stop()
      }
    }
    else if (mouseX > 30 && mouseX < 130 && mouseY > innerHeight / 14 + 450 && mouseY < innerHeight / 14 + 550) {
      closeMenus()
      clickSound.play()
      shopOpened = true;
      drawShop()
    }
  } else if (gameStatus == 'minigame') {//om settings te openen tijdens minigame
    if (mouseX > innerWidth / 40 && mouseX < innerWidth / 40 + 100 && mouseY > innerHeight / 40 + 80 && mouseY < innerHeight / 40 + 150) {
      closeMenus()
      settingsOpened = true;
      clickSound.play()
    }
  }
  if (gameStatus == 'livingroom' && closetOpened == true) {//om kast af te sluiten
    if (mouseX > innerWidth / 2 + 300 && mouseX < innerWidth / 2 + 360 && mouseY > 150 && mouseY < 210) {
      closetOpened = false;
      clickSound.play()
    }
  }
  if (settingsOpened == true) {
    if (mouseX > innerWidth - 250 && mouseX < innerWidth - 190 && mouseY > 80 && mouseY < 140) {
      settingsOpened = false;
    }
  }
}
function endMiniGame() {
  if (gameStatus == 'minigame' && mouseX > innerWidth / 40 && mouseX < innerWidth / 40 + 60 && mouseY > innerHeight / 40 && mouseY < innerHeight / 40 + 60) {
    gameStatus = 'livingroom'
    miniGameMusic.stop()
    clickSound.play()
    miniGameTimer = 0
    if (musicIsOn == true) {
      homeMusic.play()
    } else {
      homeMusic.stop()
    }
  }
}
function makePooHitbox(randomPooX, randomPooY) {
  if (gameStatus == 'livingroom') {//ervoor zorgen dat je poepjes aan kan klikken
    if (mouseX > randomPooX && mouseX < randomPooX + 50 && mouseY > randomPooY && mouseY < randomPooY + 50) {
      bars.health = bars.health + 25;
      bars.luck = bars.luck + 10
      fartSound.play()
      if (randomPooX == randomPooX0) {
        randomPooX0 = random(pooSpawnPointX)
        randomPooY0 = random(pooSpawnPointY)
      } else if (randomPooX == randomPooX1) {
        randomPooX1 = random(pooSpawnPointX)
        randomPooY1 = random(pooSpawnPointY)
      }
    }
  }
}
function closeSettingsMenu() {//zorgt dat je het settings menu kan verlaten
  if (settingsOpened == false) {
    closeMenus()
    settingsOpened = true;
    clickSound.play()
  } else if (settingsOpened == true) {
    settingsOpened = false;
    clickSound.play()
  }
}
function closeInventory() {
  if (mouseX > innerWidth / 2 + 200 && mouseX < innerWidth / 2 + 240 && mouseY > innerHeight / 5 && mouseY < innerHeight / 5 + 40 && inventoryOpened == true) {
    inventoryOpened = false;//zorgt dat je de inventory kan sluiten
    clickSound.play()
  }
}
function closeShop() {
  clickSound.play()
  shopOpened = false;
}
function closeMenus() {
  settingsOpened = false;
  shopOpened = false;
  closetOpened = false;
  inventoryOpened = false;
}
function selectFood(counter, eat, sleep, clean, happines, distanceX1, distanceX2) {
  if (inventoryOpened == true) {
    if (mouseX > innerWidth / 2 + distanceX1 && mouseX < innerWidth / 2 + distanceX2 && mouseY > innerHeight / 5 && mouseY < innerHeight + 100) {
      manEatingSound.play()
      if (counter > 0) {
        bars.health = bars.health + clean
        bars.hunger = bars.hunger + eat
        bars.energy = bars.energy + sleep
        bars.luck = bars.luck + happines
        if (counter == appleCounter) {
          appleCounter -= 1
        } else if (counter == bananaCounter) {
          bananaCounter -= 1
        } else if (counter == energyDrinkCounter) {
          energyDrinkCounter -= 1
        } else if (counter == hamburgerCounter) {
          hamburgerCounter -= 1
        }
      }
    }
  }
}
function stopMusic() {
  homeMusic.stop()
  miniGameMusic.stop()
  musicIsOn = false;
}
function startMusic() {
  musicIsOn = true;
}
function volumeControl() {
  homeMusic.setVolume(slider.value())
}
function mouseReleased() {
  storeItem('sliderValue', slider.value())
}