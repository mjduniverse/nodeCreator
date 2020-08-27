"use strict";

var settings = {
	
	world : {
		grav : 9.8,
		bg: "#eee",
		border : null
	},
	
	objUniverse : [
		{
			path: true,
			vertsX: [225, 338, 340, 228, 225],
			vertsY: [562, 563, 450, 447, 562],
			strokeStyle: "blue",
			name: "apples"
		}
		/*
		{
			id: "object2",
			name: "Object 1",
			type: "polygon",
			closed_polygon: true,
			vertsX: [13, 3, 5, 6, 40, 10],
			vertsY: [4, 5, 3, 1, 56, 1],
			physics : true,
			mass: 10,
			locked: true
		}
		
		*/
		
	]
	
	
}


/*** ***/

function Vector(x, y) {
	this.x = x;
	this.y = y;
}

// Mouse Functions

function getMouseX() {
	return event.pageX;
}

function getMouseY() {
	return event.pageY
}

// Mouse Functions [END]


/*** Vert Pen Variables ***/

var vertsX = [];
var vertsY = [];
var vertI = 0;

/*** Check if a certain point (x,y) is in the vertices set of a path N. ***/

function is_a_vert(x,y,N) {
	if(settings.objUniverse[N].vertsX.includes(x), settings.objUniverse[N].vertsY.includes(y)) {
		return true;
	}
	
	else {
		return false;
	}
}

alert(is_a_vert(225, 562, 0));

/*** Calculate Distance between (x1,y1) and (x2, y2). The distance is given by the following input: (x1, y1, x2, y2) ****/

function calc_vert_distance(x1, y1, x2, y2) {
	return Math.sqrt( Math.pow((x1-y1),2) + Math.pow((x2-y2),2) );
}

alert(calc_vert_distance(1, 0, 0, 1));

/*** 

/*** Defines a certain greater than function for vertices (x1, y1) and (x2, y2).  ***/

function i_vert_g(x1, y1, x2, y2) {
	if( (x1 < x2) && (y1 < y2) ) {
		return true;
	}
}

/***

function getObjectName() 

Returns the object from objUniverse if found. Returns null if not found.


***/

function getObjectByName(x) {
	
	var a = null;
	
	settings.objUniverse.some(function(b) {
		if(b.name === x) {
			a = b;
			return true;
		}
		
		else {
			return false;
		}
		
	});
	
	return a;
	
}

alert(getObjectByName("apples"));


/*** Find Centroid of polygon ***/



/*** Detect Mouse Location Functions ***/

/* Detects if mouse location is in a rectangle*/

function rectMouseDomain(x1, x2, y1, y2) {
	
}

/*** GAME ****/

var elmName = '.bbb';
var elm = document.querySelector(elmName);
elm.width = 900;
elm.height = 900;
var ctx = elm.getContext('2d');


// Generate Background

function generateBackground() {
  ctx.fillStyle = settings.world.bg;
  ctx.fillRect(0, 0, elm.width, elm.height);
}



/***

Drawing Object Universe

***/

function drawLayer() {
	for(var i = 0; i < settings.objUniverse.length; i++) {
		
		  var a = settings.objUniverse[i]
		  
		  /*** Drawing Path ***/
		  
		  if ( a.path === true )  {
		  
			  ctx.beginPath();
			  ctx.strokeStyle = a.strokeStyle;
			  
			  for(var j = 0; j < a.vertsX.length; j++) {
								  
				  ctx.moveTo(a.vertsX[j-1], a.vertsY[j-1]);
				  ctx.lineTo(a.vertsX[j], a.vertsY[j]);
				  
			  }
			  
			 
			  ctx.moveTo(a.vertsX[0], a.vertsY[0]);
			  ctx.lineTo(a[a.vertsX.length - 1], a[a.vertsY.length - 1]);
			  
			  
			  ctx.stroke();
		  
		  }
		  
	}
	
}

/*** 

render_static(); function.
This renders everything, based off the settings object. It is to be run after a dynamic editing render is done.

***/

function render_static() {
	generateBackground();
	drawLayer();
}

render_static(); // Render everthing in the loaded settings object.


/*** Normal Mouse Down Functionality ***/

function mouseDownDefault() {
	
}

elm.onmousedown = mouseDownDefault;


/* 

Verticies Pen

*/



function VertPen() {

	 var X = getMouseX();
	 var Y = getMouseY();
	 
	 ctx.strokeStyle = 'red';
	 ctx.beginPath();
	 ctx.fillStyle = 'red';
	 ctx.fillRect(X, Y, 3, 3);
	 ctx.stroke();
	 
	 vertsX.push(X);
	 vertsY.push(Y);
	 
	 // Path Preview
	 
	 if(vertsX.length > 1) {
	  ctx.moveTo(vertsX[vertI-1], vertsY[vertI-1]);
	  ctx.lineTo(vertsX[vertI], vertsY[vertI]);
	  ctx.stroke();
	}
	 
	vertI++;
		
};



var vertPenActivation = false;

document.querySelector('.addPath.button').onclick = function() {
	  if(vertPenActivation === true) {
		  
		  /*** Push path to ObjUniverse and clear temporary vertices variables ***/
		  
		  var newObj = {
			  path: true,
			  vertsX : vertsX,
			  vertsY : vertsY
		  }
		  
		  settings.objUniverse.push(newObj);
		  
		  
		  vertsX =[];
		  vertsY=[];
		  vertI = 0;
		  
		  /*** Clear Everything and update canvas with new object ***/
		  
		  ctx.clearRect(0, 0, elm.width, elm.height);
		  render_static();
		  
		  /*** Makes elm.onmousedown EventListener go back to ordinary eventListener. ***/
			  
		  elm.onmousedown = mouseDownDefault; // 
		  
		  /*** Toggle addPath buttom ***/
		  
		  document.querySelector('.addPath.button').innerHTML = "addPath";
		  vertPenActivation = false;
	  }
	  
	  else {
		  elm.onmousedown = VertPen;
		  document.querySelector('.addPath.button').innerHTML = "closePath";
		  vertPenActivation = true;
	  }
};

	
	
	

	
	
