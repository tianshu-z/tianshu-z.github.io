// Define the dimensions of the visualization. 

var margin  = {top: 10, right: 5, bottom: 10, left: 100},
    width   = 1400-margin.left-margin.right,
    height  = 900-margin.top-margin.bottom;

var svg = d3.select("body").append("svg")
    .attr("width",width)
    .attr("height",height);

//create the tooltip that holds the country name
var tooltip = d3.select('body')
    .append('div')
    .attr("class","tooltip")
    .style({
        'background' : 'orange',
        'color':'white',
        'width':"160px",
        'opacity': 0.3,
    });

d3.json("https://raw.githubusercontent.com/tianshu-z/DataViz_interactiveNetwork_Chinese-Province-Connectivity-and-GDP-per-capita/master/data/provinceConnections.json", function(data){ 
  
// Extract the nodes and links from the data.
var nodes = data["nodes"];
var links = data["links"];

// Now we create a force layout object and define its properties.
// Those include the dimensions of the visualization and the arrays
// of nodes and links.
var force = d3.layout.force()
    .size([width,height])
    .nodes(d3.values(nodes))
    .links(links)
    .on("tick",tick)
    .linkDistance(300)
    .start();
  
// adding the nodes and links to the visualization.


// Links are pretty simple. They're just SVG lines, and
// we're not even going to specify their coordinates. (We'll
// let the force layout take care of that.) Without any
// coordinates, the lines won't even be visible, but the
// markup will be sitting inside the SVG container ready
// and waiting for the force layout.

var link = svg.selectAll('.link')
    .data(links)
    .enter()
    .append('line')
    .attr("class","link");
  
  // Now it's the nodes turn. Each node is drawn as a flag.
var node = d3.select('#flags')
    .selectAll('img')
    .data(force.nodes())
    .enter()
    .append('img')
  //we return the exact flag of each country from the image
    .attr('class', function (d) { return 'flag flag-' + d.code; })
  //we call some classes to handle the mouse
    .on('mouseover', mouseoverHandler)
    .on('mousemove',mouseMoving)
    .on('mouseout', mouseoutHandler);
  
  // defining a function that we want the layout to call once the calculations are done.
  function tick(e){
    // reposition the nodes. 
    node.style('left', function (d) { return d.x + 'px'; })
         .style('top', function (d) { return d.y + 'px'; })
         .call(force.drag);
    
    // update positions of the links.
    link.attr('x1', function(d){ return  d.source.x})
        .attr('y1',function(d){ return  d.source.y})
        .attr('x2', function(d){ return  d.target.x})
        .attr('y2',function(d){ return   d.target.y})
  }
  
  //hover over a flag
  //the tooltip with the name of the country is going to show up
  function mouseoverHandler (d) {
     tooltip.transition().style('opacity', 0.75)
     tooltip.html('<p>' + d["Province Name"] + "<br>" + "GDP per capital " + d["aGDP"] + "RMB" 
              + "<br>" + d["Population(万人)"] + "万人" 
              + "<br>" + d["Size(万平方千米)"] + "万平方千米" + '</p>' );
  }

  //leaving a flag
  //the tooltip will disappear
  function mouseoutHandler (d) {
      tooltip.transition().style('opacity', 0);
  }

  function mouseMoving (d) {
      tooltip.style("top", (d3.event.pageY-10)+"px")
      .style("left",(d3.event.pageX+10)+"px")
      .style("color","white");
  }
})
