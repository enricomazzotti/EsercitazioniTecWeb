var dice1 = Math.floor(Math.random() * 6) + 1;
var dice2 = Math.floor(Math.random() * 6) + 1;


var path1 = "es11/images/dice"+dice1+".png";
var path2 = "es11/images/dice"+dice1+".png";

document.querySelectorAll("img")[0].setAttribute("src",path1);
document.querySelectorAll("img")[1].setAttribute("src",path2);

