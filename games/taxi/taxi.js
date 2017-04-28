// Creating variables
var myX = 400, myY = 300;
var p1X = 300, p1Y = 200;
var superpX = 9000, superpY = 400;
var patienceX = -1000, patienceY = 590;
var over = false; 
var mqsto = 0;
var pulen = false;
var spirkaX = 0, spirkaY = 0;
var nadolu = false;
var nagore = false;
var lqvo = false;
var dqsno = false;
var score = 0;
var car = document.getElementById("car");
var guy = document.getElementById("guy"), superguy = document.getElementById("superguy");
var house = document.getElementById("house");
function update() {
	//dvijenie s mishka
	//myX = myX+(mouseX-myX);
	//myY = myY+(mouseY-myY);
	
	//respawning 
	if(myX > 800){
		myX = -30;
	}
	if(myX < - 31){
		myX = 800; 
	}
	if(myY < -30){
		myY = 590;
	}
	if(myY > 591){
		myY = -30;
	}
	
	//dvijenie
	if(nadolu == true){
		myY = myY + 3;
	}
	if(dqsno == true){
		myX = myX + 3;
	}
	if(nagore == true){
		myY = myY - 3;
	}
	if(lqvo == true){
		myX = myX - 3;
	}
	
	//patience of customer
	patienceX = patienceX - 0.5;
	if(patienceX <= -1800){
		over = true;
	}
	//kato vzemem super 4ovek
	if(areColliding(myX, myY, 50, 100, superpX, superpY, 50, 50)){
		score = score + 1;
		patienceX = patienceX + 300;
		superpX = 9000;
		superpY = 400;
	}
	
	//kato vzemem 4ovek
	if(areColliding(myX, myY, 50, 100, p1X, p1Y, 15, 15) && pulen == false){
		p1X = Math.random() * 700;
		p1Y = Math.random() * 500;
		//if it appears on the house
		if((p1X >= 0 && p1X <= 60) && (p1Y >= 0 && p1Y <= 60)){
			p1X = Math.random() * 700;
			p1Y = Math.random() * 500;
		} 
		mqsto = mqsto + 1;
		score = score + 1;
		patienceX = patienceX + 70;
		superpX = Math.random();
		if(Math.random() <= 0.200){
			superpX = 400;
		}
		else{
			superpX = 9000;
		}
	}
	if(mqsto >= 3){
		pulen = true;
	}
	
	//spirka 
	if(areColliding(myX, myY, 50, 100, spirkaX, spirkaY, 60, 60)){
		mqsto = 0;
		pulen = false;
	}
}

function draw() {
	// This is how you draw a rectangle
	context.fillRect(myX, myY, 10, 10);context.drawImage(car, myX - 7, myY - 7, car.width, car.height);
	context.fillRect(p1X, p1Y, 10, 10);context.drawImage(guy, p1X - 3, p1Y - 3, guy.width, guy.height);
	context.fillRect(superpX, superpY , 0, 0);context.drawImage(superguy, superpX, superpY, superguy.width, superguy.height);
	context.fillRect(patienceX, patienceY, 1800, 10);
	context.fillRect(spirkaX, spirkaY, 0, 0);context.drawImage(house, spirkaX, spirkaY, house.width, house.height);
	if(over == true){
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.font = "50px Ariel";
		context.fillText("Game Over!", 300, 200);
		context.fillText("Score: " + score, 330, 300);
		myX = -10000;
	}
}

function keyup(key) {
	// Show the pressed keycode in the console
	console.log("Pressed", key);
	//dvijenie s klavishi
	if(key == 40){
		nadolu = true;
		dqsno = false;
		nagore = false;
		lqvo = false
	}
	if(key == 39){
		dqsno = true;
		nadolu = false;
		lqvo = false;
		nagore = false;
	}
	if(key == 38){
		nagore = true;
		nadolu = false
		lqvo = false;
		dqsno = false;
	}
	if(key == 37){
		lqvo = true;
		nadolu = false;
		nagore = false;
		dqsno = false;
	}
}
function mouseup() {
	// Show coordinates of mouse on click
	console.log("Mouse clicked at", mouseX, mouseY);
}
