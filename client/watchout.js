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
 .classed('circles', true);


var movefunction = function(){
  // make a var for every circle
  var circles = svg.selectAll('.circle');

  for (var i = 0; i < circles.length; i++) {
     circles[i].attr('cx', random);
     circles[i].attr('cy', random);
  }
  //then change attr of every circles cx and cy to random (invoke random function)
  // use a transition
}


setTimeOut(moveFunction, 500);


