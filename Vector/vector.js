// TODO: 
// Map Wrapping 
// finish write-up 
// Create Line chart for Quantity of missions 

// Consts for the Graphic's SVGs 
svg_height = 400
svg_width = 300
svg_gap = 10

// Graph Constants 
dot_opacity = .5
line_opacity = .5
line_width = 1
map_stroke = .5

// overall svg
svg = d3.select("body#viz")
    .append("svg")
    .attr("id", "mainsvg")
    .attr("height", svg_height)
    .attr("width", svg_width*2 + svg_gap)

// Map and projection
var projection1 = d3.geoMercator()
    .scale(400)
    .center([40, 45])
    //.translate([svg_width/2, (svg_height/2)])

// Map and projection
var projection2 = d3.geoMercator()
    .scale(225)
    .center([200, 5])
    //.translate([svg_width/2, svg_height/2])

// A path generator
var path1 = d3.geoPath()
    .projection(projection1)

// A path generator
var path2 = d3.geoPath()
    .projection(projection2)

// Set up SVGs 
svg1 = d3.select("svg#mainsvg")
  .append("svg")
  .attr("id", "svg1")
  .attr("height", svg_height)
  .attr("width", svg_width + svg_gap + 150)

svg2 = d3.select("svg#mainsvg")
  .append("g") // group to move svg sideways
    .attr("transform", "translate(" + (svg_width+svg_gap+180) + ")")
    .append("svg")
    .attr("id", "svg2")
    .attr("height", svg_height)
    .attr("width", svg_width + svg_gap + 500)

//////////////////////////////////////////
/////////////// Graphing /////////////////
//////////////////////////////////////////

////// European Theatre ////////
d3.queue()
  .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")  // World shape
  .defer(d3.csv, "ww2_operations.csv") 
  .await(ready1);

function ready1(error, dataGeo, data) {
    // Create plots when data is loaded
    drawPlot1(dataGeo, data)
  }

function drawPlot1(dataGeo1, data1) {
    // Get year from slider 
    var slider_year = document.getElementById("year_slider").value;
    update_year();

    // Filter data bsed on year selected on slider 
    var new_data = data1.filter(function filter_by_year(d) { if (d["year"] == slider_year) { return true; } });
    
    var link = []
    new_data.forEach(function(row){
      source = [+row.long1, +row.lat1]
      target = [+row.long2, +row.lat2]
      topush = {type: "LineString", coordinates: [source, target]}
      link.push(topush)
    })

    // Remove any existing Paths/Objects
    svg1.selectAll("path").remove()
    svg1.selectAll("circle").remove()
    svg1.selectAll("text").remove()

    // Draw the map
    svg1.append("g")
        .selectAll("path")
        .data(dataGeo1.features)
        .enter().append("path")
            .attr("fill", "#b8b8b8")
            .attr("d", d3.geoPath()
                .projection(projection1)
            )
            .style("stroke", "#fff")
            .style("stroke-width", map_stroke)

    // Add the path
    svg1.selectAll("myPath")
      .data(link)
      .enter()
      .append("path")
        .attr("d", function(d){ return path1(d)})
        .style("fill", "none")
        .style("opacity", line_opacity)
        .style("stroke", "#0B8BD0")
        .style("stroke-width", line_width)
    
    // Add Target Location Circles 
    svg1.selectAll("target_1")
      .data(new_data)
      .enter()
      .append("circle")
        .attr("cx", function(d) {return projection1([d.long2, d.lat2])[0] })
        .attr("cy", function(d) {return projection1([d.long2, d.lat2])[1] })
        .attr("r", 2)
        .attr("fill", "#C70039")
        .attr("fill-opacity", dot_opacity)

    // Add Title 
    svg1.append("text")
      .attr("x", (svg_width / 2) + 100)
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .text("European Theatre")
      .style("font-size", "30px")
      .style("fill", "#C70039")
      .style("background-color", "#0B8BD0")

    // Select Slider 
    d3.select("#year_slider")
      .on("input", function() {
        drawPlot1(dataGeo1, data1)
        drawPlot2(dataGeo1, data1)
    });
}

////// Pacific Theatre ////////
d3.queue()
  .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")  // World shape
  .defer(d3.csv, "ww2_operations.csv") 
  .await(ready2);

// Second Map 
function ready2(error, dataGeo2, data2) {
  // Create Plot 
  drawPlot2(dataGeo2, data2);
}

function drawPlot2(dataGeo2, data2) {
  // Get year from slider 
  var slider_year = document.getElementById("year_slider").value;

  // Filter data bsed on year selected on slider 
  var new_data2 = data2.filter(function filter_by_year(d) { if (d["year"] == slider_year) { return true; } });

  // Reformat the list of link. Note that columns in csv file are called long1, long2, lat1, lat2
  var link2 = []
  new_data2.forEach(function(row){
    source2 = [+row.long1, +row.lat1]
    target2 = [+row.long2, +row.lat2]
    topush2 = {type: "LineString", coordinates: [source2, target2]}
    link2.push(topush2)
  })

  // Remove any existing Paths/Objects
  svg2.selectAll("path").remove()
  svg2.selectAll("circle").remove()
  svg2.selectAll("text").remove()

  // Draw the map
  svg2.append("g")
      .selectAll("path")
      .data(dataGeo2.features)
      .enter().append("path")
          .attr("fill", "#b8b8b8")
          .attr("d", d3.geoPath()
              .projection(projection2)
          )
          .style("stroke", "#fff")
          .style("stroke-width", map_stroke)

  // Add the path
  svg2.selectAll("myPath2")
    .data(link2)
    .enter()
    .append("path")
      .attr("d", function(d){ return path2(d)})
      .style("fill", "none")
      .style("opacity", line_opacity)
      .style("stroke", "#0B8BD0")
      .style("stroke-width", line_width)
  
      // Add Target Location Circles 
  svg2.selectAll("target_2")
  .data(new_data2)
  .enter()
  .append("circle")
    .attr("cx", function(d) {return projection2([d.long2, d.lat2])[0] })
    .attr("cy", function(d) {return projection2([d.long2, d.lat2])[1] })
    .attr("r", 2)
    .attr("fill", "#C70039")
    .attr("fill-opacity", dot_opacity)

  
  // Add Title 
  svg2.append("text")
    .attr("x", (svg_width / 2) + 60)
    .attr("y", 30)
    .attr("text-anchor", "middle")
    .text("Pacific Theatre")
    .style("font-size", "30px")
    .style("fill", "#C70039")
    //.style("text-decoration", "underline overline")

}

/*
//////// Line Graph //////////
var svg_line_margin = {top: 10, right: 100, bottom: 30, left: 30},
    svg_line_height = 300,
    svg_line_width = 500;

// overall svg
svg_scatter = d3.select("body#viz2")
    .append("svg")
    .attr("id", "scatterplot_svg")
    .attr("height", svg_line_height)
    .attr("width", svg_line_width*2)

// Set up SVGs 
svg3 = d3.select("svg#scatterplot_svg")
    .append("svg")
    .attr("id", "svg3")
    .attr("height", svg_line_height)
    .attr("width", svg_line_width)

d3.queue()
  .defer(d3.csv, "explosives.csv") 
  .await(ready3);

  // Second Map 
function ready3(error, data3) {
  // Create Plot 
  drawPlot3(data3);
}

function drawPlot2(dataGeo2, data2) {

}
*/

function update_year() {
  // Get year from slider 
  var slider_year = document.getElementById("year_slider").value;

  //d3.select("#year_designator").remove()

  // Change the Year Designator 

  var text = d3.select("#year_designator");

  if (text.empty()) {
    text = d3.select("#year_designator").style("text-anchor", "middle").append("text").text(slider_year);
  }
  text.text(function() {
    return slider_year;
  });
}


