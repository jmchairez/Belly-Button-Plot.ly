d3.json("../data/samples.json").then((data => {
    console.log(data)
        
var names = data.names;
var metadata = data.metadata;
var samples = data.samples;
        
var message = ("Select ID #");
d3.select("#selDataset").append("option")
.attr("value", message).html(message);

var dropdown = d3.select("#selDataset");
names.forEach((item) => {
    var row = dropdown.append("option")
    .attr("value", item);
    row.text(item);
});

const dropdownchange = () => {

var demoTable = d3.select("#demographics-table");
demoTable.html("")
var inputElement = d3.select("#selDataset");
var tableBody = demoTable.append("tbody");
var inputValue = inputElement.property("value");
        
var filterData = metadata.filter(item => item.id == inputValue);
var filterSamples = samples.filter(item => item.id == inputValue);
        
var washFreq;
filterData.foreach((item) => {
let row = tableBody.append("tr");
Object.entries(item).forEach(value => {
    washFreq = item.wfreq;
    let cell = row.append("tr");
    cell.text("");
    cell.text(`${value[0]}: ${value[1]}`);
})
});

console.log(washFreq)

var SlicedSampleValues = filteredSamples[0].sample_values.slice(0,10).reverse();
var slicedOTUs = filteredSamples[0].otu_ids.slice(0,10).reverse().map(data => `OTU ` + data);
var slicedLabels = filteredSamples[0].otu_labels.slice(0,10).reverse();

var trace1 = {
x: SlicedSampleValues,
y: slicedOTUs,
text: slicedLabels,
type: "bar",
orientation: "h",
marker: {
    color: 'purple',
    width: 1
}
};

var bardata = [trace1];
var barlayout = {
    title: "Top Microbes in Sample",
    xaxis: {title: "# Microbes Observed"},
    yaxis: {title: "OTU ID"},
};
Plotly.newPlot("bar", bardata, barlayout);


var level = washFreq;
var degrees = 180 - (level * 20),
    radius = .5;
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);

var path1 = (degrees < 45 || degrees > 135) ? 'M -0.0 -0.025 L 0.0 0.025 L ' : 'M -0.025 -0.0 L 0.025 0.0 L ';
var mainPath = path1,
    pathX = String(x),
    space = ' ',
    pathY = String(y),
    pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);
var gaugedata = [{ type: 'scatter',
    x: [0], y:[0],
      marker: {size: 14, color:'850000'},
      showlegend: false,
      text: level,
      hoverinfo: 'text'},
    { values: [81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81],
    rotation: 90,
    text: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9', ''],
    direction: 'clockwise',
    textinfo: 'text',
    textposition:'inside',
    marker: {colors:['maroon', 'red', 'salmon','darkorange', 'orange', 'gold', 'yellow','lightgreen', 'green', 'black'
    ]},
    hoverinfo: 'label',
    hole: .4,
    type: 'pie',
    showlegend: false
}];
var gaugelayout = {
  shapes:[{
    type: 'path',
    path: path,
    fillcolor: '850000',
    line: {color: '850000'}
    }],
    title: { text: "Frequency of Bellybutton Washing<br><span style='font-size:0.8em;color:gray;'>Scrubs per Week</span><br><span style='font-size:1em;color:darkgray;font-weight: bold;'></span>"},
    xaxis: {zeroline:false, showticklabels:false,
              showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false,
              showgrid: false, range: [-1, 1]}
};
Plotly.newPlot('gauge', gaugedata, gaugelayout);

var size = filteredSamples[0].sample_values;
var trace2 = {
x: filteredSamples[0].otu_ids,
y: filteredSamples[0].sample_values,
text: filteredSamples[0].otu_labels,
mode: 'markers',
marker: {
  size: size,
  sizeref: .1,
  sizemode: 'area',
  color: filteredSamples[0].otu_ids,
  colorscale:"Portland"
}}
var bubbledata = [trace2]
var bubblelayout = {
title: "Microbe Prevalence by OTU",
xaxis: {title: 'OTU ID'},
yaxis: {title: '# Microbes Observed'},
}
Plotly.newPlot("bubble", bubbledata, bubblelayout)
};