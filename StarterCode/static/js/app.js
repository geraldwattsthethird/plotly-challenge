//select variables for different data charting
var idSelect = d3.select("#selDataset");
var demographicsTable = d3.select("#sample-metadata");
var barChart = d3.select("#bar");
var bubbleChart = d3.select("bubble");
var gauges = d3.select("gauge");

//create function to populate dropdown menu
function init() {
    
    //resets previous data
    resetData();

    //read in json samples
    d3.json("data/samples.json").then((data => {

        //forEach to loop over each name
        data.names.forEach((name => {
            var option = idSelect.append("option");
            option.text(name);
        }));

        //set initial ID as default
        var initId = idSelect.property("value")

        plotCharts(initId);

    }));
}

function resetData() {

    demographicsTable.html("");
    barChart.html("");
    bubbleChart.html("");
    gauges.html("");

};

function plotCharts(id) {

        d3.json("data/samples.json").then((data => {
            var singleMetadata = data.metadata.filter(participant => participant.id == id)[0];
            var wordFrequency = singleMetadata.wordFrequency;

        Object.defineProperties(singleMetadata).forEach(([key, value]) => {

            var newTable = demographicsTable.append("ul");
            newTable.attr("class", "list-group list-group-flush");

            var tableItem = newTable.append("li");
            tableItem.attr("class", "list-group-item")

        }
        
        )};
            
        ))
}