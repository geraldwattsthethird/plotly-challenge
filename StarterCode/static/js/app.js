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
//create function to reset data
function resetData() {

    demographicsTable.html("");
    barChart.html("");
    bubbleChart.html("");
    gauges.html("");

};

//create function to plot charts
function plotCharts(id) {

        //read in json data
        d3.json("data/samples.json").then((data => {
            var singleMetadata = data.metadata.filter(participant => participant.id == id)[0];
            var wordFrequency = singleMetadata.wordFrequency;

        //iterate through key and value data
        Object.defineProperties(singleMetadata).forEach(([key, value]) => {

            var newTable = demographicsTable.append("ul");
            newTable.attr("class", "list-group list-group-flush");

            var tableItem = newTable.append("li");
            tableItem.attr("class", "list-group-item");

            tableItem.text(`${key}: ${value}`);
        
        });

        var singleSample = data.samples.filter(sample => sample.id == id)[0];
        var otuIds = [];
        var otuLabels = [];
        var sampleValues = [];
        
        //iterate through key and value data
        Object.defineProperties(singleSample).forEach(([key, value]) => {

            switch (key) {
                case "otu_ids":
                    otuIds.push(value);
                    break;
                case "sample_values":
                    sampleValues.push(value);
                    break;
                case "otu_labels":
                    otuLabels.push(value);
                    break;
                default:
                    break;
            };
        });

        var maxOtuIds = otuIds[0].slice(0, 10).reverse();
        var maxOtuLabels = otuLabels[0].slice(0, 10).reverse();
        var maxSampleValues = sampleValues[0].slice(0, 10).reverse();

        var topOtuIdsFormatted = topOtuIds.map(otuID => "OTU " + otuID);

        //plot bar chart

        //create trace for bar chart
        var traceBarchart = {
            x: topSampleValues,
            y: topOtuIdsFormatted,
            text: topOtuLabels,
            type: 'bar',
            orientation: 'h',
            marker: {
                color: 'rgb(29,145,192)'
            }
        };

        //create data array
        var dataArraybar = [traceBarchart];

        //create plot layout
        var layoutBarchart = {
            height: 500,
            width: 600,
            font: {
                family: 'Quicksand'
            },
            hoverlabel: {
                font: {
                    family: 'Quicksand'
                }
            },
            title: {
                text: `<b>Top OTUs for Test Subject ${id}</b>`,
                font: {
                    size: 18,
                    color: 'rgb(34,94,168)'
                }
            },
            xaxis: {
                title: "<b>Sample values<b>",
                color: 'rgb(34,94,168)'
            },
            yaxis: {
                tickfont: { size: 14 }
            }
        }

        //create bar chart
        Plotly.newPlot("bar", dataArraybar, layoutBarchart);

        //Bubble Chart





    });

});