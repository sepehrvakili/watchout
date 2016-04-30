// start slingin' some d3 here.
var svg = d3.select('body').append('svg')
			.attr('width', 500)
			.attr('height', 500)
			.style({'background-color': 'gray'});

d3.select('.scoreboard').style({'background-color': 'tan'});

var circles = [1, 2, 3, 4, 5];

var random = function() {
  return 500 * Math.random();
};

var allCircles = svg
 .selectAll('.circle')
 .data(circles)
 .enter()
 .append('circle')
 .attr('cx', random)
 .attr('cy', random)
 .attr('r', 7.5)
 .classed('circle', true);

var counter = 0;
var moveFunction = function() {
  // make a var for every circle
  svg
 .selectAll('.circle')
 .transition()
 .duration(1000)
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
 .classed('circle', true);
 }
  //then change attr of every circles cx and cy to random (invoke random function)
  // use a transition
};


setInterval(moveFunction, 1000);

var addCircle = function() {
  counter++;
  circles.push(circles[circles.length - 1] + 1);
};


