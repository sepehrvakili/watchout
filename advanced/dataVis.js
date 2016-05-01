// start slingin' some d3 here.

//create a board
var svg = d3.select('body').append('svg')
      .attr('width', 800)
      .attr('height', 800)
      .style({'background-color': 'white'});
var big; // a global

var organize = function() {
  var x = 0;
  var y = 50;
  svg
  .selectAll('.circle')
  .each(function(d) {
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
            x = 50;
            return x;
          }
        },
        cy: function(d) { 
          return y;
        }
      });
  });
console.log('ran');
  svg
  .selectAll('.text')
  .each(function(d) {
    d3.select(this)
      .transition()
      .duration(1500)
      .attr('x', function(d) { return this.parentElement.childNodes[0].cx.animVal.value } )
      .attr('y', function(d) { return this.parentElement.childNodes[0].cy.animVal.value } )
  });
console.log('this')
  x = 0;
  y = 0;
};


var callback = function(error, data) {
  if (error) { 
    return console.warn(error);
  }
  big = data;
  big = big.sort(function(a, b) {
    return b.park_site_score - a.park_site_score;
  });
  var randomColor = function() {
    return 'hsl(' + Math.random() * 360 + ',100%,50%)';
  };

  var random = function() {
    return 800 * Math.random();
  };

  var group = svg
  .selectAll('g')
  .data(big)
  .enter()
  .append('g')

  group
    .append('circle')
    .attr('cx', random)
    .attr('cy', random)
    .attr('r', function(d) { return d.park_site_score / 6; } )
    .style('fill', 'blue')
    .on('mouseover', function(d) {
      d3.select(this.nextSibling)
        .attr('visibility', 'visible')
    })
    .on('mouseout', function(d) {
      d3.select(this.nextSibling)
        .attr('visibility', 'hidden')
        // .attr('position', 'absolute')
    })
    .classed('circle', true);


   group.append('text')
    .text(function(d) { 
      return d.park; })
    .attr('visibility', 'hidden')
    .attr('fill', 'red')
    .attr('x', function(d) { return this.parentElement.childNodes[0].cx.animVal.value } )
    .attr('y', function(d) { return this.parentElement.childNodes[0].cy.animVal.value } )
    .classed('text', true)
};


d3.json('https://data.sfgov.org/resource/urx2-yj58.json', callback);




