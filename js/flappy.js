// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(1000, 400, Phaser.AUTO, 'game', stateActions);
var score = 0;
var labelScore;
var player;
var pipes = [];
var test = 3;
var background;
var ready=false;
var begin;
var injump=false;
var agravity=false;
var agravityp=[];
/*
 * Loads all resources for the game and gives them names.
 */

function preload() {
game.load.image("playerImg", "../assets/flappy.png");
game.load.image("backgroundImg", "../assets/flappy-footer.png");
game.load.audio("score", "../assets/point.ogg");
game.load.image("pipeBlock","../assets/pipe2-body.png");
game.load.image("pipe-end","../assets/pipe-end.png");
game.load.spritesheet("playeranimation", "../assets/animation2.jpg", 85, 60);
game.load.image("agravity","../assets/agravity.png");

}
function start()
{
    player.anchor.setTo(0.5,0.5);
begin.setText("");
  labelScore = game.add.text(800, 10, "Score: " + score);

    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(playerJump);




     generatePipe();


    game.physics.arcade.enable(player);
    player.body.velocity.y = -100;
    player.body.gravity.y = 600;
    var pipeInterval = 1.75 * Phaser.Timer.SECOND;
    game.time.events.loop(pipeInterval,generatePipe);
}
function clickHandler(event) {
if(ready===false)
{
start();
ready=true;
}
else {
  playerJump();
}
}

function create() {

  game.physics.startSystem(Phaser.Physics.ARCADE);
game.input.onDown.add(clickHandler);
background = game.add.tileSprite(0, 0,1000,400,"backgroundImg");

     background.autoScroll(-100,0);
     begin = game.add.text(400, 200, "Click to start");
     player = game.add.sprite(100, 200, "playeranimation");
     player.scale.setTo(0.5, 0.5);
player.animations.add("wings",[0,1,2],10,true);
player.animations.play("wings");
}

function changeScore() {
  score++;
  labelScore.setText("Score: "+score.toString());
}
function addPipeBlock(x, y) {
    var block = game.add.sprite(x,y,"pipeBlock");
    pipes.push(block);
    game.physics.arcade.enable(block);
    block.body.velocity.x = -200;
}
function addPipeEnd(x, y) {
    var block = game.add.sprite(x,y,"pipe-end");
    pipes.push(block);
    game.physics.arcade.enable(block);
    block.body.velocity.x = -200;
}
function addPowerup(x, y) {
    var power = game.add.sprite(x,y,"agravity");
    power.height=350;
    agravityp.push(power);
    game.physics.arcade.enable(power);
    power.body.velocity.x = -200;
}

function generatePipe() {
var agravityr=game.rnd.integerInRange(1, 3);
    var gapStart = game.rnd.integerInRange(1, 5);
    if(agravityr==3)
    {addPowerup(1250,0);}
    else {
    for (var count = 0; count < 8; count++) {
        if(count != gapStart && count != gapStart+1 && count != gapStart-1)
        {
            addPipeBlock(1250, count * 50);
        }
        else {
          if(count ==gapStart+1)
          {
            addPipeEnd(1245, (count * 50)+25);}
        if(count ==gapStart-1)
        {
        addPipeEnd(1245, (count * 50)-1);}


    }
}}
   if(test === 0)
   {
    changeScore();
  }
  else {
    test--;
  }


}
function playerJump() {
  if(agravity===true)
  {injump=true;

   player.body.velocity.y = 200;
   injump=false;}
  else {
    injump=true;

     player.body.velocity.y = -200;
     injump=false;
  }

    /*setTimeout(function(){
  player.angle=player.angle-4;
},100);*/
}
function agravityf()
{if(agravity===true)
{player.body.gravity.y = 600;
agravity=false;}
else {
  player.body.gravity.y = -600;
  agravity=true;
}}
function update() {
  if(ready===true)
  {
    for(var j = agravityp.length - 1; j >= 0; j--){
    game.physics.arcade.overlap(player, agravityp[j], function(){
        agravityp[j].destroy();
        agravityp.splice(j, 1);
        agravityf();
    });
}
game.physics.arcade.overlap(player,pipes,gameOver);

if(player.y < 0 || player.y > 400)
{gameOver();}


if(player.angle>90)
{}
else if(injump===false)
{player.angle=player.body.velocity.y/10;}
}
for(var i=pipes.length-1;i>=0;i--)
{if(pipes[i].body.x<-100)
{ pipes[i].destroy();
        pipes.splice(i, 1);}}

}
function gameOver()
{
  registerScore(score);
  ready=false;
  score=0;
  test = 3;
agravity=false;
  game.state.restart();

}
