function drawIt() {
	var x = 300;
	var y = 500;
	var dx = 2;
	var dy = -4;
	var ctx;
	var canvas
	var WIDTH;
	var HEIGHT;
	var r=10;
	var paddlex;
	var paddleh;
	var paddlew;
	var rightDown = false;
	var leftDown = false;
	var canvasMinX;
	var canvasMaxX;
	var plosca=new Image();
	plosca.src="Ploscek.png";
	var opeka=new Image();
	opeka.src="Opeka2.png";
	var uprasaj=new Image();
	uprasaj.src="Uprasaj2.png";
	var prazen=new Image();
	prazen.src="PrazenUprasaj.png";
	var goban=new Image();
	goban.src="Goba.png";
	var smash=new Audio('Smash.wav');
	var pada=new Audio("PowerUp.wav");
	var hrana=new Audio("Hrana.wav");
	var jump=new Audio("jump.wav");
	var bump=new Audio("bump.wav");
	var victory=new Audio("Zmaga.wav");
	var lose=new Audio("Zguba.wav");
	var bricks;
	var NROWS;
	var NCOLS;
	var BRICKWIDTH;
	var BRICKHEIGHT;
	var PADDING;
	var row;
	var col;
	var rowheight;
	var colwidth;
	var tocke;
	var tocke;
	var sekunde;
	var sekundeI;
	var minuteI;
	var intTimer;
	var izpisTimer;
	var start=true;
	var zmaga=true;
	var zguba=true;
	var zmagaSt=0;
	var power=false;
	var powerUp=0;
	var powerTime;
	var gobe=[];
	var gobeSt=0;
	var gobeNaPolju=0;
	var over=document.getElementById('GameOver');
	var mes=document.getElementById('sporočilo');
	var zmagovalec=document.getElementById('zmaga');
	$(document).keydown(onKeyDown);
	$(document).keyup(onKeyUp);
	$(document).mousemove(onMouseMove);
	
	function init() {
	  ctx = $('#canvas')[0].getContext("2d");
	  WIDTH = $("#canvas").width();
	  HEIGHT = $("#canvas").height();
	  tocke = 0;
	  $(".tocke").html(tocke);
	  sekunde = 0;
	  izpisTimer = "00:00";
	  intTimer = setInterval(timer, 1000);
	  powerTime=setInterval(powerUpTime,1000);
	  return setInterval(draw, 10);
	}
	function init_paddle() {
		paddlex = 250;
		paddleh = 15;
		paddlew = 100;
	}
	function init_mouse() {
		canvasMinX = $("#canvas").offset().left;
		//canvasMinX = 0;
		canvasMaxX = canvasMinX + WIDTH;
	}
	function initbricks() { //inicializacija opek - polnjenje v tabelo
		NROWS = 5;
		NCOLS = 10;
		BRICKWIDTH = (WIDTH/NCOLS);
		BRICKHEIGHT = BRICKWIDTH;
		PADDING = 0;
		bricks = new Array(NROWS);
		for (i=0; i < NROWS; i++) {
			bricks[i] = new Array(NCOLS);
			for (j=0; j < NCOLS; j++) {
				st=(Math.random()*10+1);
				if(st>=9.5){
					bricks[i][j]=2;
				}
				else{
					bricks[i][j] = 1;
				}
			}
		}
	}

	function onKeyDown(evt) {
		if (evt.keyCode == 39)
		rightDown = true;
		else if (evt.keyCode == 37) leftDown = true;
	}
	function onKeyUp(evt) {
		if (evt.keyCode == 39)
		rightDown = false;
		else if (evt.keyCode == 37) leftDown = false;
	}
	
	function onMouseMove(evt) {
		if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
		paddlex = evt.pageX - canvasMinX - paddlew /2;
		
		}
		
	}
	function powerUpTime(){
		if(power){
			powerUp++;
			if(powerUp==5){
				powerUp=0;
				power=false;
				
			}
		}
	}
	function circle(x,y,r){
		ctx.beginPath();
		if(power)
			r=r*2;
		ctx.arc(x,y,r,0,Math.PI*2, true);
		
		ctx.closePath();
		ctx.fill();
		
	}
	function clear(){
		ctx.clearRect(0,0,WIDTH,HEIGHT);
	}
	function rect(x,y,w,h){
		if(x+w>WIDTH)
			x=WIDTH-paddlew;
		if(x<0)
			x=0;
		ctx.beginPath();
		ctx.rect(x,y,w,h);
		ctx.closePath();
		ctx.drawImage(plosca,x,y,w,h);
		
	}
	function brik(opekax,opekay,opekaw,opekah){
		
		ctx.beginPath();
		ctx.rect(opekax,opekay,opekaw,opekah);
		ctx.closePath();
		if(bricks[i][j] == 2){
			ctx.drawImage(uprasaj, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
		}
		else if(bricks[i][j] == 3){
			ctx.drawImage(prazen, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
		}
		if(bricks[i][j] == 1){
			ctx.drawImage(opeka, (j * (BRICKWIDTH + PADDING)) + PADDING, (i * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
		}
	}
	function timer(){
		if(start==true){
			sekunde++;

			sekundeI = ((sekundeI = (sekunde % 60)) > 9) ? sekundeI : "0"+sekundeI;
			minuteI = ((minuteI = Math.floor(sekunde / 60)) > 9) ? minuteI : "0"+minuteI;
			izpisTimer = minuteI + ":" + sekundeI;

			$(".cas").html(izpisTimer);
		}
		else{
			sekunde=0;
			//izpisTimer = "00:00";
			$(".cas").html(izpisTimer);
		}
	}
	function gameOver(){
		zguba=false;
		over.style.display= 'inline';
		over.style.background= 'rgba(0,0,0,0.5)';
		mes.style.display='inline';
		clearInterval(intTimer);
	}
	function Win(){
		victory.play();
		over.style.display= 'inline';
		over.style.background= 'rgba(0,0,0,0.5)';
		zmagovalec.style.display='inline';
		clearInterval(intTimer);
	}
	function draw() {
		if(zmaga&&zguba){
			clear();
			circle(x, y, r);
			if(rightDown){
				if((paddlex+paddlew) < WIDTH){
					paddlex += 5;
				}else{
					paddlex = WIDTH-paddlew;
				}
			}
			else if(leftDown){
				if(paddlex>0){
					paddlex -=5;
				}else{
					paddlex=0;
				}
			}
			rect(paddlex, HEIGHT-paddleh-20,paddlew, paddleh);
			rowheight = BRICKHEIGHT + PADDING; //Smo zadeli opeko?
			colwidth = BRICKWIDTH + PADDING ;
			row = Math.floor(y/rowheight);
			col = Math.floor(x/colwidth);
			//riši opeke
			//Če smo zadeli opeko, vrni povratno kroglo in označi v tabeli, da opeke ni več
			if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1 ) {
				if(power){
					bricks[row][col]=0;
				}
				else{
					dy = -dy; bricks[row][col] = 0;
				}
				smash.play();
				tocke += 1; //v primeru, da imajo opeko večjo utež lahko prištevate tudi npr. 2 ali 3; pred tem bi bilo smiselno dodati še kakšen pogoj, ki bi signaliziral mesta opek, ki imajo višjo vrednost
				$(".tocke").html(tocke);
				zmagaSt++;
				if(zmagaSt==NROWS*NCOLS){
					zmaga=false;
					Win();
				}
			}
			else if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 3 ) {
				if(power){
					bricks[row][col]=0;
				}
				else{
				dy = -dy; bricks[row][col] = 0;
				}
				tocke += 1; 
				smash.play();
				$(".tocke").html(tocke);
				zmagaSt++;
				if(zmagaSt==NROWS*NCOLS){
					zmaga=false;
					Win();
				}
			}
			else if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 2 ) {
				if(power){
					
					bricks[row][col]=0;
					zmagaSt++;
				}
				else{
				dy = -dy; bricks[row][col] = 3;
				}
				pada.play();
				gobe[gobeSt]={
						gobax: (col * (BRICKWIDTH + PADDING)) + PADDING,
						gobay: (row * (BRICKHEIGHT + PADDING)) + PADDING,
						gobaw: BRICKWIDTH, 
						gobah: BRICKHEIGHT,
						goba: true,
						slika: goban		
				}
				gobeSt++;
				gobeNaPolju++;
					ctx.drawImage(prazen, (col * (BRICKWIDTH + PADDING)) + PADDING, (row * (BRICKHEIGHT + PADDING)) + PADDING, BRICKWIDTH, BRICKHEIGHT);
					
				tocke += 2; 
				$(".tocke").html(tocke);
			}
			for (i=0; i < NROWS; i++) {
				for (j=0; j < NCOLS; j++) {
					if (bricks[i][j] == 1 || bricks[i][j] == 2 || bricks[i][j]==3) {
						brik((j * (BRICKWIDTH + PADDING)) + PADDING,
						(i * (BRICKHEIGHT + PADDING)) + PADDING,
						BRICKWIDTH, BRICKHEIGHT);
					}
					
				}
			}
			
			
		
			if (x + dx > WIDTH-r || x + dx < 0+r ){
				dx = -dx;
				bump.play();
			}
			if (y + dy < 0+r){
				dy = -dy;
				bump.play();
			}
			else if (y + dy>=HEIGHT-(paddleh+20)) {
				start=false;
				if (x > paddlex && x < paddlex + paddlew ){
					
					dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
					dy = -dy;
					jump.play();
					start=true;
				}
				else if(y + dy > HEIGHT-r){
					lose.play();
					gameOver();
					return;
					
				}
				
				
			}
			x += dx;
			y += dy;
			if(gobeNaPolju>0){
				for(i=0;i<gobe.length;i++){
					if(gobe[i].goba){
						ctx.drawImage(gobe[i].slika,gobe[i].gobax,gobe[i].gobay,gobe[i].gobaw,gobe[i].gobah);
						gobe[i].gobay=gobe[i].gobay+1;
					}
					if(gobe[i].gobay+gobe[i].gobah>=HEIGHT-(paddleh+20)&&gobe[i].gobay<=HEIGHT-(paddleh+20)&&gobe[i].gobax+gobe[i].gobaw<=paddlex+paddlew &&gobe[i].gobax>=paddlex){
						gobe[i].goba=false;
						gobe[i].gobay=0;
						tocke=tocke+10;
						$(".tocke").html(tocke);
						hrana.play();
						power=true;
						powerUp=0;
					}
				}
			}
		}
	}
	
	init();
	init_paddle();
	init_mouse();
	initbricks();
	
}

function restart(){
	window.location.reload();
}
function startIt(){
	var play=document.getElementById('start');
	play.style.display='none';
	drawIt();
	var over=document.getElementById('GameOver');
	over.style.display= 'none';
	var nav=document.getElementById('navodila');
	navodila.style.display='none';
}


