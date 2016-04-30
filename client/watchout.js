// start slingin' some d3 here.

var score = 0;
var highscore = 0;
var collisions = 0;

//create a board
var svg = d3.select('body').append('svg')
			.attr('width', 500)
			.attr('height', 500)
			.style({'background-color': 'black'});

var drag = d3.behavior
          .drag()
          .on('drag', function() {
            player
            .attr('x', d3.event.x);
            player
            .attr('y', d3.event.y);
          });

var player = svg.append('rect')
                .attr('x', 100)
                .attr('y', 100)
                .attr('width', 20)
                .attr('height', 20)
                .style('fill', 'red')
                .call(drag);



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
    .style('fill', randomColor)
    .classed('circle', true);
  }
  //then change attr of every circles cx and cy to random (invoke random function)
  // use a transition
};
//####################################
//Player interactions
// var playerx = player[0][0].x.animVal.value;
// var playery = player[0][0].y.animVal.value;

var checkCollisions = function() {
  var circles = d3.selectAll('.circle');
  playerx = player[0][0].x.animVal.value;
  playery = player[0][0].y.animVal.value;
  for (var i = 0; i < circles.length; i++) {

    var xDiff = Math.abs( Math.floor(circles[0][i].cx.animVal.value - playerx));
    var yDiff = Math.abs( Math.floor(circles[0][i].cy.animVal.value - playery));

    if ( xDiff <= 20 && yDiff <= 20 ) {
      if(score > highscore){
        highscore = score;
        d3.select('body')
        .select('.highscoreNum')
        .text(highscore);
      }
      collisions++;
      score = 0;
      d3.select('body')
      .selectAll('.collisionsNum')
      .text(collisions);
      d3.select('body')
      .select('.currentNum')
      .text(score);

    }
  }
};
var getScore = function() {
  score = score + Math.floor(circles.length / 2);
  d3.select('body')
  .select('.currentNum')
  .text(score);
};

setInterval(getScore, 100);
setInterval(checkCollisions, 100);
setInterval(moveFunction, 1000);



