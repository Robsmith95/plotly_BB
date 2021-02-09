function getPlots(id) {
//using d3 to read samples.json
d3.json("samples.json").then (sampledata =>{
    console.log(sampledata)

var ids = sampledata.samples[0].otu_ids;
    console.log(ids)
var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
    console.log(sampleValues)
var labels =  sampledata.samples[0].otu_labels.slice(0,10);
    console.log (labels)
var OTU_top = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
var OTU_id = OTU_top.map(d => "OTU " + d);
    console.log(`OTU IDS: ${OTU_id}`)
var labels =  sampledata.samples[0].otu_labels.slice(0,10);
    console.log(`OTU_labels: ${labels}`)
    var trace = {
        x: sampleValues,
        y: OTU_id,
        text: labels,
        marker: {
        color: 'red'},
        type:"bar",
        orientation: "h",
};

//data variable
var barData = [trace];
var barLayout = {
        title: "Top 10 OTU",
        yaxis:{
        tickmode:"linear",
        },
        margin: {
        l: 70,
        r: 70,
        t: 70,
        b: 70
        }
};
    
//bar plot
Plotly.newPlot("bar", barData, barLayout);
//bubble plot
var trace1 = {
    x: sampledata.samples[0].otu_ids,
    y: sampledata.samples[0].sample_values,
    mode: "markers",
    marker: {
        size: sampledata.samples[0].sample_values,
        color: sampledata.samples[0].otu_ids
            },
        text:  sampledata.samples[0].otu_labels
            };
    
var layoutBubble = {
    xaxis:{title: "OTU ID"},
        height: 600,
        width: 1000
            };

            var bubbleData = [trace1];
        Plotly.newPlot("bubble", bubbleData, layoutBubble); 
        
        });
    }  

//data function
function getDemoInfo(id) {
d3.json("samples.json").then((data)=> {
// demographic metadata
var metadata = data.metadata;
    console.log(metadata)

var demResult = metadata.filter(meta => meta.id.toString() === id)[0];
var demographicInfo = d3.select("#sample-metadata");
    demographicInfo.html("");
    
// append demographic data
Object.entries(demResult).forEach((key) => {   
    demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
    });
 });
}
// create the function for the change event
function optionChanged(id) {
    getPlots(id);
    getDemoInfo(id);
}
    
function init() {
//dropwdown menu selector
var dropdown = d3.select("#selDataset");

d3.json("samples.json").then((data)=> {
    console.log(data)
    
data.names.forEach(function(name) {
dropdown.append("option").text(name).property("value");
}
    );            
getPlots(data.names[0]);
getDemoInfo(data.names[0]);
    });
}
    
    init();