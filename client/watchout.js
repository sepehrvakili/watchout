// start slingin' some d3 here.

var score = 0;
var highScore = 0;
var collisions = 0;

//create a board
var svg = d3.select('body').append('svg')
			.attr('width', 500)
			.attr('height', 500)
			.style({'background-color': 'black'});

var player = svg.selectAll('.square')
                .append('square')
                .attr('width', 20)
                .attr('height', 20);
               

// color the scoreboard
d3.select('.scoreboard').style({'background-color': 'tan'});

var circles = [1, 2, 3, 4, 5];
// various randomness generators
var randomColor = function() {
  return 'hsl(' + Math.random() * 360 + ',100%,50%)';
};
var random = function() {
  return 500 * Math.random();
};
//####################################
// create enemies
var allCircles = svg
 .selectAll('.circle')
 .data(circles)
 .enter()
 .append('circle')
 .attr('cx', random)
 .attr('cy', random)
 .attr('r', 7.5)
 .style('fill', randomColor)
 .on('mouseover', function(){
    collisions ++;
    d3.select('body')
    .selectAll('.collisionsNum')
    .text(collisions);
 })
 .classed('circle', true);
// counter for new enemies to be added
var counter = 0;
var addCircle = function() {
  counter++;
  circles.push(circles[circles.length - 1] + 1);
};
// make enemies move function
var moveFunction = function() {
  // make a var for every circle
  svg
  .selectAll('.circle')
  .transition()
  .duration(2000)
  .style('fill', randomColor)
  .attr('cx', random)
  .attr('cy', random);

  if (counter > 0) {
    var newCircles = circles.slice(circles.length - 1 - counter);
    svg
    .selectAll('.circle')
    .data(newCircles)
    .enter()
    .append('circle')
    .attr('cx', random)
    .attr('cy', random)
    .attr('r', 7.5)
    .on('mouseover', function(){
      collisions++;
      d3.select('body')
      .selectAll('.collisionsNum')
      .text(collisions);
    })
    .style('fill', randomColor)
    .classed('circle', true);
  }
  //then change attr of every circles cx and cy to random (invoke random function)
  // use a transition
};
//####################################
//Player interactions

var playerCoordinates = d3.mouse(this);
var mouseX, mouseY;
svg.on('mousemove', function() {
  mouseX = d3.mouse(this)[0];
  mouseY = d3.mouse(this)[1];
  var circles = svg.selectAll('.circle');
  for (var i = 0; i < circles.length; i++) {
    var xDiff = Math.abs( Math.floor(circles[0][i].cx.animVal.value - mouseX ));
    var yDiff = Math.abs( Math.floor(circles[0][i].cy.animVal.value - mouseY ));

    if ( xDiff <= 10 && yDiff <= 10 ) {
      console.log('hIT');
      collisions++;
      d3.select('body')
      .selectAll('.collisionsNum')
      .text(collisions);
    }
  }
});





// interval move enemies
setInterval(moveFunction, 1000);



