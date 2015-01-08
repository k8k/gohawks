// load css
require('./styles');

// Load polyfills
require('famous-polyfills');

// import dependencies
var Engine = require('famous/core/Engine');
var Modifier = require('famous/core/Modifier');
var Transform = require('famous/core/Transform');
var ImageSurface = require('famous/surfaces/ImageSurface');
var Transitionable = require('famous/transitions/Transitionable');
var Surface = require('famous/core/Surface');
var Easing = require('famous/transitions/Easing');
var SpringTransition = require('famous/transitions/SpringTransition');
var Draggable = require('famous/modifiers/Draggable');

// physics
var PhysicsEngine = require('famous/physics/PhysicsEngine');
var Particle = require('famous/physics/bodies/Particle');
var RepulsionForce = require('famous/physics/forces/Repulsion');


// create the main context
var mainContext = Engine.createContext();
mainContext.setPerspective(800)


// Bout That Action 

// characters
var marshawn = new ImageSurface({
  size: [388/1.5, 602/1.5],
  content: 'images/marshawn.png',
  classes: ['backfaceVisibility']
});



var wilson = new ImageSurface({
  size: [222, 395],
  content: 'images/russell-wilson.png',
  classes: ['backfaceVisibility']

});

var kam = new ImageSurface({
  size: [202, 292],
  content: 'images/kam.png',
  classes: ['backfaceVisibility']

});

var peteSize = [227/1.5, 292/1.5];

var pete = new ImageSurface({
  size: peteSize,
  content: 'images/pete.png',
  classes: ['backfaceVisibility']


});

// accessories
var football = new ImageSurface({
  size: [192, 194],
  content: 'images/football.png',
  classes: ['backfaceVisibility']

});

var skittles = new ImageSurface({
  size: [100, 80],
  content: 'images/skittles.png',
  classes: ['backfaceVisibility']

});


// FLAG FOR LATER
// var flag = new ImageSurface({
// 	size: [435,292],
// 	content: 'images/flag.png',
// })






// pete shit


var modifier = new Modifier({
	origin: [0,1],
	transform: function ()  { 
		return Transform.translate(Math.sin(0.002 * Date.now()) * window.innerWidth / 2, 0)

			}

});

var peteSlider = new Modifier({
  align: [0, 1],
  origin: [0, 1],
  transform: function() {
    return Transform.translate(Math.sin(0.0005 * Date.now()) * (window.innerWidth), 0)
    // return Transform.rotateY(.002 * (Date.now() - initialTime));
  }
});




mainContext.add(peteSlider).add(pete);




// skittles orbiting marshawn

var center = new Modifier({
  origin: [0.5, 0.5],
  align: [0.5, 0.5],
  transform: function() {
    return Transform.rotateZ(-.0008 * (Date.now() - initialTime));
  }
});




var centerNode = mainContext.add(center);
centerNode.add(marshawn);

var translate = new Modifier({
  transform: Transform.translate(300, 0, 0)
});

var rotate = new Modifier({
  transform: function() {
    return Transform.rotateY(Date.now() * .002)
  }
});



var initialTime = Date.now();

marshawn.on('click', function() {
	centerNode.add(rotate).add(translate).add(skittles);
});


// hustle like russell

var wilsonDraggable = new Draggable();
wilson.pipe(wilsonDraggable);

var russellState = new Transitionable(1.5);
russellState.set(1.5);

var dynamicRuss = new Modifier({
  transform: function() {
    var now = russellState.get() * 300;
    var y = now;
    var x = 100 * Math.cos(0.02 * now) + 200;
    var z = 100 * Math.cos(-0.02 * now) - 200;;
    return Transform.translate(x, y, z);
  }
});


wilson.on('click', function() {
  var value = russellState.get();
  var newValue;
  if (value) {
    newValue = 0;
  }
  else {
    newValue = 1.5;
  }
  russellState.set(newValue, {duration: 2000}, function() {
    russellState.set(value, {duration: 2000});
  });
});


// bouncing richard sherman 


var sherman = new ImageSurface({
  size: [276, 395],
  content: 'images/sherman.png',
});


var shermanDraggable = new Draggable();
sherman.pipe(shermanDraggable);


var bouncingModifier = new Modifier({
        align: [0.8, 1],
        origin: [0, .8],
        transform: Transform.translate(0,-240,-100)
    });

    Transitionable.registerMethod('spring', SpringTransition);
    var transition = {
        method: "spring",
        period: 400,
        dampingRatio: .2,
        velocity: 0

    }



sherman.on("click", function(){
    bouncingModifier.setTransform(Transform.translate(0,0,0),transition, 
    	function() {
    		bouncingModifier.setTransform(Transform.translate(0,-240,-100), transition)
    	});
});



    mainContext.add(shermanDraggable).add(bouncingModifier).add(sherman);


// draggable Kam

var draggable = new Draggable();

kam.pipe(draggable);

// mainContext.add(draggable).add(kam);

// mainContext.add(peteYelling).add(pete);
mainContext.add(wilsonDraggable).add(dynamicRuss).add(wilson);




