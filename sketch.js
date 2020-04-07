const width =  500;
const height = 680;

var birdX = 1/4*width;
var birdY = 1/4*height;
var birdSize =30;


var isDead = false;
var jumped = false;


var speed = 0;
var pipeSpeed = 4;
var playerScore = 0;

var startingPipe = 900;



var maximumHeight = 500;
var minimumHeight = 250;


var gapBetween = 200; // Upper pipe and lower pipe
var pipeWidth = 100;  // width of the pipe
var gapBetweenPipes = 350; // gap between the pipe 1 and pipe 2 and pipe 3 


// X for pipe 1 both upper and lower
var  pipeX2 = startingPipe+gapBetweenPipes;        
var  pipeX3 = startingPipe+gapBetweenPipes*2;
var  pipeX1 = startingPipe; 


var lowerPipeY1 = numerRandomizer(maximumHeight,minimumHeight);
var lowerPipeY2 = numerRandomizer(maximumHeight,minimumHeight);
var lowerPipeY3 = numerRandomizer(maximumHeight,minimumHeight);

var upperPipeY1 = height-lowerPipeY1-gapBetween ;
var upperPipeY2 = height-lowerPipeY2-gapBetween ;
var upperPipeY3 = height-lowerPipeY3-gapBetween ;


let pipeImage;


function setup() {
  createCanvas(width,height);
  angleMode(DEGREES)
     
} 


function draw() {
    // Background
    background(0);
    imageBackground();

    // The pipes 
    randomPipes();
    if(isDead == false){
      pipeX1 -= pipeSpeed ;
      pipeX2 -= pipeSpeed ;
      pipeX3 -= pipeSpeed;

      if( jumped==true && angle >= -20){
        angle -=35;
        tiltSpeed = 0;
      }else{
        jumped = false;
      }

    }
    // The score 
    displayScore();
    // The bird 
    bird();  
   
}

function ifDies(){
  this.birdY = birdSize;
  speed = 0;
  playerScore = 0;
}
let angle = 0 ;
function bird(){
    push();
    dies();

    translate(this.birdX ,this.birdY )
    rotate(angle)
    // fill(255,255,255)
    // rect(0,0,birdSize,birdSize)
    fall();
    imageMode(CENTER);
    // this.birdX-30 
    image(birdImage,0,0,70,70)
    pop();
}


// -------------------------------------- [BIRD]
// X AND Y of the bird

function keyPressed() {
  // Space bar
  if(keyCode === 32){
      this.speed =- 15 ;
      jumped = true;
     
      dies(); 
  }
  isJumped = false;
  if(keyCode == UP_ARROW){
    birdY -=15
  }
  if(keyCode == LEFT_ARROW){
    this.birdX -=15 
  }
  if(keyCode == DOWN_ARROW){
    this.birdY +=15
  }
  if(keyCode == RIGHT_ARROW){
    birdX +=15
  }

}
var tiltSpeed = 0 ;
function fall(){
  this.birdY += this.speed*0.8;
  this.speed += 1*0.8;
  if(angle<90  && jumped == false ){
    angle += 5
    
  }

}

//---------------------------------------------[OBSTACLE]
function pipes(positiox,lowerPipeSize,upperPipeSize){
  // UPPER PIPE
  // fill(255,0,255)
  
  // rect(positiox ,0 ,pipeWidth,upperPipeSize );
  image(upperPipeImg,positiox,upperPipeSize-maximumHeight,pipeWidth,maximumHeight)
  // LOWER PIPE
  // image(pipeImage ,0, 0 );
  image(lowerPipeImg,positiox ,height-lowerPipeSize, pipeWidth,maximumHeight);
// fill(255,255,0)
//   rect(positiox ,height-lowerPipeSize,pipeWidth,lowerPipeSize);

}

function dies(){
  // =====================[ LOWER PIPES ]==============================
  if( this.birdY-birdSize >=height-100 ||  this.birdY+birdSize <= 0 ){
    ifDies();
  }


  if(this.birdY > height-lowerPipeY1-birdSize && this.birdY < height 
    && this.birdX > pipeX1-birdSize && this.birdX < pipeX1+pipeWidth){
      ifDies();
  }
  if(this.birdY > height-lowerPipeY2-birdSize && this.birdY <  height  
    && this.birdX > pipeX2-birdSize && this.birdX < pipeX2+pipeWidth){
      ifDies();
  }
  if(this.birdY > height-lowerPipeY3-birdSize && this.birdY < height
    && this.birdX > pipeX3-birdSize && this.birdX < pipeX3+pipeWidth){
      ifDies();
  }
 // =====================[ UPPER PIPES ]==============================

  if(this.birdY <= upperPipeY1 && 
    this.birdX > pipeX1-birdSize && 
    this.birdX < pipeX1+pipeWidth){
    ifDies();
  }
  if(this.birdY <= upperPipeY2 && 
    this.birdX > pipeX2-birdSize && 
    this.birdX < pipeX2+pipeWidth){
    ifDies();
  }
  if(this.birdY <= upperPipeY3 && 
    this.birdX > pipeX3-birdSize && 
    this.birdX < pipeX3+pipeWidth){
    ifDies();
  }

}
randomPipes = function(){
    
  if(pipeX1  <= -pipeWidth){
    pipeX1 = startingPipe;    
    lowerPipeY1 =numerRandomizer(maximumHeight,minimumHeight);
  }
  if( pipeX2    <= -pipeWidth){
    pipeX2 =startingPipe;       
    lowerPipeY2=numerRandomizer(maximumHeight,minimumHeight);
  }
  if( pipeX3  <= -pipeWidth){
    pipeX3 = startingPipe;       
    lowerPipeY3 = numerRandomizer(maximumHeight,minimumHeight);
  }
  upperPipeY1 = height-lowerPipeY1-gapBetween ;
  upperPipeY2 = height-lowerPipeY2-gapBetween ;
  upperPipeY3 = height-lowerPipeY3-gapBetween ;
  pipes(pipeX1 ,lowerPipeY1,upperPipeY1 );
  pipes(pipeX2,lowerPipeY2,upperPipeY2);
  pipes(pipeX3,lowerPipeY3,upperPipeY3);
}
function numerRandomizer(minimum,maximum){
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}


function ifScored(){
    if(birdX >= pipeX1+pipeWidth && birdX <= pipeX1+pipeWidth+3){
      playerScore +=1 ;
    }
    if(birdX >= pipeX2+pipeWidth && birdX <= pipeX2+pipeWidth+3){
      playerScore +=1 ;
    }
    if(birdX >= pipeX3+pipeWidth && birdX <= pipeX3+pipeWidth+3){
      playerScore +=1 ;
    }
}
function displayScore(){
  ifScored();
  scoreText();
}
function scoreText(){
  fill(255,255,255);
  textSize(30);
  text(playerScore, width/2,30);   
}

let moveBush1 = 0 ;
let moveBush2 = width ;
let buildingMove1 = 0;
let buildingMove2 = width;
let buildback1 = 0;
let buildback2 = width;
let grass1 = 0;
let grass2= width;
let lowerPipeImg;
let upperPipeImg;
let birdImage;
let bush;
let buildings ;
let backBuild;
let grass ;
let backgrounds;
let background1 = 0;
let background2 = width;
let roadImg ;
let road1 = 0;
let road2 = width;

function preload() {
  lowerPipeImg = loadImage('lowerPipeImg.png');
  upperPipeImg= loadImage('pipeUpper.png');
  birdImage = loadImage('bird.png');
  bush = loadImage('bush1.png');
  buildings = loadImage('building.png');
  backBuild = loadImage('backBuilding.png');
  grass = loadImage('grass.png');
  backgrounds = loadImage('background.png');
  roadImg = loadImage('road.png');

}


function imageBackground(){
  image( backgrounds ,  background1  ,0,width+3,height);
  image( backgrounds ,  background2 ,0,width+3,height);
  if(background1 +width <= 0)
     background1  = width;
  if(background2  +width <= 0)
  background2  = width;
  background1   -= 0.1
  background2 -= 0.1





  image( grass , grass1   ,0,width+3,height);
  image( grass , grass2 ,0,width+3,height);
  if(grass1 +width <= 0)
  grass1  = width;
  if(grass2 +width <= 0)
  grass2 = width;
  grass1  -= 3
  grass2-= 3 


  image(backBuild, buildback1  ,0,width+3,height);
  image( backBuild, buildback2 ,0,width+3,height);
  if(buildback1 +width <= 0)
    buildback1  = width;
  if(buildback2 +width <= 0)
    buildback2 = width;
  buildback1  -= 0.1
  buildback2-= 0.1



  image( buildings,buildingMove1,0,width+3,height);
  image( buildings,buildingMove2,0,width+3,height);
  
  if(buildingMove1+width <= 0)
    buildingMove1 = width;
  if(buildingMove2+width <= 0)
    buildingMove2= width;
    buildingMove1 -= 0.5
    buildingMove2 -= 0.5


  image( bush,moveBush1,0,width+3,height);
  image( bush,moveBush2,0,width+3,height);
  if(moveBush1+width <= 0)
    moveBush1 = width;
  if(moveBush2+width <= 0)
    moveBush2 = width;
  moveBush1 -=1
  moveBush2 -=1




  image( roadImg ,  road1  ,0,width+3,height);
  image( roadImg,  road2 ,0,width+3,height);
  if(road1 +width <= 0)
  road1  = width;
  if(road2  +width <= 0)
  road2= width;
  road1   -= 3
  road2-= 3
  

}
//https://stackoverflow.com/questions/51081754/cross-origin-request-blocked-when-loading-local-file