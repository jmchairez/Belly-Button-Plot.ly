function init() {

  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data)=> {
    var sampleNames = data.names;

    sampleNames.forEach ((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    })

    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleobj => sampleobj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");

    Object.defineProperties(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
    
  });
}


function buildCharts(sample) {
  d3.json("samples.json").then((data) => {
    var samples = data.samples
    var filteredResults = samples.filter(sampleObj => sampleObj.id == sample)
    var results = filteredResults[0]

    var samplevalues = results.samplevalues;
    var OTU_id = results.OTU_id;
    var OTU_labels = results.OUT_labels;

    var yticks = OTU_id.slice(0,10).map(outID => `OTU ${outID}`).reverse();

    var trace = [
      {
      x: samplevalues.slice(0, 10).reverse(),
      y: yticks,
      text: OTU_labels.slice(0, 10).reverse(),
      type:"bar",
      orientation: "h"
    }
  ];
    var barlayout = {
    title: "Top 10 Bacteria Cultures"
    };
  
  Plotly.newPlot("bar", trace, barlayout);

  var trace1 = [
    {
    x: OTU_id,
    y: sample_values,
    text: OTU_labels,
    mode: "markers",
    marker: {
      color: OTU_id,
      colorscale: "Earth",
      size: sample_values
      }
    }
  ];

  var trace1layout = {
    title:"Bacteria Cultures Per Sample",
    margin: { t: 0 },
    hovermode: "closest",
    xaxis:{ title: "OTU ID" },
    height: 400, width: 200
  };

  Plotly.newPlot("bubble", trace1, trace1layout); 

  var metadata = data.metadata;
  var resultsArray = metadata.filter(sampleObj => sampleObj.id == sample);
  var results = resultsArray[0]
  var wash = results.wfreq;
  var gaugeData = [
    {
      domain: { x: [0, 1], y: [0, 1], tickcolor:"black"},
        value: 2,
        title: { text: "Belly Button Washing Frequency" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 10] },
          steps: [
            { range: [0, 2], color: "red" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "yellow"},
            { range: [6, 8], color: "lightgreen"},
            { range: [8, 10],  color: "green"}
          ],
          threshold: {
            line: { color: "red", width: 4 },
            thickness: 0.75,
            value: 490
          }
        }
      }
    ];

    var gaugeLayout =  { width: 600, height: 450, margin: { t: 0, b: 0 } 
     
    };

    Plotly.newPlot('gauge', gaugeData, gaugeLayout);
  });
}