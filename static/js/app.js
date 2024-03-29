function buildMetadata(sample) {
  d3.json(`/metadata/${sample}`).then((data) =>{
  console.log(data);
  var panel = d3.select("#sample-metadata");
  panel.html("");
  Object.entries(data).forEach(([
    key, value]) => {
      console.log(key, value);
      panel.append("h5").text(`${key}: ${value}`);
    }) 
  })
  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`/samples/${sample}`).then((data) => {
    console.log(data.otu_ids);
    let outid = data.otu_ids;
    let outlab = data.otu_labels;
    let samplesval = data.sample_values;

    // @TODO: Build a Bubble Chart using the sample data
    const bubbleData = [{
      x : outid,
      y : samplesval,
      text : outlab,
      type: "scatter",
      mode: "markers"
    }];
      Plotly.newPlot("bubble", bubbleData);
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
      const pieData = [{
        values: samplesval.slice(0,10),
        labels: outid.slice(0,10),
        type: "pie"
      }];
      
      var layout = {
        height: 400,
        width: 500,
        title: ""
      };
      
      Plotly.newPlot("pie", pieData, layout);
    });
    }; 

function init() {
// Grab a reference to the dropdown select element
var selector = d3.select("#selDataset");

// Use the list of sample names to populate the select options
d3.json("/names").then((sampleNames) => {
sampleNames.forEach((sample) => {
selector
.append("option")
.text(sample)
.property("value", sample);
});

// Use the first sample from the list to build the initial plots
const firstSample = sampleNames[0];
buildCharts(firstSample);
buildMetadata(firstSample);
});
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
