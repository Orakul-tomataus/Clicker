window.onload = init;

var	GameHeight = 480;
var GameWidth = 640;

var Points = 0;
var PointsForClick = 1;
var Maximal = 254;

var ColorDefaut = "#131C2C";

var CrashPoints = 0;
var CrashPointsLevl1 = [10,10,20,5,5];
var AnimationIncrement = 0;
var AnimationTimer = 0;


var StartPrise = [10,20,30];
var ModifierPrise = [1,1,1];
var iBuy=1;

var Block = new Image();
Block.src = "TexturBlock.png";
var Inventory = new Image();
Inventory.src = "TexturInventory.png";

var color=ColorDefaut;

function init() {
  var map = document.getElementById("main_window");
      ctx = map.getContext("2d");

      map.height = GameHeight;
      map.width  = GameWidth;

      ctx.fillStyle = "#000"
      ctx.font = "100% Arial";
      ctx.fillText("Points : " + Points ,50,50);
      ctx.fillText("Modyficator click : " + PointsForClick,50,70);

// sefesf
      //earth(color);
      //sphere(color,450,200);
      // drawNew(color,1);
      // drawNew(color,2);
      // drawNew(color,3);
      SpawnBlock();

      map.onclick = click;
}


function click() {
  console.log("Click");

  var x = event.clientX;
  var y = event.clientY;
  ctx.fillStyle = "#000"
  ctx.font = "100% Arial";
  if(CrashPoints!=0){
    //if (x>245 && x<395 && y>1145 y<1295) {
      //X(1040~1140)  Y(290~390)
      //X(610~650)  Y(290~390)
        CrashPoints-=PointsForClick;
      //console.log(AnimationIncrement);
      AnimationCrash();

    //}
  }else{
    SpawnBlock();
    AnimationTimer=0;
    Points+=1;
    ctx.clearRect(0,0,200,50);
    ctx.fillText("Points : " + Points,50,50);
  }


  //ctx.fillText("Mody click : " + PointsForClick,50,70);
}

function sphere(color,x,y) {
      ctx.fillStyle = color;
   		ctx.arc(x,y, 50, 0, 2*Math.PI, false);
			ctx.fill();
}
function SpawnBlock() {
  var RandomSpawn = Math.ceil((Math.random()*10)/2)-1;
  CrashPoints = CrashPointsLevl1[RandomSpawn];
  ctx.drawImage(Block,RandomSpawn*50,0,50,50,400,100,150,150);
  AnimationIncrement = 10/CrashPoints;
}
function DrawCrash() {
  ctx.drawImage(Block,(AnimationTimer-1)*50,450,50,50,400,100,150,150);
}
function AnimationCrash() {
   AnimationTimer+=AnimationIncrement;
   if(AnimationTimer>= 1 && AnimationTimer<=10  && Math.ceil(AnimationTimer) === Math.floor(AnimationTimer)){
     DrawCrash();
   }
}
function earth(color) {
  ctx.fillStyle = color;
  ctx.fillRect(0,GameHeight-100,GameWidth,100);
}
function drawNew(color,num) {
  ctx.fillStyle =  color;
  ctx.fillRect(50,35+num*60,250,50);
  ctx.fillStyle =  "#fff";
  ctx.font = "125% Arial";
  ctx.fillText("Cost for 1 up =  " + StartPrise[num-1]*ModifierPrise[num-1]*iBuy,60,65+num*60);
}
