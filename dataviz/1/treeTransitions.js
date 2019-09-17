		// <script type="text/javascript">

var data = { "name": "Zoe", "children": [ 
			{ "name": "work", "children": [ 
				{"name": "meeting A" , "value": "9-10am", "children": [ {"name": "Al"}, {"name":"B"}, {"name":"Ray"}, {"name":"Dan"}, {"name":"Tash"} ] }, 
				{"name": "meeting B" , "value": "16-17am", "children": [ {"name": "Al"}, {"name":"B"}, {"name":"Ray"}, {"name":"Dan"}, {"name":"Tash"}, {"name":"Tash"} ] },
				{"name": "code A" , "value": "11:30am-13:30pm", "children": [{"name": "me"}]},
				{"name": "code B" , "value": "18-20:30pm", "children": [{"name": "me"}]}, 
				{"name": "brainstorm", "value": "10:30-11:30am", "children": [ {"name": "Dan"}, {"name": "B"} ]}, 
				{"name":"design A", "value": "13:30-15pm", "children": [ {"name": "Tash"} ]},
				{"name":"design B", "value": "16-17pm", "children": [ {"name": "Tash"}, {"name":"Al"} ]} ] }, 
			{"name": "workout", "children": [
				{"name": "Yoga", "value": "6:30-7am", "children": [{"name": "me"}]},
				{"name": "Jogging", "value": "21:30-22pm", "children": [{"name": "me"}]}]},
			{"name": "meal", "children": [
				{"name": "Brunch", "value": "10-10:30am", "children": [{"name": "me"}]},
				{"name": "Dinner", "value": "17-18pm", "children": [{"name": "Al"}]}]},
			{"name": "leisure", "children": [
				{"name": "Coffee Break", "value": "15-16pm", "children": [{"name": "Ray"}, {"name": "Tash"}]},
				{"name": "Anime", "value": "22-24pm", "children": [{"name": "Al"}]}]},
			{"name": "sleep", "value": "0-6am", "children": [{"name": "Al"}]}

			] };	


var width = 800;
var height = 600;

var margin = {left: 100, top: 100, right: 40, bottom: 40};

var svg = d3.select("body")
	.append("svg")
	.attr("width", 1200)
    .attr("height", 1200);
	  
var g = svg.append("g")
	.attr('transform','translate('+ margin.left +','+ margin.top +')');

var root = d3.hierarchy(data);
	  
// Tree
var tree = d3.tree()
    .size([width-margin.left-margin.right,height-margin.top-margin.bottom]);

// Cluster	
var cluster = d3.cluster()
    .size([height-margin.top-margin.bottom,width-margin.left-margin.right]);

// var t = d3.transition()
// 		.duration(750);

// Set initial vertical Tree

var link = g.selectAll(".link")
    .data(tree(root).links())
    .enter()
    .append("path")
    .attr("class", "link")
//	.attr("fill","none")
//	.attr("stroke","#ccc")
    .attr("d", d3.linkVertical()
    	.x(function(d) { return d.x; })
        .y(function(d) { return d.y; }))
    // .style('fill-opacity', 1e-6)
    // .transition(t)
    // .style('fill-opacity', 1);

  var node = g.selectAll(".node")
    .data(root.descendants())
    .enter()
    .append("g")
//      .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
	//node style - adjustable
	  .attr('class', 'node text')
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })

  node.append("circle")
      .attr("r", 2.5);
	  
  var label = node.append("text")
     .text(function(d) { return d.data.name; })
	 // .attr('y',-10)
	 // .attr('x',-10)
	 // .attr('text-anchor','middle');
	 //.attr("dy", 0)
	 .attr("dy", ".31em")
	 .attr("dx", 0)
     .attr("x", function(d) { return d.children ? -8 : 8; })
     //.attr("y", function(d) { return d.children ? -8 : 8; })
     //.attr("transform", "rotate(90)")
     .style("text-anchor", function(d) { return d.children ? "end" : "start"; })

     
//      .attr("transform", function(d) { return "rotate(" + (d.x < 180 ? d.x - 90 : d.x + 90) + ")"; })
//      .text(function(d) { return d.id.substring(d.id.lastIndexOf(".") + 1); });
	 
verticalCluster();
showcase();

	 

function verticalTree() {
	// Transition to vertical 

	g.transition()
		.attr("transform",'translate(' + margin.left + ',' + margin.right + ')')
		.duration(4000);

	tree
	.size([width * 1.3,height-margin.top-margin.bottom]);

	link.data(tree(root).links())
	    .transition()
	    .attr("d", d3.linkVertical()
          .x(function(d) { return d.x; })
          .y(function(d) { return d.y; }))
	   .duration(4000);
	   
	node.transition()
	    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
		.duration(4000)	

}	
	 
	 
	 
function horizontalTree() {
	// Transition to horizontal

	g.transition()
		.attr("transform",'translate('+ margin.left +','+ margin.right +')')
		.duration(4000);
	
	tree.size([height-margin.top-margin.bottom,width-margin.left-margin.right]);
	
	link.data(tree(root).links())
	    .transition()
	    .attr("d", d3.linkHorizontal()
          .x(function(d) { return d.y; })
          .y(function(d) { return d.x; }))
	   .duration(4000);
	   
	node.transition()
	    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
		.duration(4000);
}


function radialTree() {
	// Transition to Radial

	g.transition()
		.attr("transform","translate("+width/2+","+height/2+")")
		.duration(4000);
	
	tree.size([2 * Math.PI, height/2]);

	link.data(tree(root).links())
		.transition()
	    .attr("d", d3.linkRadial()
          .angle(function(d) { return d.x; })
          .radius(function(d) { return d.y; }))
	    .duration(4000);
		
	node.transition()
	   .attr("transform", function(d) { return "translate(" + radialPoint(d.x, d.y) + ")"; })
	   .duration(4000);
	   
}

function verticalCluster() {

	g.transition()
		.attr("transform",'translate('+ margin.left +','+ margin.right +')')
		.duration(4000);

	cluster.size([width*1.3,height-margin.top-margin.bottom]);

	link.data(cluster(root).links())
		.transition()
		.attr("d", function(d) { 
			console.log(d);
        	return "M" + d.source.x + "," + d.source.y
            + "C" + d.source.x + "," + (d.source.y+60)
            + " " + d.target.x + "," + (d.source.y+60)
            + " " + d.target.x + "," + d.target.y;
      	})
	  	.duration(4000)
	  
	node.transition()
	   .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
	   .duration(4000);
}

function horizontalCluster() {

    g.transition()
    	.attr("transform",'translate('+ margin.left +','+ margin.right +')')
    	.duration(4000);

	cluster.size([height-margin.top-margin.bottom,width-margin.left-margin.right]);
	
	link.data(cluster(root).links())
	  	.transition()
	  	.attr("d", function(d) { 
	  		console.log(d);
       	return "M" + d.source.y + "," + d.source.x
            + "C" + (d.source.y +100) + "," + d.source.x
            + " " + (d.source.y +100) + "," + d.target.x
            + " " + d.target.y + "," + d.target.x;
      	})
	  	.duration(4000);
	  
	node.transition()
	   	.attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
	   	.duration(4000);
}

function radialCluster() {
	g.transition().attr("transform","translate("+width/2+","+height/2+")")
		.duration(4000);

	cluster.size([2 * Math.PI , height/2 - 40]);
	
	link.data(cluster(root).links())
	  	.transition()
      	.attr("d", function(d) {
        	return "M" + radialPoint(d.source.x, d.source.y)
            + "C" + radialPoint(d.source.x, (d.target.y + d.source.y) / 2)
            + " " + radialPoint(d.target.x, (d.target.y + d.source.y) / 2)
            + " " + radialPoint(d.target.x, d.target.y);
      	})
	  	.duration(4000)
	  
	node.transition()
	   	.attr("transform", function(d) { return "translate(" + radialPoint(d.x, d.y) + ")"; })
	   	.duration(4000);
}

function radialPoint(x, y) {
	return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
}
		
	
var i = 1;
  
function showcase() {
	setTimeout(function() {
		if (++i%6 == 4) { horizontalTree(); }
		else if  (i%6 == 2) { radialTree(); }
		else if (i%6 == 5) { horizontalCluster(); }
		else if (i%6 == 3) { radialCluster(); }
		else if (i%6 == 1) { verticalCluster(); }
		else { verticalTree(); }
		showcase();
	}, 3500)
	
	
	
 }
	   
	 
	
	
// </script>
