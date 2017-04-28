var myX = 400, myY = 560;
var i, bulletInd;
var bulletNum = 5;
var lifeOfBig = 6;
var powerX = -30, powerY = 0, powerTime = 0;
var scoreMeteor = 0, scoreBig = 0, finalScore = 0;
var timer = 0;
//bool
var moveLeft = false, moveRight = false;
var over = false;
var powerActive = false;
//images
var spaceship = new Image(); spaceship.src = "spaceship.png";
var back = new Image(); back.src = "background.png";
var meteor = new Image(); meteor.src = "meteor.png"
var meteor1 = new Image(); meteor1.src = "meteor1.png"
var meteor2 = new Image(); meteor2.src = "meteor2.png";
var bullet = new Image(); bullet.src = "bullet.png";
var power = new Image(); power.src = "power.png";
//masivi
var meteorX = [], meteorY = [];
var bulletX = [], bulletY = [];
for(i = 0; i < 15; i = i + 1){
	meteorX[i] = Math.random() * 600;
	meteorY[i] = i + Math.random() * - 600;
}
for(bulletInd = 0; bulletInd < bulletNum; bulletInd = bulletInd + 1){
	bulletX[bulletInd] = 0;
	bulletY[bulletInd] = 0;
}

function update() {
	//timer for events
	timer = timer + 1;
	if(timer > 600 && timer <= 1200){
		for(i = 0; i < 7; i = i + 1){
			meteorX[i] = meteorX[i] + 1;
			meteorY[i] = meteorY[i] + 1;
		}
		for(i = 7; i < 14; i = i + 1){
			meteorX[i] = meteorX[i] - 1;
			meteorY[i] = meteorY[i] + 1;
		}
	}
	if(timer > 1200 && timer <= 5500){
		for(i = 0; i < 7; i = i + 1){
			meteorX[i] = meteorX[i] - 3;
		}
		for(i = 7; i < 14; i = i + 1){
			meteorX[i] = meteorX[i] + 3;
		}
	}
	else if(timer > 5500){
		for(i = 0; i < 7; i = i + 1){
			meteorX[i] = meteorX[i] - 8;
			meteorY[i] = meteorY[i] + 3;
		}
		for(i = 7; i < 14; i = i + 1){
			meteorX[i] = meteorX[i] + 8;
			meteorY[i] = meteorY[i] + 3;
		}
	}
	//for regular meteors
	for(i = 0; i < 14; i = i + 1){
		//movement of meteors
		meteorY[i] = meteorY[i] + 4;
		//collision with player
		if(areColliding(myX, myY, 30, 30, meteorX[i], meteorY[i], 30, 30)){
			over = true;
		}
		//collision with bullets
		for(bulletInd = 0; bulletInd < bulletNum; bulletInd = bulletInd + 1){
			if(areColliding(bulletX[bulletInd], bulletY[bulletInd], 10, 20, meteorX[i], meteorY[i], 30, 30)){
				meteorY[i] = - 30;
				meteorX[i] = Math.random() * 760;
				bulletX[bulletInd] = 2000;
				scoreMeteor = scoreMeteor + 1;
			}
		}
		//respawning of meteors
		if(meteorY[i] > 600){
			meteorY[i] = - 30;
			meteorX[i] = Math.random() * 760
		}
		if(meteorX[i] > 830){
			meteorX[i] = -29;
		}
		if(meteorX[i] < 30){
			meteorX[i] = 829;
		}
	}
	//big meteor
	
	//movement
	meteorY[14] = meteorY[14] + 3;
	//collision with spaceship
	if(areColliding(myX, myY, 30, 30, meteorX[14], meteorY[14], 200, 200)){
		over = true;
	}
	//collision with bullets
	for(bulletInd = 0; bulletInd < bulletNum; bulletInd = bulletInd + 1){
		//if bullets miss
		if(bulletY[bulletInd] <  20){
			bulletX[bulletInd] = 2000;
		}
		if(areColliding(bulletX[bulletInd], bulletY[bulletInd], 10, 20, meteorX[14], meteorY[14], 200, 200)){
			lifeOfBig = lifeOfBig - 1;
			bulletX[bulletInd] = 2000;
			//if big dies
			if(lifeOfBig <= 0){
				powerX = meteorX[14] + 80;
				powerY = meteorY[14];
				meteorY[14] = Math.random() * -6000;
				meteorX[14] = Math.random() * 600;
				scoreBig = scoreBig + 20;
				lifeOfBig = 5;
			}
		}
	}
	//respawning
	if(meteorY[14] > 600){
		meteorY[14] = Math.random() * -2000;
		meteorX[14] = Math.random() * 600;
		lifeOfBig = 5;
	}
	//player movement
	if(moveLeft == true){
		myX = myX - 5;
	}
	if(moveRight == true){
		myX = myX + 5;
	}
	//player wall collision
	if(myX > 760){
		myX = 760;
	}
	if(myX < 0){
		myX = 0;
	}
	//bullet speed
	for(bulletInd = 0; bulletInd < bulletNum; bulletInd = bulletInd + 1){
		
		bulletY[bulletInd] = bulletY[bulletInd] - 10;
	}
	//movement of power
	powerY = powerY + 2;
	//collision with power
	if(areColliding(myX, myY, 30, 30, powerX, powerY, 20, 20)){
		powerActive = true;
		powerX = -30;
		powerY = 0;
	}
	if(powerActive == true){
		if(isKeyPressed[32]){
			bulletX[bulletNum] = myX + 5;
			bulletY[bulletNum] = myY - 3;
			bulletNum = bulletNum + 1;
			powerTime = powerTime + 1;
		}
		//end of power
		if(powerTime > 300){
			powerActive = false;
			powerTime = 0;
		}
	}
	//game scoring
	finalScore = scoreMeteor + scoreBig;
}
function draw() {
	context.drawImage(back, 0, 0);
	context.drawImage(spaceship, myX, myY, 30, 30);
	//drawing meteors
	for(i = 0; i < 7; i = i + 1){
		context.drawImage(meteor, meteorX[i], meteorY[i], 30, 30);
	}
	for(i = 7; i < 14; i = i + 1){
		context.drawImage(meteor2, meteorX[i], meteorY[i], 30, 30);
	}
	context.drawImage(meteor1, meteorX[14], meteorY[14], 200, 200)
	//drawing bullets
	for (bulletInd = 0; bulletInd < bulletNum; bulletInd = bulletInd + 1){
		context.drawImage(bullet, bulletX[bulletInd], bulletY[bulletInd], 20, 40);
	}
	//drawing power 
	context.drawImage(power, powerX, powerY, 20, 20);
	//game over
	
	if(over == true){
		context.fillStyle = "red";
		context.font = "50px Arial";
		context.clearRect(0, 0, 5000, 5000);
		context.drawImage(back, 0, 0);
		context.fillText("GAME OVER!", 220, 80);
		context.fillText("Meteors destroyed: " + scoreMeteor, 170, 150);
		context.fillText("Points for destroying Mr.Big: " + scoreBig, 80, 220);
		context.font = "70px Impact";
		context.fillText("FINAL SCORE: " + finalScore, 170, 400);	
		context.font = "30px Buxton Sketch";
		context.fillText("Try again! Press F5 to continue.", 240, 500);
	}
}
function keydown(key) {
	console.log("Pressed", key);
	if(key == 37){
		moveLeft = true;
	}
	if(key == 39){
		moveRight = true;
	}
}
function keyup(key){
	if(key == 37){
		moveLeft = false;
	}
	if(key == 39){
		moveRight = false;
	}
	if(powerActive == false){
		if(key == 32){
			bulletX[bulletNum] = myX + 5;
			bulletY[bulletNum] = myY - 3;
			bulletNum = bulletNum + 1;
		}
	}
}
function mouseup() {
	}