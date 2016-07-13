var gold=0;
var silver=0;
var bronze=0;
var help=0;
var help2=0;
var goldname;
var silvername;
var bronzename;
var playerName="";

jQuery("#credits").on("click", function() {
    var message = "Game created by Jakub Nguyen.";
    jQuery("#credits").empty();
    jQuery("#credits").append(
        "<p>" + message + "</p>"
    );
});
function registerScore(score)
{

  if(score>bronze)
  {playerName = prompt("What's your name?");
   if(playerName===null)
 {playerName="Unknown player";}}
  if(score>gold)
  {
    hgold(score,playerName);
  }
else if(score>silver)
{
hsilver(score,playerName);
 }
else if(score>bronze)
{
hbronze(score,playerName);
}
}
function hgold(value, name)
{

   jQuery("#gold").empty();
 jQuery("#gold").append(value.toString()+" - "+name);
hsilver(gold, goldname);
gold=value;
goldname=name;
}
function hsilver(value, name)
{
  if(value>0)
  {
  jQuery("#silver").empty();
 jQuery("#silver").append(value.toString()+" - "+name);
 hbronze(silver, silvername);
 silver=value;
 silvername=name;
}
}
function hbronze(value, name)
{
  if(value>0)
  {
  jQuery("#bronze").empty();
 jQuery("#bronze").append(value.toString()+" - "+name);
bronze=value;
bronzename=name;
}
}
