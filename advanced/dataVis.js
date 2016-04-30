// start slingin' some d3 here.

//create a board
var svg = d3.select('body').append('svg')
      .attr('width', 800)
      .attr('height', 800)
      .style({'background-color': 'black'});
var big; // a global

var organize = function() {
  big.sort(function(a, b) {
    return b.park_site_score - a.park_site_score;
  });
  var x = 50;
  var y = 50;
  svg
  .selectAll('.circle')
  .each(function(d){
    d3.select(this)
      .transition()
      .duration(1500)
      .attr({
        cx: function(d) { 
          if (x < 750) {
            x = x + 50;
            return x;
          } else {
            y = y + 50;
            x = 0;
            return x;
          }
        },
        cy: function(d) { 
          return y;
        }
      });
    })
  .attr('r', function(d) { return d.park_site_score / 10; } );
  x = 0;
  y = 0;
};


var callback = function(error, data) {
  if (error) { 
    return console.warn(error);
  }
  big = data;

  var randomColor = function() {
    return 'hsl(' + Math.random() * 360 + ',100%,50%)';
  };

  var random = function() {
    return 800 * Math.random();
  };

  svg
  .selectAll('.circle')
  .data(big)
  .enter()
  .append('circle')
  .attr('cx', random)
  .attr('cy', random)
  .attr('r', function(d) { return d.park_site_score / 10; } )
  .style('fill', 'blue')
  .classed('circle', true);
};


d3.json('https://data.sfgov.org/resource/urx2-yj58.json', callback);




