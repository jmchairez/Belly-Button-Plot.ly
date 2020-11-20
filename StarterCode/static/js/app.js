d3.json("../data/samples.json").then((data) => {
        console.log(data)
        
        var names = data.names;
        var metadata = data.metadata;
        var samples = data.samples;
        
        var message = ("Select ID #");
        d3.select("#selDataset").append("option").attr("value", message).html(message);

        var dropdown = d3.select("#selDataset");
        names.forEach((item) => {
            var row = dropdown.append("option").attr("value", item);
            row.text(item);
        });

        const dropdownchange = () => {

        var demoTable = d3.select("#demographics-table");
        demoTable.html("")
        var inputElement = d3.select("#selDataset");
        var tableBody = demoTable.append("tbody");
        var inputValue = inputElement.property("value");    
        }

    });
